#!/usr/bin/env bash

if [ "$#" -ne 1 ]; then
    echo "Invalid command line arguments."
    echo "Please provide the link of .tgz file as command line argument."
    exit 1
fi

PACKAGE_URL="$1"
TEMP_DIR="$(mktemp -d)"

pushd "$TEMP_DIR"
curl -fsSL "$PACKAGE_URL" -o package.tgz
npm install package.tgz
popd

npx --prefix=$TEMP_DIR spawn-react-app

rm -rf "$TEMP_DIR"