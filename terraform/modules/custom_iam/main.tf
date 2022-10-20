# Define roles to be used for service accounts

# Build Trigger Role
resource "google_project_iam_custom_role" "build-trigger-role" {
  role_id     = "build_trigger_role"
  title       = "Build Trigger Role"
  description = "A description"
  permissions = [
    "artifactregistry.repositories.uploadArtifacts",
    "container.clusters.get",
    "container.clusters.getCredentials",
    "container.clusters.list",
    "container.deployments.create",
    "container.deployments.get",
    "container.deployments.update",
    "container.services.create",
    "container.services.get",
    "iam.serviceAccounts.actAs",
    "logging.logEntries.create",
    "run.executions.get",
    "run.jobs.create",
    "run.jobs.get",
    "run.jobs.run",
    "run.services.get",
    "run.services.getIamPolicy",
    "run.services.setIamPolicy",
    "run.services.update",
    "secretmanager.versions.access"
  ]
}

resource "google_service_account" "build_trigger_sa" {
  provider     = google-beta
  account_id   = "build-trigger-sa"
  display_name = "Service account for build trigger"
}

resource "google_project_iam_member" "build_trigger_sa" {
  provider = google-beta
  project  = var.project
  member   = format("serviceAccount:%s", google_service_account.build_trigger_sa.email)
  role = "projects/emissions-elt-demo/roles/build_trigger_role"
}
