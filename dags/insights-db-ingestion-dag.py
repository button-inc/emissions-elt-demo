import os
from datetime import timedelta
import psycopg2
from airflow.utils.dates import days_ago
from airflow.operators.python_operator import PythonOperator
from airflow.models import DAG
from google.cloud import storage
from google.cloud import dlp_v2
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

insights_filename = 'test-sample-insights-destination-output.json'
record_user = 'joshua@button.is'
track_format = 'json:insights'

def import_json_data():
  print("Importing json from storage")

  client = storage.Client()
  bucket = client.get_bucket('eed-dag-test-bucket')
  blob = bucket.get_blob(insights_filename)
  downloaded_json = blob.download_as_bytes()

  json_data = json.loads(downloaded_json)

  return json_data

# TODO(improvement): Check that timeframe bucket is 1 Year
def get_study_zones_from_json(raw_insights_json):
  print("Getting study zones from imported json")
  return raw_insights_json["study_zones"]

def get_job_metadata_from_json(raw_insights_json):
  print("Getting job metadata from imported json")

  unique_zones = set().union(
    raw_insights_json.get("input_params", {}).get("input_geoid", {}).get("study_zone", []),
    raw_insights_json.get("input_params", {}).get("output_geoid", {}).get("study_zone", [])
  )

  return {
    "id": raw_insights_json.get("job_id"),
    "job_type": raw_insights_json.get("api"),
    "study_zones": list(unique_zones),
    "job_status": raw_insights_json.get("status"),
    "request_id": raw_insights_json.get("requestId"),
    "created_date": raw_insights_json.get("created_date"),
  }

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

def import_job_data_into_dcr_db(job_metadata):
  conn = psycopg2.connect(database="eed",
              user=os.environ['eed_db_user'], password=os.environ['eed_db_pass'],
              host=os.environ['eed_db_host'], port='5432'
  )

  conn.autocommit = True
  cursor = conn.cursor()

  cursor.execute(
    f"INSERT INTO data_clean_room.insights_job (id, job_type, study_zones, job_status, request_id, created_date) "
    f"VALUES (%(id)s, %(job_type)s, %(study_zones)s, %(job_status)s, %(request_id)s, %(created_date)s) "
    f"ON CONFLICT(id) DO NOTHING",
    {
      "id": job_metadata.get("id"),
      "job_type": job_metadata.get("job_type"),
      "study_zones": job_metadata.get("study_zones"),
      "job_status": job_metadata.get("job_status"),
      "request_id": job_metadata.get("request_id"),
      "created_date": job_metadata.get("created_date")
    }
  )

  conn.commit()
  conn.close()

def import_zone_data_into_dcr_db(parsed_study_zones, job_metadata):
  zone_pair_list = parsed_study_zones["zone_pair_list"]
  job_id = job_metadata.get("id");

  conn = psycopg2.connect(database="eed",
              user=os.environ['eed_db_user'], password=os.environ['eed_db_pass'],
              host=os.environ['eed_db_host'], port='5432'
  )

  conn.autocommit = True
  cursor = conn.cursor()

  for zone_pair in zone_pair_list:
    cursor.execute(
      f"INSERT INTO data_clean_room.raw_insights (job_id, input_geoid, timeframe_bucket, output_geoid, count) "
      f"VALUES (%(job_id)s, %(input_geoid)s, %(timeframe_bucket)s, %(output_geoid)s, %(count)s) "
      f"ON CONFLICT(input_geoid, output_geoid) DO NOTHING",
      {"job_id": job_id, "input_geoid": zone_pair.get('origin'), "timeframe_bucket": zone_pair.get('start_time'), "output_geoid": zone_pair.get('destination'), "count": zone_pair.get('count'), }
    )

  conn.commit()
  conn.close()

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

