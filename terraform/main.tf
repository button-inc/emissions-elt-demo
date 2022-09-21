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


# create Docker artifact repository
resource "google_artifact_registry_repository" "eed-artifacts" {
  provider      = google-beta
  location      = var.region
  repository_id = var.artifact_respository_name
  description   = "eed docker repository"
  format        = "DOCKER"
}

# GKE
resource "google_service_account" "default" {
  account_id   = "service-account-id"
  display_name = "Service Account"
}

resource "google_container_cluster" "primary" {
  name     = "eed-gke"
  location = var.region

  # We can't create a cluster with no node pool defined, but we want to only use
  # separately managed node pools. So we create the smallest possible default
  # node pool and immediately delete it.
  remove_default_node_pool = true
  initial_node_count       = 1

  # This is set to maintain idempotency. Without this empty block declared,
  # deafult settings are applied, and on every `terraform apply` it forces
  # a destroy and rebuild
  # From the docs: "It's recommended that you create a VPC-native cluster,
  # done by specifying the ip_allocation_policy block or using secondary ranges on existing subnet."
  # https://registry.terraform.io/providers/hashicorp/google/latest/docs/guides/using_gke_with_terraform
  ip_allocation_policy {}
}

resource "google_container_node_pool" "primary_preemptible_nodes" {
  name       = "eed-node-pool"
  location   = var.region
  cluster    = google_container_cluster.primary.name
  node_count = 1
}

module "cloud_compose" {
  source         = "./modules/cloud_compose"
  project        = var.project
  region         = var.region
  project_number = var.project_number
}
