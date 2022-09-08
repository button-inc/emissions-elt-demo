# emissions-elt-demo

## Developer Notes

Large files are being stored with [git-lfs](https://git-lfs.github.com/).
The list of what it is tracking can be found in `.gitattributes`, currently `terraform/.terraform`.

## Terraform

In order to run terraform plan etc. in this project, you currently need to ask for the credentials file. This will be dealt with properly shortly.

After making changes to terraform code:

- `terraform validate` to ensure the configuration is syntactically valid and internally consistent.
- `terraform fmt` to format the code (make sure to save the files it formatted after running this).
- `terraform plan` to view what will be changed.
- `terraform apply` to apply the changes to the cluster.
