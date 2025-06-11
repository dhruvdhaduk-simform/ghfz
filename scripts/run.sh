#!/usr/bin/env bash

if [ "$#" -lt 1 ]; then
    echo "Invalid command line arguments."
    echo "Please provide the link of .tgz file as the first command line argument."
    exit 1
fi

PACKAGE_URL="$1"
shift
TEMP_DIR="$(mktemp -d)"

pushd "$TEMP_DIR"
curl -fsSL "$PACKAGE_URL" -o package.tgz
npm install package.tgz
popd

npx --prefix="$TEMP_DIR" ghfz "$@"
rm -rf "$TEMP_DIR"