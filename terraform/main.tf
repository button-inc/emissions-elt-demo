terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "4.35.0"
    }
  }
}

provider "google" {
  credentials = file("emissions-elt-demo-0d5982a5127a.json")

  project = var.project
  region  = var.region
  zone    = var.zone
}
