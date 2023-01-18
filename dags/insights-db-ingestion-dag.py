import os
from datetime import timedelta
import psycopg2
from airflow.utils.dates import days_ago
from airflow.operators.python_operator import PythonOperator
from airflow.models import DAG
from google.cloud import storage
import json

default_args = {
  'email': ['joshua@button.is'],
  'email_on_retry': False,
  'email_on_failure': False,
  'retries': 1,
  'retry_delay': timedelta(minutes=5),
  'depends_on_past': False,
  'start_date': days_ago(1),
}

def import_json_data():
  print("Importing json from storage")

  client = storage.Client()
  bucket = client.get_bucket('eed-dag-test-bucket')
  # blob = bucket.get_blob('sample-insights-destination-output.json')
  blob = bucket.get_blob('test-sample-insights-destination-output.json')
  downloaded_json = blob.download_as_bytes()

  json_data = json.loads(downloaded_json)

  return json_data

# TODO(improvement): Check that timeframe bucket is 1 Year
def get_study_zones_from_json(raw_insights_json):
  print("Getting study zones from imported json")
  return raw_insights_json["study_zones"]

# TODO(improvement): Split this into multiple tasks for improved efficiency/parallelization
def parse_zones_into_list(raw_study_zones):
  print("Parsing study zones into list")
  unique_zones = set()
  zone_pair_list = []

  for study_zone in raw_study_zones:
    origin = study_zone.get("input_geoid")
    unique_zones.add(origin)

    for bucket in study_zone.get("buckets"):
      start_timedate = bucket.get("timeframe_bucket")

      for output in bucket.get("outputs"):
        destination = output.get("output_geoid")
        count = output.get("count")
        unique_zones.add(destination)
        # print("Destination zone:", destination)
        print(f"{origin} to {destination} has a count of {count}")

        insights_voyage = {
          "origin": origin,
          "destination": destination,
          "count": count,
          "start_time": start_timedate,
        }

        zone_pair_list.append(insights_voyage)
  return {
    "unique_zones": unique_zones,
    "zone_pair_list": zone_pair_list,
  }

def import_zone_data_into_db(parsed_study_zones):
  unique_zones = parsed_study_zones["unique_zones"]
  zone_pair_list = parsed_study_zones["zone_pair_list"]

  conn = psycopg2.connect(database="eed",
              user=os.environ['eed_db_user'], password=os.environ['eed_db_pass'],
              host=os.environ['eed_db_host'], port='5432'
  )

  conn.autocommit = True
  cursor = conn.cursor()

  for zone in unique_zones:
    cursor.execute(
      f"INSERT INTO data_science_workspace.study_area (area_name) "
      f"VALUES (%(zone)s) "
      f"ON CONFLICT (area_name) DO UPDATE SET updated_at = NOW()",
      {"zone": zone}
    )

  for zone_pair in zone_pair_list:
    cursor.execute(
      f"INSERT INTO data_science_workspace.insights_voyage (start_time, origin_area_id, destination_area_id, voyage_count) "
      f"VALUES (%(start)s, (SELECT study_area_id from data_science_workspace.study_area WHERE area_name=%(origin)s), (SELECT study_area_id from data_science_workspace.study_area WHERE area_name=%(destination)s), %(count)s) "
      f"ON CONFLICT (origin_area_id, destination_area_id) DO UPDATE SET updated_at = NOW(), voyage_count = %(count)s",
      {"start": zone_pair.get('start_time'),"origin": zone_pair.get('origin'), "destination": zone_pair.get('destination'), "count": zone_pair.get('count')}
    )

  conn.commit()
  conn.close()

def do_everything_above():
  json_data = import_json_data()
  study_zone_data = get_study_zones_from_json(json_data)

  parsed = parse_zones_into_list(study_zone_data)
  print("Unique zones found:", parsed["unique_zones"])
  print("Zone pairs found:", parsed["zone_pair_list"])
  import_zone_data_into_db(parsed)
  return

dag = DAG(
  'IMPORT_json_to_SQL',
  default_args=default_args,
  description='A DAG that imports insights.json to a SQL database.',
  schedule_interval=None,
)

task = PythonOperator(
        task_id='import_and_upsert_to_db',
        python_callable=do_everything_above,
        dag=dag,
)

task
