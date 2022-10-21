variable "project" {
  default     = "emissions-elt-demo"
  description = "project id from GCP"
}

variable "composer_dags_bucket" {
  default     = ""
  description = "gcs bucket where composer dags are located"
}

variable "build_trigger_sa_id" {
  description = "id for the build trigger service account"
}
