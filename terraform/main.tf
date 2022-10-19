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
  ELT_DB_HOST    = module.postgres.db_instance_address
  ELT_DB_USER    = module.postgres.db_instance_username
  ELT_DB_PASS    = module.postgres.db_instance_generated_user_password
  depends_on     = [module.postgres]
}

module "tfstate_bucket" {
  source = "./modules/tfstate_bucket"
  region = var.region
}
