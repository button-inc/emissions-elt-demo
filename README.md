# emissions-elt-demo

## Developer Notes

Large files are being stored with [git-lfs](https://git-lfs.github.com/).
The list of what it is tracking can be found in `.gitattributes`, currently `terraform/.terraform`.

To add to the tracked list, use
`git lfs track <>` where <> could be `"*.someFileExtension"`, `path/to/dir/**` for an entire directory.

## Tooling initialization

### asdf

[asdf](https://asdf-vm.com/) is used to maintain consistent software tooling for this repo. See [installation instructions here](https://asdf-vm.com/guide/getting-started.html).

After cloning the repo, run `asdf install` to add any required software packages.

### Pre-commit

This repo uses [pre-commit](https://pre-commit.com/) to preform static analysis, code linting/formatting and more.

After asdf has already been run to install pre-commit, run: `pre-commit install`.

> If pre-commit hooks are not running (or are incomplete), try `pre-commit uninstall` and `pre-commit install` to refresh.

> For pre-commit install errors; such as, no module named ‘\_sqlite3’. Install db-sqlite3, see [here](https://www.notion.so/buttoninc/how-to-fix-selected-pre-commit-errors-30d35eb093b24a0da50a155c3fe5bfcf)

### GitLint

After pre-commit is installed, run `pre-commit install --hook-type commit-msg` to enable [gitlint](https://jorisroovers.com/gitlint/#using-gitlint-through-pre-commit)

## Terraform

In order to run terraform plan etc. in this project, you currently need to ask for the credentials file. This will be dealt with properly shortly.

After making changes to terraform code:

- `terraform validate` to ensure the configuration is syntactically valid and internally consistent.
- `terraform fmt` to format the code (make sure to save the files it formatted after running this).
- `terraform plan` to view what will be changed.
- `terraform apply` to apply the changes to the cluster.
- `terraform destroy` to tear down the resources.

### Testing

Testing is handled using the [Terratest](https://terratest.gruntwork.io/) framework. Test are written in Go. See `terraform/modules/metabase_vm/metabase_vm_test.go` for a first example. As the `go test` command does not have any actual go modules to compile, test files will need to be explicitly called.

Current tests include:

```shell
go test terraform/modules/metabase_vm/metabase_vm_test.go -v -timeout 10m
```

**Important note!**: These tests deploy _and destroy_ actual working infrastructure, so when creating them ensure you don't conflict with production infrastructure. Also, there may be costs associated with the deploys!

## Metabase

A Metabase instance is spun up in a GCP Compute Engine VM for Pilot usage. Each instantiation of EED's metabase will have a new IP, so you will need to go into the GCP Console to acquire that IP. When logged in, you can go to the [Compute Engine VM dashboard](https://console.cloud.google.com/compute/instances?project=emissions-elt-demo) and look for an instance named "eed-metabase". You can copy the external IP and access on port `:3000`.
