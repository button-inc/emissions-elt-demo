import os
import csv
import psycopg2
import geojson
import json
from airflow.operators.python_operator import PythonOperator
from airflow.utils.dates import days_ago
from datetime import timedelta
from google.cloud import storage
from airflow.models import DAG


default_args = {
  'email': ['joshua@button.is'],
  'email_on_retry': False,
  'email_on_failure': False,
  'retries': 1,
  'retry_delay': timedelta(minutes=5),
  'depends_on_past': False,
  'start_date': days_ago(1),
}

geojson_regional_geospatial_filename = 'regional_district_shapes.geojson'
geojson_municipal_geospatial_filename = 'municipal_district_shapes.geojson'
csv_waste_records_filename = 'bc_municipal_solid_waste_disposal.csv'
record_user = 'joshua@button.is'

def add_import_record(filename, user_email, track_format):
  conn = psycopg2.connect(database="eed",
              user=os.environ['eed_db_user'], password=os.environ['eed_db_pass'],
              host=os.environ['eed_db_host'], port='5432'
  )

  conn.autocommit = True
  cursor = conn.cursor()

  cursor.execute(
    f"INSERT INTO data_clean_room.import_record (file_name, uploaded_by_user_id, track_format_id) "
    f"VALUES (%(filename)s, (SELECT id from eed.permissions WHERE email=%(user_id)s), (SELECT id from data_clean_room.track_format WHERE nickname=%(track)s)) ",
    {
      "filename": filename,
      "user_id": user_email,
      "track": track_format,
    }
  )

  conn.commit()
  conn.close()

def import_regional_geospatial_and_upsert_to_db():
  conn = psycopg2.connect(database="eed",
              user=os.environ['eed_db_user'], password=os.environ['eed_db_pass'],
              host=os.environ['eed_db_host'], port='5432'
  )

  conn.autocommit = True
  cursor = conn.cursor()

  client = storage.Client()
  bucket = client.get_bucket('eed-dag-test-bucket')
  blob = bucket.get_blob(geojson_regional_geospatial_filename)
  downloaded_blob = blob.download_as_bytes()

  geojson_data = geojson.loads(downloaded_blob)

  for feature in geojson_data.get("features"):
    district_name = feature.get("properties", {}).get("ADMIN_AREA_NAME")
    geometry = (json.dumps(feature['geometry']))
    print(district_name)
    print(geometry)
    cursor.execute(
        f"INSERT INTO data_science_workspace.regional_district(district_shape, district_name) "
        f"VALUES ((ST_MULTI(ST_SetSRID(ST_GeomFromGeoJSON(%(geometry)s), 3005))), %(district_name)s) "
        f"ON CONFLICT (district_name) DO NOTHING",
        {"geometry": geometry, "district_name": district_name}
    )

  conn.commit()
  conn.close()

def import_municipal_geospatial_and_upsert_to_db():
  conn = psycopg2.connect(database="eed",
              user=os.environ['eed_db_user'], password=os.environ['eed_db_pass'],
              host=os.environ['eed_db_host'], port='5432'
  )

  conn.autocommit = True
  cursor = conn.cursor()

  client = storage.Client()
  bucket = client.get_bucket('eed-dag-test-bucket')
  blob = bucket.get_blob(geojson_municipal_geospatial_filename)
  downloaded_blob = blob.download_as_bytes()

  geojson_data = geojson.loads(downloaded_blob)

  for feature in geojson_data.get("features"):
    region_name = feature.get("properties", {}).get("ADMIN_AREA_GROUP_NAME")
    legal_name = feature.get("properties", {}).get("ADMIN_AREA_NAME")
    abbr_name = feature.get("properties", {}).get("ADMIN_AREA_ABBREVIATION")
    geometry = (json.dumps(feature['geometry']))
    print(legal_name)
    print(geometry)
    cursor.execute(
        f"INSERT INTO data_science_workspace.municipal_district(municipal_shape, municipal_legal_name, municipal_abbreviated_name, regional_district) "
        f"VALUES ((ST_MULTI(ST_SetSRID(ST_GeomFromGeoJSON(%(geometry)s), 3005))), %(legal_name)s, %(abbr_name)s, (SELECT id from data_science_workspace.regional_district WHERE district_name=%(region)s)) "
        f"ON CONFLICT (municipal_legal_name) DO NOTHING",
        {"geometry": geometry, "legal_name": legal_name, "abbr_name": abbr_name, "region": region_name}
    )

  conn.commit()
  conn.close()

