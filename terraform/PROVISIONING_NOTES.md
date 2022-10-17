# Notes on provisioning a fresh project

## GKE

To deploy to the GKE you will need to manually go in and:

- Enable Kubernetes Engine Developer on the cloudbuild service account
- Build a trigger in Cloud Build to run on your selected branch (i.e. `main` or `develop`)
