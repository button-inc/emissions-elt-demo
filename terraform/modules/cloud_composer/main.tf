# Enable the Cloud Composer API in your project:
resource "google_project_service" "composer_api" {
  provider = google-beta
  project  = var.project
  service  = "composer.googleapis.com"
  // Disabling Cloud Composer API might irreversibly break all other
  // environments in your project.
  // This parameter prevents automatic disabling
  // of the API when the resource is destroyed.
  // We recommend to disable the API only after all environments are deleted.
  disable_on_destroy = false
}

# Create a new service account, which has all required permissions to run a Cloud Composer environment
# Note: This service account might need additional permissions to access other resources in your project.
resource "google_service_account" "cloud_compose_sa" {
  provider     = google-beta
  account_id   = "cloud-composer-sa"
  display_name = "Service account for cloud compose"
}

resource "google_project_iam_member" "cloud_compose_sa" {
  provider = google-beta
  project  = var.project
  member   = format("serviceAccount:%s", google_service_account.cloud_compose_sa.email)
  // Role for Public IP environments
  role = "roles/composer.worker"
}

# Add Cloud Composer Service Agent account as a new principal on your environment's service account,
# and grant the Cloud Composer v2 API Service Agent Extension role to it
resource "google_service_account_iam_member" "cloud_compose_sa" {
  provider           = google-beta
  service_account_id = google_service_account.cloud_compose_sa.name
  role               = "roles/composer.ServiceAgentV2Ext"
  member             = format("serviceAccount:service-%s@cloudcomposer-accounts.iam.gserviceaccount.com", var.project_number)
}

# Create an environment that uses the custom service account.
# You can add more parameters that define other configuration parameters of your environment
#
resource "google_composer_environment" "eed_cloud_compose_env" {
  provider = google-beta
  name     = "eed-cloud-compose-env"

  config {
    software_config {
      image_version = "composer-2.0.26-airflow-2.2.5"
      env_variables = {
        eed_db_host = var.eed_db_host
        eed_db_user = var.eed_db_user
        eed_db_pass = var.eed_db_pass
      }
    }

    node_config {
      service_account = google_service_account.cloud_compose_sa.email
    }

  }
  depends_on = [
    data.google_secret_manager_secret_version.airflow_gcs_bucket
  ]
}

# Create secret for the DAGs bucket name
resource "google_secret_manager_secret" "airflow_gcs_bucket" {
  provider = google-beta

  secret_id = "airflow_gcs_bucket"
  replication {
    automatic = true
  }
}
# Add the secret data
resource "google_secret_manager_secret_version" "airflow_gcs_bucket" {
  secret      = google_secret_manager_secret.airflow_gcs_bucket.id
  secret_data = google_composer_environment.eed_cloud_compose_env.config.0.dag_gcs_prefix
}

data "google_secret_manager_secret_version" "airflow_gcs_bucket" {
  provider = google-beta
  secret   = "airflow_gcs_bucket"
}
