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

variable "eed_db_host" {
  default     = ""
  description = "Host IP for the ELT database"
}

variable "eed_db_user" {
  default     = ""
  description = "Username for the ELT database"
}

variable "eed_db_pass" {
  default     = ""
  description = "Password for the ELT database"
}
