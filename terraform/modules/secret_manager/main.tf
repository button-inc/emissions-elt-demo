# Create a secret for database host
resource "google_secret_manager_secret" "eed_db_host" {
  provider = google-beta

  secret_id = "eed_db_host"
  replication {
    automatic = true
  }
}
# Add the secret data
resource "google_secret_manager_secret_version" "eed_db_host" {
  secret      = google_secret_manager_secret.eed_db_host.id
  secret_data = var.eed_db_host
}

# Create a secret for database username
resource "google_secret_manager_secret" "eed_db_user" {
  provider = google-beta

  secret_id = "eed_db_user"
  replication {
    automatic = true
  }
}
# Add the secret data
resource "google_secret_manager_secret_version" "eed_db_user" {
  secret      = google_secret_manager_secret.eed_db_user.id
  secret_data = var.eed_db_user
}

# Create a secret for database password
resource "google_secret_manager_secret" "eed_db_pass" {
  provider = google-beta

  secret_id = "eed_db_pass"
  replication {
    automatic = true
  }
}
# Add the secret data
resource "google_secret_manager_secret_version" "eed_db_pass" {
  secret      = google_secret_manager_secret.eed_db_pass.id
  secret_data = var.eed_db_pass
}
