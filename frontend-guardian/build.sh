#!/bin/bash

# Fix directory path
cd `dirname $0`

# Build web page
npm run build
if [ ! -e build/index.html ]; then
  echo "React build failed!!"
  exit -1
fi
