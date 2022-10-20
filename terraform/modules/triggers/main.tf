resource "google_cloudbuild_trigger" "elt-build-trigger" {
  provider    = google-beta
  project     = var.project
  location    = "global"
  name        = "elt-build-trigger"
  description = "triggers the cloudbuild.yaml from source github repo on branch push"
  service_account = var.build_trigger_sa_id

  source_to_build {
    repo_type = "GITHUB"
    uri       = "https://github.com/button-inc/emissions-elt-demo"
    ref       = "refs/heads/feat/gcp-roles"
  }

  git_file_source {
    path      = "cloudbuild.yaml"
    repo_type = "GITHUB"
    uri       = "https://github.com/button-inc/emissions-elt-demo"
  }

  github {
    owner = "button-inc"
    name = "emissions-elt-demo"
    push {
      branch = "^feat/gcp-roles$"
    }
  }

  substitutions = {
    _GCS_BUCKET = var.composer_dags_bucket
  }
}
