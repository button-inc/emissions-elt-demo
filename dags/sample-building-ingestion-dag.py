import os
import csv
import psycopg2
from psycopg2 import sql
from airflow.operators.python_operator import PythonOperator
from airflow.utils.dates import days_ago
from datetime import timedelta
from google.cloud import storage
from airflow.models import DAG
from google.cloud import dlp_v2

default_args = {
  'email': ['joshua@button.is'],
  'email_on_retry': False,
  'email_on_failure': False,
  'retries': 1,
  'retry_delay': timedelta(minutes=5),
  'depends_on_past': False,
  'start_date': days_ago(1),
}

csv_building_area_filename = "bc_building_data.csv"
csv_occupancy_filename = "9810003801-eng_bc_municipal.csv"
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

def import_raw_building_data_and_upsert_to_db():
  conn = psycopg2.connect(database="eed",
              user=os.environ['eed_db_user'], password=os.environ['eed_db_pass'],
              host=os.environ['eed_db_host'], port='5432'
  )

  conn.autocommit = False
  cursor = conn.cursor()

  client = storage.Client()
  bucket = client.get_bucket('eed-dag-test-bucket')
  blob = bucket.get_blob(csv_building_area_filename)
  downloaded_blob = blob.download_as_text()

  with open('temp.csv', 'w') as f:
    f.write(downloaded_blob)

  with open('temp.csv', 'r', newline='') as f:
    building_csv = csv.reader(f, delimiter=';')
    headers = next(building_csv)
    print(headers)
    for row in building_csv:
      [id, longitude, latitude, csduid, csdname, data_prov, build_id, shape_length, shape_footprint_area] = row;
      cursor.execute(
        f"INSERT INTO data_clean_room.buildings(longitude, latitude, csduid, csdname, data_prov, build_id, shape_length, shape_footprint_area) "
        f"VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
        f"ON CONFLICT (build_id) DO NOTHING",
        (longitude, latitude, csduid, csdname, data_prov, build_id, shape_length, shape_footprint_area)
      )

  os.remove('temp.csv')

  conn.commit()
  conn.close()

  return add_import_record(csv_building_area_filename, record_user, "csv:building dimensions")

def import_raw_population_data_and_upsert_to_db():
  conn = psycopg2.connect(database="eed",
              user=os.environ['eed_db_user'], password=os.environ['eed_db_pass'],
              host=os.environ['eed_db_host'], port='5432'
  )

  conn.autocommit = False
  cursor = conn.cursor()

  client = storage.Client()
  bucket = client.get_bucket('eed-dag-test-bucket')
  blob = bucket.get_blob(csv_occupancy_filename)
  downloaded_blob = blob.download_as_text()

  with open('temp.csv', 'w') as f:
    f.write(downloaded_blob)

  with open('temp.csv', 'r', newline='') as f:
    header_lines = 11 # dwelling population data contains metadata as above the header
    building_csv = csv.reader(f)
    ref_date = 2021;

    for i in range(header_lines):
      headers = next(building_csv)
      print(headers)

    print("=== Start of data to insert into database ===")
    for row in building_csv:
      if not row:
        print("=== End of data to insert into database ===")
        break
      [geo_name, dwell_occupied, pop_in_dwellings] = row;
      print(f"Geographic designation: {geo_name} | Dwellings: {dwell_occupied} | Population in dwellings: {pop_in_dwellings}")
      cursor.execute(
        f"INSERT INTO data_clean_room.dwelling_populations(reference_date, geographic_location, dwellings_occupied_by_usual_residents, population_in_dwellings) "
        f"VALUES (%s, %s, %s, %s)"
        f"ON CONFLICT (reference_date, geographic_location) DO NOTHING",
        (ref_date, geo_name, dwell_occupied.replace(",", ""), pop_in_dwellings.replace(",", ""))
      )

    for footer in building_csv:
      print(footer)

  os.remove('temp.csv')

  conn.commit()
  conn.close()

  return add_import_record(csv_occupancy_filename, record_user, "csv:building population")

