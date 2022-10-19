output "db_instance_generated_user_password" {
  description = "The auto generated default user password if no input password was provided"
  value       = google_storage_bucket.default.name
}
