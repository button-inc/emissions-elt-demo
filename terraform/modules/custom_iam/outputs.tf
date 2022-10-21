output "build_trigger_sa_id" {
  description = "The id for the build trigger service account"
  value       = google_service_account.build_trigger_sa.id
}

output "gke_cloud_compute_sa_email" {
  description = "Email of the cloud compute service account"
  value       = google_service_account.gke_cloud_compute_sa.email
}
