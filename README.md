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
