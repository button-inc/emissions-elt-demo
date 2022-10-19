# Database output | postgresql-instance-output.tf
output "db_instance_address" {
  description = "IP address of the master database instance"
  value       = data.google_secret_manager_secret_version.eed_db_host.secret_data
}
output "db_instance_name" {
  description = "Name of the database instance"
  value       = google_sql_database_instance.postgresql.name
}
output "db_instance_username" {
  description = "Name of the database user"
  value       = data.google_secret_manager_secret_version.eed_db_user.secret_data
}

output "db_instance_generated_user_password" {
  description = "The auto generated default user password if no input password was provided"
  value       = data.google_secret_manager_secret_version.eed_db_pass.secret_data
}
