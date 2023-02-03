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
import google.cloud.dlp

# Instantiate DLP
dlp = google.cloud.dlp_v2.DlpServiceClient()

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
    f"VALUES (%(filename)s, (SELECT id from eed.permissions WHERE email=%(user_id)s), (SELECT id from data_clean_room.track_format WHERE nickname=%(track)s)) "
    f"RETURNING job_id",
    {
      "filename": filename,
      "user_id": user_email,
      "track": track_format,
    }
  )
  inserted_job_id = cursor.fetchone()[0]

  conn.commit()
  conn.close()

  return inserted_job_id

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

def dlp_analyze_waste_table(task_instance):
  likelihood_map = {
    "LIKELIHOOD_UNSPECIFIED": 0,
    "VERY_UNLIKELY": 1,
    "UNLIKELY": 2,
    "POSSIBLE": 3,
    "LIKELY": 4,
    "VERY_LIKELY": 5
    }

  import_record_id = task_instance.xcom_pull(task_ids='waste_db_ingestion')


  conn = psycopg2.connect(database="eed",
              user=os.environ['eed_db_user'], password=os.environ['eed_db_pass'],
              host=os.environ['eed_db_host'], port='5432'
  )

  conn.autocommit = True
  cursor = conn.cursor()

  # Fetch 20 rows and convert them into the json-table format that DLP requires
  cursor.execute("select * from data_clean_room.raw_regional_waste_data LIMIT 20")
  colnames = [desc[0] for desc in cursor.description]
  print(colnames)

  table_json = {}
  table_json["headers"] = [{"name": header} for header in colnames]

  rows = []
  for record in cursor:
    rows.append({"values": [{"string_value": str(cell_value)} for cell_value in record]})
  table_json["rows"] = rows

  # Pass the json to DLP for analysis
  item = {"table": table_json}

  # By not specifying an info_types array, we query against all info types
  inspect_config = {
      "include_quote": True,
  }

  # Project ID conversion to full resource ID
  project = "emissions-elt-demo"
  parent = f"projects/{project}"

  # Call the API
  response = dlp.inspect_content(
    request={
      "parent": parent,
      "inspect_config": inspect_config,
      "item": item
    }
  )

  # Process the results.
  if response.result.findings:
    columns_with_findings = {};

    for finding in response.result.findings:
      content_location = next(iter(finding.location.content_locations), {})
      head = content_location.record_location.field_id.name
      infotype_found = finding.info_type.name
      how_likely = str(finding.likelihood).replace("Likelihood.", "")
      how_likely_number =  likelihood_map[how_likely]
      quote = finding.quote
      finding_id = finding.finding_id

      if head and head not in columns_with_findings:
        columns_with_findings[head] = {
          "infotype_found": infotype_found,
          "likelihood_number": 0,
          "all_likelyhoods": set(),
          "quotes": set(),
          "finding_ids": set()
        }
      if head in columns_with_findings:
        columns_with_findings[head]["likelihood_number"] = max(how_likely_number, columns_with_findings[head]["likelihood_number"])
        columns_with_findings[head]["all_likelyhoods"].add(how_likely)
        columns_with_findings[head]["quotes"].add(str(quote))
        columns_with_findings[head]["finding_ids"].add(str(finding_id))

  else:
    print("No findings.")

  column_ids_inserted = set()

  for column in colnames:
    findings = columns_with_findings.get(column, {})
    print(
      f"Column Name: {column} with the following data: {findings}"
    )
    cursor.execute(
      f"INSERT INTO data_clean_room.dlp_column_analysis(column_title, identified_info_type, max_likelihood, identified_likelihoods, quotes, findings_ids, to_anonymize) "
      f"VALUES (%(column_title)s, %(identified_info_type)s, %(max_likelihood)s, %(identified_likelihoods)s, %(quotes)s, %(findings_ids)s, FALSE ) "
      f"RETURNING id",
      {
        "column_title": column,
        "identified_info_type": findings.get("infotype_found"),
        "max_likelihood": findings.get("likelihood_number"),
        "identified_likelihoods": list(findings.get("all_likelyhoods", [])),
        "quotes": list(findings.get("quotes", [])),
        "findings_ids": list(findings.get("finding_ids", [])),
      }
    )
    column_ids_inserted.add(cursor.fetchone()[0])

  print("Therese are the new ids:", column_ids_inserted)
  print("This is the ID of the job added to the import record:", import_record_id)

  cursor.execute(
    f"INSERT INTO data_clean_room.dlp_table_analysis(import_record_id, columns_analyzed, completed) "
    f"VALUES (%(record)s, %(columns)s, true) ",
    {
      "record": import_record_id,
      "columns": list(column_ids_inserted)
    }
  )

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
  return add_import_record(csv_waste_records_filename, record_user, "csv:waste")

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

waste_dlp = PythonOperator(
        task_id='dlp_analyze_waste_table',
        python_callable=dlp_analyze_waste_table,
        dag=dag,
)

dsw_waste = PythonOperator(
        task_id='transform_load_waste_data_to_workspace_db',
        python_callable=transform_load_waste_data_to_workspace_db,
        dag=dag,
)

region_csv >> municipal_csv >> waste_csv >> waste_dlp >> dsw_waste
