variable "project" {
  default     = "emissions-elt-demo"
  description = "project id from GCP"
}
variable "project_number" {
  description = "project number from GCP"
}
variable "region" {
  default     = "us-west4"
  description = "GCP region"
}

variable "ELT_DB_HOST" {
  default     = ""
  description = "Host IP for the ELT database"
}

variable "ELT_DB_USER" {
  default     = ""
  description = "Username for the ELT database"
}

variable "ELT_DB_PASS" {
  default     = ""
  description = "Password for the ELT database"
}
