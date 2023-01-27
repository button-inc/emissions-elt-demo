import os
import csv
import psycopg2
from airflow.operators.python_operator import PythonOperator
from airflow.models import DAG
from datetime import timedelta
from airflow.utils.dates import days_ago
from google.cloud import storage
import tempfile

default_args = {
  'email': ['joshua@button.is'],
  'email_on_retry': False,
  'email_on_failure': False,
  'retries': 1,
  'retry_delay': timedelta(minutes=5),
  'depends_on_past': False,
  'start_date': days_ago(1),
}

# csv_import_filename is from our generated hexagonal grid, pushed as real data to insights
csv_import_filename = 'study_area_name_geo_columns_202301190935.csv'


def import_csv_and_upsert_to_db():
  conn = psycopg2.connect(database="eed",
              user=os.environ['eed_db_user'], password=os.environ['eed_db_pass'],
              host=os.environ['eed_db_host'], port='5432'
  )

  conn.autocommit = True
  cursor = conn.cursor()

  client = storage.Client()
  bucket = client.get_bucket('eed-dag-test-bucket')
  blob = bucket.get_blob(csv_import_filename)
  downloaded_blob = blob.download_as_text()

  with open('temp.csv', 'w') as f:
    f.write(downloaded_blob)
  fr = open("temp.csv", "r")
  print(fr.read())

  with open('temp.csv', 'r', newline='') as f:
    geom_csv = csv.reader(f)
    headers = next(geom_csv)
    print(headers)
    for row in geom_csv:
      cursor.execute(
        f"INSERT INTO data_science_workspace.study_area(area_name) "
        f"VALUES (%(area_name)s) "
        f"ON CONFLICT (area_name) DO UPDATE SET updated_at = NOW()",
        {"area_name": row[0]}
      )
      cursor.execute(
        f"INSERT INTO data_science_workspace.study_area_geometry(area_name, hex_geometry) "
        f"VALUES (%(area_name)s, %(geometry)s) "
        f"ON CONFLICT (area_name) DO UPDATE SET hex_geometry = %(geometry)s",
        {"area_name": row[0], "geometry": row[1]}
      )
  os.remove('temp.csv')

  conn.commit()
  conn.close()

dag = DAG(
  'IMPORT_sample_csv_to_SQL',
  default_args=default_args,
  description='A DAG that imports geospatial csv to an SQL database.',
  schedule_interval=None,
)

task = PythonOperator(
        task_id='sample_geospacial_db_ingestion',
        python_callable=import_csv_and_upsert_to_db,
        dag=dag,
)

task
