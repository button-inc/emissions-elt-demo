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

variable "gcp_service_account_email" {
  default     = "eed-terraform-svc-acct@emissions-elt-demo.iam.gserviceaccount.com"
  description = "email address of the sercice account used to provision resources"
}
