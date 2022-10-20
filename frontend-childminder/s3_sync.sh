#!/bin/bash

# Check args
if [ $# -lt 1 ]; then
  echo "FAILED: invalid args" 1>&2
  echo "bash ./s3_sync.sh (ENV_NAME)" 1>&2
  exit 1
fi

# Retrieve ENV_NAME
export ENV_NAME=$1
echo "(^^)/~ got ENV_NAME '$ENV_NAME'."

# Fix directory path
cd `dirname $0`

# S3 send
cd ./build
echo "LET'S SYNC ./build -> s3://biprogyd-${ENV_NAME}-childminder-webpage-bucket/"
aws ${PROFILE} s3 sync . s3://biprogyd-${ENV_NAME}-childminder-webpage-bucket/ --delete
cd ..
