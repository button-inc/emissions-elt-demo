//go:build gcp
// +build gcp

// NOTE: We use build tags to differentiate GCP testing for better isolation and parallelism when executing our tests.

package test

import (
	"testing"
	"fmt"
	"strings"

	"github.com/gruntwork-io/terratest/modules/gcp"
	"github.com/gruntwork-io/terratest/modules/random"
	"github.com/gruntwork-io/terratest/modules/terraform"
)

func TestTerraformMetabaseVm(t *testing.T) {
	t.Parallel()

	projectId := gcp.GetGoogleProjectIDFromEnvVar(t)
	instanceTestName := fmt.Sprintf("metabase-vm-test-%s", strings.ToLower(random.UniqueId()))
	networkTestName := fmt.Sprintf("default-vm-test-%s", strings.ToLower(random.UniqueId()))

	// retryable errors in terraform testing.
	terraformOptions := terraform.WithDefaultRetryableErrors(t, &terraform.Options{
		TerraformDir: "./",
		NoColor: true,

		Vars: map[string]interface{}{
			"metabase_name": instanceTestName,
			"network_name": networkTestName,
		},

		EnvVars: map[string]string{
			"GOOGLE_CLOUD_PROJECT": projectId,
		},
	})

	// 👇 At the end of the test, run `terraform destroy` to clean up any resources that were created.
	defer terraform.Destroy(t, terraformOptions)

	// 👇 Run `terraform init` and `terraform apply`. Fail the test if there are any errors.
	terraform.InitAndApply(t, terraformOptions)
}
