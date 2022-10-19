# create db instance
resource "google_sql_database_instance" "postgresql" {
  name                = var.db_name
  project             = var.project
  region              = var.region
  database_version    = var.db_version
  deletion_protection = false

  settings {
    tier              = var.db_tier
    activation_policy = var.db_activation_policy
    disk_autoresize   = var.db_disk_autoresize
    disk_size         = var.db_disk_size
    disk_type         = var.db_disk_type
    pricing_plan      = var.db_pricing_plan

    maintenance_window {
      day  = "7" # sunday
      hour = "3" # 3am
    }

    backup_configuration {
      enabled    = true
      start_time = "00:00"
    }

    ip_configuration {
      ipv4_enabled = "true"
      authorized_networks {
        value = var.db_instance_access_cidr
      }
    }
  }
}

# create db
resource "google_sql_database" "postgresql_db" {
  name      = var.db_name
  project   = var.project
  instance  = google_sql_database_instance.postgresql.name
  charset   = var.db_charset
  collation = var.db_collation
}

# create user
resource "random_id" "user_password" {
  byte_length = 8
}
resource "google_sql_user" "postgresql_user" {
  name     = var.db_user_name
  project  = var.project
  instance = google_sql_database_instance.postgresql.name
  host     = var.db_user_host
  password = (var.db_user_password == "" ?
  random_id.user_password.hex : var.db_user_password)
}

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
  secret_data = google_sql_database_instance.postgresql.ip_address.0.ip_address
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
  secret_data = var.db_user_name
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
  secret_data = random_id.user_password.hex
}

# read secret data to use in outputs
data "google_secret_manager_secret_version" "eed_db_host" {
  provider = google-beta
  secret   = "eed_db_host"
}

data "google_secret_manager_secret_version" "eed_db_pass" {
  provider = google-beta
  secret   = "eed_db_pass"
}

data "google_secret_manager_secret_version" "eed_db_user" {
  provider = google-beta
  secret   = "eed_db_user"
}
