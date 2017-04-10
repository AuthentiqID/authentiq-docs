#!/bin/bash
#
# Deploy developer documentation to test or prod.
#
set -e

SOURCE="site"

if [ "$1" == "prod" ]; then
    DEST="s3://authentiq-docs"
    URL="https://developers.authentiq.com/"
elif [ "$1" == "test" ]; then
    DEST="s3://authentiq-docs-test"
    URL="http://authentiq-docs-test.s3-website-eu-west-1.amazonaws.com/"
else
    echo "Please specify either prod or test."
    exit 1
fi

mkdocs build --site-dir "$SOURCE"
aws s3 cp --recursive "$SOURCE" "$DEST"

echo
echo "Developer Docs deployed, view them at $URL"
