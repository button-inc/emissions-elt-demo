output "gcs_bucket" {
  value       = google_composer_environment.eed_cloud_compose_env.config.0.dag_gcs_prefix
  description = "Google Cloud Storage bucket which hosts DAGs for the Cloud Composer Environment."
}
