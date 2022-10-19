output "composer_dags_bucket" {
  value       = data.google_secret_manager_secret_version.airflow_gcs_bucket_name.secret_data
  description = "Google Cloud Storage bucket which hosts DAGs for the Cloud Composer Environment."
}
