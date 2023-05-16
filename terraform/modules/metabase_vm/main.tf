module "gce-metabase-container" {
  source  = "terraform-google-modules/container-vm/google"
  version = "~> 2.0"

  container = {
    image = var.metabase_docker_image
  }

  restart_policy = "Always"
}

resource "google_compute_instance" "metabase_vm" {
  project      = var.project
  name         = var.metabase_name
  machine_type = var.machine_type
  zone         = var.zone

  # If true, allows Terraform to stop the instance to update its properties.
  allow_stopping_for_update = true

  tags = [ "metabase" ]

  boot_disk {
    initialize_params {
      # image = module.gce-metabase-container.source_image
      image = module.gce-metabase-container.source_image
    }
  }

  network_interface {
    network = google_compute_network.default.name

    access_config {}
  }

  metadata = {
    gce-container-declaration = module.gce-metabase-container.metadata_value
  }


  labels = {
    container-vm = module.gce-metabase-container.vm_container_label
  }
}

resource "google_compute_network" "default" {
  name = var.network_name
}

resource "google_compute_firewall" "metabase" {
  name        = var.metabase_name
  network     = google_compute_network.default.name
  description = "Connection port for eed-metabase"
  direction   = "INGRESS"

  target_tags = [ "metabase" ]

  allow {
    protocol = "tcp"
    ports    = ["3000"]
  }

  source_ranges = ["0.0.0.0/0"]
}
