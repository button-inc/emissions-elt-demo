variable "project" {
  default     = "emissions-elt-demo"
  description = "project id from GCP"
}

variable "composer_dags_bucket" {
  default    = ""
  description = "gcs bucket where composer dags are located"
}
