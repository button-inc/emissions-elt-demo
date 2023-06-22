import os
import psycopg2
from airflow.operators.python_operator import PythonOperator
from airflow.models import DAG
from datetime import timedelta
from airflow.utils.dates import days_ago
from google.cloud import storage
import tempfile

default_args = {
    'email': ['dylan@button.is','mike@button.is'],
    'email_on_retry': False,
    'email_on_failure': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
    'depends_on_past': False,
    'start_date': days_ago(1),
}

def import_csv_data():
  conn = psycopg2.connect(database="eed",
              user=os.environ['eed_db_user'], password=os.environ['eed_db_pass'],
              host=os.environ['eed_db_host'], port='5432'
  )

  conn.autocommit = True
  cursor = conn.cursor()


  sql = '''CREATE TABLE if not exists DETAILS(employee_id int NOT NULL,\
  employee_name char(20),\
  employee_email varchar(30));'''


  cursor.execute(sql)

  client = storage.Client()
  bucket = client.get_bucket('eed-dag-test-bucket')
  blob = bucket.get_blob('test_csv.csv')
  downloaded_blob = blob.download_as_text()

  with open('temp.csv', 'w') as f:
    f.write(downloaded_blob)
  fr = open("temp.csv", "r")
  print(fr.read())

  with open('temp.csv', 'r') as f:
    cursor.copy_expert('COPY details(employee_id, employee_name, employee_email) FROM STDIN WITH HEADER CSV', f)
  os.remove('temp.csv')

  conn.commit()
  conn.close()

dag = DAG(
  'IMPORT_SQL',
  default_args=default_args,
  description='A DAG that imports csv to an SQL database.',
  schedule_interval=None,
)

task = PythonOperator(
        task_id='import_csv_data',
        python_callable=import_csv_data,
        dag=dag,
)

task
