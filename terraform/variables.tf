variable "project" {
  default     = "emissions-elt-demo"
  description = "project id from GCP"
}

variable "region" {
  default     = "us-west1"
  description = "GCP region"
}

variable "zone" {
  default     = "us-west1-a"
  description = "GCP zone"
}

variable "artifact_respository_name" {
  default     = "eed-docker-artifact-repository"
  description = "name of the Docker artifact repository for the project"
}
