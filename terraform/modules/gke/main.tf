provider "google-beta" {
  # Run 'gcloud auth application-default login' to get credentials.json
  # credentials = "${file("credentials.json")}"
  project = var.project
  region  = var.region
}


# create Docker artifact repository
resource "google_artifact_registry_repository" "eed-artifacts" {
  provider      = google-beta
  location      = var.region
  repository_id = var.artifact_respository_name
  description   = "eed docker repository"
  format        = "DOCKER"
}

resource "google_container_cluster" "primary" {
  provider = google-beta
  name     = var.gke_cluster_name
  location = var.zone

  initial_node_count = 1
  # Disable the Google Cloud Logging service because you may overrun the Logging free tier allocation, and it may be expensive
  logging_service = "none"

  # This is set to maintain idempotency. Without this empty block declared,
  # deafult settings are applied, and on every `terraform apply` it forces
  # a destroy and rebuild
  # From the docs: "It's recommended that you create a VPC-native cluster,
  # done by specifying the ip_allocation_policy block or using secondary ranges on existing subnet."
  # https://registry.terraform.io/providers/hashicorp/google/latest/docs/guides/using_gke_with_terraform
  ip_allocation_policy {}
  node_config {
    # More info on Spot VMs with GKE https://cloud.google.com/kubernetes-engine/docs/how-to/spot-vms#create_a_cluster_with_enabled
    spot         = true
    machine_type = var.machine_type
    disk_size_gb = var.disk_size_gb
    tags         = ["${var.gke_cluster_name}"]
    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform",
      "https://www.googleapis.com/auth/trace.append",
      "https://www.googleapis.com/auth/service.management.readonly",
      "https://www.googleapis.com/auth/monitoring",
      "https://www.googleapis.com/auth/devstorage.read_only",
      "https://www.googleapis.com/auth/servicecontrol",
    ]
    service_account = var.cloud_compute_sa_email
  }
}
