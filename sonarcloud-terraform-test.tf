# This file is for testing the SonarCloud scan. Do not merge.

# AWS IAM policies should not allow privilege escalation
resource "aws_iam_policy" "lambdaUpdatePolicy" {
  name = "lambdaUpdatePolicy"
  policy =<<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "lambda:UpdateFunctionCode"
            ],
            "Resource": "*"
        }
    ]
}
EOF
}
