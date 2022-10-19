import os
from os.path import expanduser
from datetime import timedelta
from six.moves.urllib.parse import quote_plus
from airflow import DAG
from airflow.models import Variable
from airflow.contrib.operators.gcp_sql_operator import CloudSqlQueryOperator
from airflow.operators.python_operator import PythonOperator
from airflow.utils.dates import days_ago
from google.cloud import storage
from google.cloud.storage._helpers import _PropertyMixin

SQL = [
    'CREATE TABLE IF NOT EXISTS TABLE_TEST (I INTEGER)',
    'INSERT INTO TABLE_TEST VALUES (0)',
]
default_args = {
    'email': ['dylan@button.is','mike@button.is'],
    'email_on_retry': False,
    'email_on_failure': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
    'depends_on_past': False,
    'start_date': days_ago(1),
}
HOME_DIR = expanduser("~")
def get_absolute_path(path):
    if path.startswith("/"):
        return path
    else:
        return os.path.join(HOME_DIR, path)
postgres_kwargs = dict(
    user=os.environ['ELT_DB_USER'],
    password=os.environ['ELT_DB_PASS'],
    public_port=5432,
    public_ip=os.environ['ELT_DB_HOST'],
    project_id="emission-elt-demo",
    location="us-west-4",
    instance="eed",
    database="eed",
)

os.environ['AIRFLOW_CONN_PUBLIC_POSTGRES_TCP'] = \
    "gcpcloudsql://{user}:{password}@{public_ip}:{public_port}/{database}?" \
    "database_type=postgres&" \
    "project_id={project_id}&" \
    "location={location}&" \
    "instance={instance}&" \
    "use_proxy=False&" \
    "use_ssl=False".format(**postgres_kwargs)

dag = DAG(
    'con_SQL',
    default_args=default_args,
    description='A DAG that connect to the SQL server.',
    schedule_interval=timedelta(days=1),
)
def print_client(ds, **kwargs):
    client = storage.Client()
    print(client)
print_task = PythonOperator(
    task_id='print_the_client',
    provide_context=True,
    python_callable=print_client,
    dag=dag,
)
task = CloudSqlQueryOperator(
      gcp_cloudsql_conn_id='public_postgres_tcp',
      task_id="example_gcp_sql_task_postgres_connect",
      sql=SQL,
      dag=dag
)
print_task >> task