def dlp_analyze_table(task_instance, task_id_source, target_table):
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
  import_record_id = task_instance.xcom_pull(task_ids=task_id_source)


  conn = psycopg2.connect(database="eed",
              user=os.environ['eed_db_user'], password=os.environ['eed_db_pass'],
              host=os.environ['eed_db_host'], port='5432'
  )

  conn.autocommit = True
  cursor = conn.cursor()

  # Fetch 20 rows and convert them into the json-table format that DLP requires
  cursor.execute(
    sql.SQL("select * from {} LIMIT 20").format(sql.Identifier(*target_table.split(".")))
    )
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

      if head and head not in columns_with_findings:
        columns_with_findings[head] = {
          "infotype_found": infotype_found,
          "likelihood_number": 0,
          "all_likelyhoods": set(),
          "quotes": set(),
          "finding_ids": set()
        }
      print(f"{head}, {infotype_found}, {how_likely}, {how_likely_number}")
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


def load_density_data_to_workspace_db():
  conn = psycopg2.connect(database="eed",
              user=os.environ['eed_db_user'], password=os.environ['eed_db_pass'],
              host=os.environ['eed_db_host'], port='5432'
  )

  conn.autocommit = False
  cursor = conn.cursor()


  print("Loading density data from Data Clean Room into Data Science Workspace")
  cursor.execute(
    f"insert into data_science_workspace.building_populations(reference_date, municipal_name, dwellings_occupied_by_usual_residents, population_in_dwellings) "
    f"select dp.reference_date, md.id, dp.dwellings_occupied_by_usual_residents, dp.population_in_dwellings "
    f"from data_clean_room.dwelling_populations as dp "
    f"join data_science_workspace.municipal_district as md "
    f"on dp.geographic_location ~* md.municipal_abbreviated_name "
    f"on conflict (reference_date, municipal_name) DO NOTHING"
    )

  conn.commit()
  conn.close()

def transform_load_building_data_to_workspace_db():
  conn = psycopg2.connect(database="eed",
              user=os.environ['eed_db_user'], password=os.environ['eed_db_pass'],
              host=os.environ['eed_db_host'], port='5432'
  )

  conn.autocommit = False
  cursor = conn.cursor()


  print("Loading building footprint data from Data Clean Room into Data Science Workspace")
  cursor.execute(
    f"insert into data_science_workspace.MUNICIPAL_BUILDING(municipal_name, TOTAL_BUILDINGS, TOTAL_BUILDING_AREA) "
    f"select md.id, sum(builds.building_count), sum(builds.SUM_FOOTPRINT) "
    f"from (select csdname, count(csdname) as building_count, sum(b.SHAPE_FOOTPRINT_AREA) as sum_footprint "
    f"from data_clean_room.buildings b "
    f"group by csdname) as builds "
    f"join data_science_workspace.municipal_district md "
    f"on builds.csdname ~* md.municipal_abbreviated_name "
    f"group by md.id "
    f"on conflict (municipal_name) DO NOTHING"
    )

  conn.commit()
  conn.close()

dag = DAG(
  'IMPORT_building_csv_to_SQL',
  default_args=default_args,
  description='A DAG that imports municipal building and population csvs to an SQL database.',
  schedule_interval=None,
)

building_csv = PythonOperator(
        task_id='municipal_building_raw_ingestion',
        python_callable=import_raw_building_data_and_upsert_to_db,
        dag=dag,
)

population_csv = PythonOperator(
        task_id='import_raw_population_data_and_upsert_to_db',
        python_callable=import_raw_population_data_and_upsert_to_db,
        dag=dag,
)

population_dlp = PythonOperator(
        task_id='dlp_analyze_population_table',
        python_callable=dlp_analyze_table,
        op_kwargs={
          "task_id_source": "import_raw_population_data_and_upsert_to_db",
          "target_table": "data_clean_room.dwelling_populations"
          },
        dag=dag,
)

building_dlp = PythonOperator(
        task_id='dlp_analyze_building_table',
        python_callable=dlp_analyze_table,
        op_kwargs={
          "task_id_source": "municipal_building_raw_ingestion",
          "target_table": "data_clean_room.buildings"
          },
        dag=dag,
)

load_density_data = PythonOperator(
        task_id='load_density_data_to_workspace_db',
        python_callable=load_density_data_to_workspace_db,
        dag=dag,
)

load_building_data = PythonOperator(
        task_id='transform_load_building_data_to_workspace_db',
        python_callable=transform_load_building_data_to_workspace_db,
        dag=dag,
)

building_csv >> population_csv >> population_dlp >> building_dlp >> load_density_data >> load_building_data
