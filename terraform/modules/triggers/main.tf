resource "google_cloudbuild_trigger" "elt-build-trigger" {
  provider = google-beta
  project  = var.project
  location = "global"
  name        = "elt-build-trigger"
  description = "triggers the cloudbuild.yaml from source github repo on branch push"

  source_to_build {
    repo_type = "GITHUB"
    uri       = "https://github.com/button-inc/emissions-elt-demo"
    ref       = "refs/heads/feat/import-dags"
  }

  git_file_source {
    path = "cloudbuild.yaml"
    repo_type = "GITHUB"
    uri       = "https://github.com/button-inc/emissions-elt-demo"
  }

  github {
    push {
      branch  = "^feat/import-dags$"
    }
  }

  substitutions = {
    _GCS_BUCKET = "bar"
  }
}
