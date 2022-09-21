terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "3.60"
    }
  }
}

provider "google" {
  credentials = file("gcp_sa_secret.json")

  project = var.project
  region  = var.region
  zone    = var.zone
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
}


# create Docker artifact repository
resource "google_artifact_registry_repository" "eed-artifacts" {
  provider      = google-beta
  location      = var.region
  repository_id = var.artifact_respository_name
  description   = "eed docker repository"
  format        = "DOCKER"
}
