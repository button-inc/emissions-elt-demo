variable "project" {
  default     = "emissions-elt-demo"
  description = "project id from GCP"
}

variable "region" {
  default     = "us-west4"
  description = "GCP region"
}

variable "zone" {
  default     = "us-west4-a"
  description = "GCP zone"
}

variable "gcp_service_account_email" {
  default     = "eed-terraform-svc-acct@emissions-elt-demo.iam.gserviceaccount.com"
  description = "email address of the sercice account used to provision resources"
}

variable "machine_type" {
  default     = "e2-standard-2"
  description = "GCP machine type for GKE cluster"
}

variable "disk_size_gb" {
  default     = 20
  description = "disk size in GB"
}

variable "gke_cluster_name" {
  default     = "eed-gke"
  description = "name of the GKE cluster"
}

variable "artifact_respository_name" {
  default     = "eed-docker-artifact-repository"
  description = "name of the Docker artifact repository for the project"
}
