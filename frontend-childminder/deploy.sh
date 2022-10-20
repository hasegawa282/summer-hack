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

# Build web page
bash ./build.sh
if [ $? -ne 0 ]; then
  exit -1
fi
cd `dirname $0`

# Send web page
bash ./s3_sync.sh $ENV_NAME
if [ $? -ne 0 ]; then
  exit -1
fi
