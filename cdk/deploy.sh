#!/bin/bash

# Check args
if [ $# -lt 1 ]; then
  echo "FAILED: invalid args" 1>&2
  echo "bash ./deploy.sh (ENV_NAME)" 1>&2
  exit 1
fi

# Retrieve ENV_NAME
export ENV_NAME=$1

# Fix directory path
cd `dirname $0`

# CDK deploy
source .venv/bin/activate
pip install -r requirements.txt
npx cdk deploy ${PROFILE} --require-approval=never
deactivate