def import_regional_waste_data_and_upsert_to_clean_db():
  conn = psycopg2.connect(database="eed",
              user=os.environ['eed_db_user'], password=os.environ['eed_db_pass'],
              host=os.environ['eed_db_host'], port='5432'
  )

  conn.autocommit = True
  cursor = conn.cursor()

  client = storage.Client()
  bucket = client.get_bucket('eed-dag-test-bucket')
  blob = bucket.get_blob(csv_waste_records_filename)
  downloaded_blob = blob.download_as_text()

  with open('temp.csv', 'w') as f:
    f.write(downloaded_blob)
  fr = open("temp.csv", "r")
  print(fr.read())

  with open('temp.csv', 'r', newline='') as f:
    waste_csv = csv.reader(f)
    headers = next(waste_csv)
    print(headers)
    for row in waste_csv:
      cursor.execute(
        f"INSERT INTO data_clean_room.raw_regional_waste_data(regional_district_name, reporting_year, total_disposed_tonnes, population_count, disposal_rate_kg) "
        f"VALUES (%(region)s, %(year)s, NULLIF(%(disposed)s, '')::DECIMAL, NULLIF(%(pop)s, '')::integer,  NULLIF(%(rate_kg)s, '')::DECIMAL ) "
        f"ON CONFLICT (regional_district_name, reporting_year) DO NOTHING",
        {"region": row[0], "year": row[1], "disposed": row[2], "pop": row[3], "rate_kg": row[4]}
      )
  os.remove('temp.csv')

  conn.commit()
  conn.close()

  add_import_record(csv_waste_records_filename, record_user, "csv:waste")

def transform_load_waste_data_to_workspace_db():
  conn = psycopg2.connect(database="eed",
              user=os.environ['eed_db_user'], password=os.environ['eed_db_pass'],
              host=os.environ['eed_db_host'], port='5432'
  )

  conn.autocommit = False
  cursor = conn.cursor()

  print("Loading waste data from Data Clean Room into Data Science Workspace")
  cursor.execute(
    f"insert into data_science_workspace.regional_waste_data(regional_district, year, total_disposed_tonnes, population_count) "
    f"select rd.id, rrwd.reporting_year, rrwd.total_disposed_tonnes, rrwd.population_count "
    f"from data_clean_room.raw_regional_waste_data as rrwd "
    f"join data_science_workspace.regional_district as rd "
    f"on rd.district_name ~* replace(replace(rrwd.regional_district_name, 'comox-strathcona', 'strathcona'), '-', '.') " # TODO: Comox-Strathcona is a reports as a combined region
    f"ON CONFLICT (regional_district, year) DO NOTHING"
    )

  conn.commit()
  conn.close()

dag = DAG(
  'IMPORT_geo_waste_csv_to_SQL',
  default_args=default_args,
  description='A DAG that imports geospatial region, municipal, and waste csvs to an SQL database.',
  schedule_interval=None,
)

region_csv = PythonOperator(
        task_id='regional_geospacial_db_ingestion',
        python_callable=import_regional_geospatial_and_upsert_to_db,
        dag=dag,
)

municipal_csv = PythonOperator(
        task_id='municipal_geospacial_db_ingestion',
        python_callable=import_municipal_geospatial_and_upsert_to_db,
        dag=dag,
)

waste_csv = PythonOperator(
        task_id='waste_db_ingestion',
        python_callable=import_regional_waste_data_and_upsert_to_clean_db,
        dag=dag,
)

dsw_waste = PythonOperator(
        task_id='transform_load_waste_data_to_workspace_db',
        python_callable=transform_load_waste_data_to_workspace_db,
        dag=dag,
)

region_csv >> municipal_csv >> waste_csv >> dsw_waste