def dlp_analyze_insights_table(task_instance):
  likelihood_map = {
  "LIKELIHOOD_UNSPECIFIED": 0,
  "VERY_UNLIKELY": 1,
  "UNLIKELY": 2,
  "POSSIBLE": 3,
  "LIKELY": 4,
  "VERY_LIKELY": 5
  }
  reverse_likelihood_map = {
  0: "LIKELIHOOD_UNSPECIFIED",
  1: "VERY_UNLIKELY",
  2: "UNLIKELY",
  3: "POSSIBLE",
  4: "LIKELY",
  5: "VERY_LIKELY"
  }


  # Instantiate DLP
  dlp = dlp_v2.DlpServiceClient()

  import_record_id = task_instance.xcom_pull(task_ids='import_and_upsert_to_db')


  conn = psycopg2.connect(database="eed",
              user=os.environ['eed_db_user'], password=os.environ['eed_db_pass'],
              host=os.environ['eed_db_host'], port='5432'
  )

  conn.autocommit = True
  cursor = conn.cursor()

  # Fetch 20 rows and convert them into the json-table format that DLP requires
  cursor.execute("select * from data_clean_room.raw_insights LIMIT 20")
  colnames = [desc[0] for desc in cursor.description]
  print(colnames)

  table_json = {}
  table_json["headers"] = [{"name": header} for header in colnames]

  rows = []
  for record in cursor:
    rows.append({"values": [{"string_value": str(cell_value)} for cell_value in record]})
  table_json["rows"] = rows

  # Pass the json to DLP for analysis
  item: dlp_v2.ContentItem = {"table": table_json}

  # By not specifying an info_types array, we query against all info types
  inspect_config = {
      "include_quote": True,
  }

  # Project ID conversion to full resource ID
  project = "emissions-elt-demo"
  parent = f"projects/{project}"

  # Call the API
  response = dlp.inspect_content(parent=parent,inspect_config=inspect_config,item=item)

  # Process the results.
  if response.result.findings:
    columns_with_findings = {};

    for finding in response.result.findings:
      content_location = next(iter(finding.location.content_locations), {})
      head = content_location.record_location.field_id.name
      infotype_found = finding.info_type.name
      how_likely_number = finding.likelihood
      how_likely = reverse_likelihood_map.get(how_likely_number)
      quote = finding.quote
      finding_id = "" # ID not available in this API response

      print(f"{head}, {infotype_found}, {how_likely}, {how_likely_number}")
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


def extract_insights_and_load_into_dcr():
  json_data = import_json_data()
  insights_job_metadata = get_job_metadata_from_json(json_data)
  study_zone_data = get_study_zones_from_json(json_data)

  print("Insights Job metadata:", insights_job_metadata)
  import_job_data_into_dcr_db(insights_job_metadata)

  parsed = parse_zones_into_list(study_zone_data)
  print("Unique zones found:", parsed["unique_zones"])
  print("Zone pairs found:", parsed["zone_pair_list"])
  import_zone_data_into_dcr_db(parsed, insights_job_metadata)

  return add_import_record(insights_filename, record_user, track_format)

def load_insights_to_workspace_db():
  conn = psycopg2.connect(database="eed",
              user=os.environ['eed_db_user'], password=os.environ['eed_db_pass'],
              host=os.environ['eed_db_host'], port='5432'
  )

  conn.autocommit = True
  cursor = conn.cursor()

  print("Loading Insights from Data Clean Room into Data Science Workspace")
  cursor.execute(
    f"insert into data_science_workspace.insights_voyage(start_time, origin_area_id, destination_area_id, voyage_count) "
    f"select ri.timeframe_bucket, in_sa.study_area_id, out_sa.study_area_id, ri.COUNT "
    f"from data_clean_room.raw_insights as ri "
    f"join data_science_workspace.study_area as in_sa on ri.input_geoid = in_sa.area_name "
    f"join data_science_workspace.study_area as out_sa on ri.output_geoid = out_sa.area_name "
    f"ON CONFLICT (origin_area_id, destination_area_id) DO UPDATE SET updated_at = NOW()"
  )

  conn.commit()
  conn.close()

dag = DAG(
  'IMPORT_insights_json_to_SQL',
  default_args=default_args,
  description='A DAG that imports insights.json to a SQL database.',
  schedule_interval=None,
)

load_insights_csv = PythonOperator(
        task_id='import_and_upsert_to_db',
        python_callable=extract_insights_and_load_into_dcr,
        dag=dag,
)

insights_dlp = PythonOperator(
        task_id='dlp_analyze_waste_table',
        python_callable=dlp_analyze_insights_table,
        dag=dag,
)

load_insights_to_dsw = PythonOperator(
        task_id='load_insights_to_workspace_db',
        python_callable=load_insights_to_workspace_db,
        dag=dag,
)

load_insights_csv >> insights_dlp >> load_insights_to_dsw
