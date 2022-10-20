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

# Deploy services
cd `dirname $0`
bash ./cdk/deploy.sh $ENV_NAME
cd `dirname $0`
bash ./frontend-guardian/deploy.sh $ENV_NAME
cd `dirname $0`
bash ./frontend-childminder/deploy.sh $ENV_NAME
