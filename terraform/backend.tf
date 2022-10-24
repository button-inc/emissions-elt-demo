terraform {
  backend "gcs" {
    bucket  = "24214ff671e5a158-bucket-tfstate"
    prefix  = "terraform/state"
  }
}
