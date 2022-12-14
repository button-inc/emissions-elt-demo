# Define roles to be used for service accounts

# Build Trigger Role
resource "google_project_iam_custom_role" "build-trigger-role" {
  role_id     = "build_trigger_role"
  title       = "Build Trigger Role"
  description = "A description"
  permissions = [
    "artifactregistry.repositories.downloadArtifacts",
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
    "secretmanager.versions.access",
    "storage.objects.list",
    "storage.objects.create",
    "storage.objects.delete",
    "storage.objects.update"
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
  role     = "projects/emissions-elt-demo/roles/build_trigger_role"
}

# Cloud Compute Roles
resource "google_project_iam_custom_role" "gke-cloud-compute-role" {
  role_id     = "gke_cloud_compute_role"
  title       = "Cloud Compute Role"
  description = "A description"
  permissions = [
    "artifactregistry.repositories.downloadArtifacts",
    "artifactregistry.repositories.uploadArtifacts",
    "autoscaling.sites.writeMetrics",
    "iam.serviceAccounts.actAs",
    "logging.logEntries.create",
    "monitoring.metricDescriptors.list",
    "monitoring.timeSeries.create",
    "run.services.get",
    "run.services.getIamPolicy",
    "run.services.update",
    "secretmanager.versions.access"
  ]
}

resource "google_service_account" "gke_cloud_compute_sa" {
  provider     = google-beta
  account_id   = "gke-cloud-compute-sa"
  display_name = "Service account for Cloud Compute"
}

resource "google_project_iam_member" "gke_cloud_compute_sa" {
  provider = google-beta
  project  = var.project
  member   = format("serviceAccount:%s", google_service_account.gke_cloud_compute_sa.email)
  role     = "projects/emissions-elt-demo/roles/gke_cloud_compute_role"
}

# Cloud build Roles
resource "google_project_iam_custom_role" "cloud-build-role" {
  role_id     = "custom_cloud_build_role"
  title       = "Cloud Build Role"
  description = "Role for Cloud Build service account"
  permissions = [
    # cloud build service account
    "artifactregistry.repositories.uploadArtifacts",
    "cloudbuild.builds.create",
    "logging.logEntries.create",
    "pubsub.topics.publish",
    "resourcemanager.projects.get",
    "source.repos.get",
    "source.repos.list",
    # cloud run admin
    "resourcemanager.projects.get",
    "run.services.get",
    "run.services.update",
    # secret manager
    "secretmanager.versions.access"
  ]
}

resource "google_service_account" "cloud_build_sa" {
  provider     = google-beta
  account_id   = "cloud-build-sa"
  display_name = "Service account for Cloud Build"
}

resource "google_project_iam_member" "cloud_build_sa" {
  provider = google-beta
  project  = var.project
  member   = format("serviceAccount:%s", google_service_account.cloud_build_sa.email)
  role     = "projects/emissions-elt-demo/roles/custom_cloud_build_role"
}
