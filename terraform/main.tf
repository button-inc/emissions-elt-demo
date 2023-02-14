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

module "tfstate_bucket" {
  source = "./modules/tfstate_bucket"
  region = var.region
}


module "custom_iam" {
  source  = "./modules/custom_iam"
  project = var.project
}

resource "google_project_service" "gcp_dlp_api" {
  project = var.project
  service = "dlp.googleapis.com"
}

module "postgres" {
  source  = "./modules/postgres"
  project = var.project
  region  = var.region
}

module "gke" {
  source                 = "./modules/gke"
  project                = var.project
  region                 = var.region
  zone                   = var.zone
  cloud_compute_sa_email = module.custom_iam.gke_cloud_compute_sa_email

  depends_on = [module.custom_iam]
}

module "cloud_composer" {
  source         = "./modules/cloud_composer"
  project        = var.project
  project_number = var.project_number
  region         = var.region
  eed_db_host    = module.postgres.db_instance_address
  eed_db_user    = module.postgres.db_instance_username
  eed_db_pass    = module.postgres.db_instance_generated_user_password
  depends_on     = [module.postgres, module.custom_iam]
}

module "metabase_vm" {
  source  = "./modules/metabase_vm"
  project = var.project
  region  = var.region
}

module "triggers" {
  source               = "./modules/triggers"
  composer_dags_bucket = module.cloud_composer.composer_dags_bucket
  build_trigger_sa_id  = module.custom_iam.build_trigger_sa_id

  depends_on = [module.custom_iam]
}
