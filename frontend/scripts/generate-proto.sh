#!/bin/sh

# Create generated directory if it doesn't exist
mkdir -p proto/generated
rm -rf proto/generated/*

# Generate TypeScript types and client
protoc \
  --plugin=protoc-gen-es=./node_modules/.bin/protoc-gen-es \
  --plugin=protoc-gen-connect-es=./node_modules/.bin/protoc-gen-connect-es \
  -I=./proto/src \
  --es_out=./proto/generated \
  --es_opt=target=ts \
  --connect-es_out=./proto/generated \
  --connect-es_opt=target=ts \
  ./proto/src/*.proto



echo "Proto files generated successfully!" 