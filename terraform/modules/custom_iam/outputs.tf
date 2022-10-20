output "build_trigger_sa_id" {
  description = "The id for the build trigger service account"
  value       = google_service_account.build_trigger_sa.id
}
