#!/usr/bin/env python3
import os
import aws_cdk as cdk

from cdk.cdk_stack import CdkStack

app_prefix = 'biprogyd-' + os.environ['ENV_NAME']

app = cdk.App()
CdkStack(
    app,
    app_prefix,
    app_prefix,
    env=cdk.Environment(
        account=os.environ["CDK_DEFAULT_ACCOUNT"],
        region=os.environ["CDK_DEFAULT_REGION"]))

app.synth()
