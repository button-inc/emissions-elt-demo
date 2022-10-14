variable "project" {
  default     = "emissions-elt-demo"
  description = "project id from GCP"
}

variable "region" {
  default     = "us-west4"
  description = "GCP region"
}

variable "artifact_respository_name" {
  default     = "eed-docker-artifact-repository"
  description = "name of the Docker artifact repository for the project"
}
