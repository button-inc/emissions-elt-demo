output "metabase_external_address" {
  value       = google_compute_instance.metabase_vm.network_interface.0.access_config.0.nat_ip
  description = "Google Cloud VM external ip that hosts Metabase."
}

output "metabase_internal_address" {
  value       = google_compute_instance.metabase_vm.network_interface.0.network_ip
  description = "Google Cloud VM internal ip that hosts Metabase."
}
