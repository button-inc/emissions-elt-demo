variable "project" {
  default     = "emissions-elt-demo"
  description = "project id from GCP"
}

variable "metabase_name" {
  default     = "eed-metabase"
  description = "name of the Metabase VM"
}

variable "machine_type" {
  default     = "e2-small"
  description = "type of the Metabase VM"
}

variable "region" {
  default     = "us-west4"
  description = "GCP region"
}

variable "zone" {
  default     = "us-west4-a"
  description = "GCP zone"
}

variable "metabase_docker_image" {
  default     = "docker.io/metabase/metabase:latest"
  description = "address of the metabase docker image"
}

variable "network_name" {
  default     = "default"
  description = "name for the vm network"
}
