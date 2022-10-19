terraform {
  backend "gcs" {
    bucket = "4b6e80d5a1eb0dd7-bucket-tfstate"
    prefix = "terraform/state"
  }
}
