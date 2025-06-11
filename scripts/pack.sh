#!/usr/bin/env bash

SOURCE_DIR=$(cd $(dirname "${BASH_SOURCE[0]}") && pwd)

DIST_DIR="$SOURCE_DIR/../dist"

mkdir -p "$DIST_DIR"

cp "$SOURCE_DIR/run.sh" "$DIST_DIR"

pushd "$SOURCE_DIR/.."
npm pack
mv ghfz*.tgz "$DIST_DIR/ghfz.tgz"
popd