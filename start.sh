#!/bin/bash
if [ "$HALT" == "1" ]; then
  echo "HALT don't do anything"
else
  if [[ -z "$AWS_CERT" && -z "$AWS_PRIVATE_KEY" && -z "$AWS_ROOT_CA" ]]
  then
    echo "Creating AWS certificates"
    curl -X POST -H "Cache-Control: no-cache" -H 'Content-Type: application/json' \
    -v -d '{ "uuid": "'$RESIN_DEVICE_UUID'", "attributes": {} }' \
    $LAMBDA
  elif [[ "$AWS_CERT" && "$AWS_PRIVATE_KEY" && "$AWS_ROOT_CA" ]]
    then
      echo "AWS certificates exist - running app"
      node /usr/src/app/index.js
  else
    echo "Can't start; all expected AWS_ vars must be defined"
  fi
fi
