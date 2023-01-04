from google.cloud import storage
from datetime import datetime #, timedelta
from airflow.models import DAG
from airflow.operators.dummy_operator import DummyOperator
from airflow.operators.python_operator import PythonOperator
from airflow.utils.dates import days_ago
from airflow.models import Variable

def get_files():
    BUCKET = 'eed-dag-test-bucket'
    PROJECT = 'emission-elt-demo'
    client = storage.Client()
    blobs = (client.list_blobs(BUCKET))
    file_names = []
    for blob in blobs:
        file_names.append(blob.name)
        print(blob.name)
    file_names.sort()
    return file_names

args = {
    'owner': 'airflow',
}

dag = DAG(
    'iterate-storage',
    default_args=args,
    schedule_interval=None,
    catchup=False,
    start_date=days_ago(1),
)

start = DummyOperator(task_id='Start', dag=dag)
end = DummyOperator(task_id='End', dag=dag)
t1 = PythonOperator(
        task_id='get_files',
        python_callable=get_files,
        dag=dag,
        )

start >> t1 >> end
