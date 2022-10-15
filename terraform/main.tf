terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "4.3.0"
    }
  }
}

provider "google" {
  credentials = file("gcp_sa_secret.json")

  project = var.project
  region  = var.region
}

provider "google-beta" {
  project     = var.project
  region      = var.region
  credentials = file("gcp_sa_secret.json")
}

module "postgres" {
  source  = "./modules/postgres"
  project = var.project
  region  = var.region
}

module "gke" {
  source  = "./modules/gke"
  project = var.project
  region  = var.region
  zone    = var.zone
}

module "cloud_composer" {
  source         = "./modules/cloud_composer"
  project        = var.project
  project_number = var.project_number
  region         = var.region
}
