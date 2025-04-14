#!/bin/sh

# Create generated directory if it doesn't exist
mkdir -p proto/generated
rm -rf proto/generated/*

# Generate TypeScript types and client
# protoc \
#   --plugin=protoc-gen-grpc-web=/usr/local/bin/protoc-gen-grpc-web \
#   --grpc-web_out=import_style=typescript,mode=grpcweb:./proto/generated \
#   --proto_path=./proto/src \
#   ./proto/src/*.proto

# Generate JavaScript implementation
# protoc \
#   --plugin=protoc-gen-es=./node_modules/.bin/protoc-gen-es \
#   --plugin=protoc-gen-grpc-web=/usr/local/bin/protoc-gen-grpc-web \
#   --es_out=./proto/generated \
#   --es_opt=target=js+dts \
#   --grpc-web_out=import_style=typescript,mode=grpcwebtext:./proto/generated \
#   -I=./proto/src \
#   ./proto/src/*.proto




protoc \
  --plugin=protoc-gen-ts_proto=./node_modules/.bin/protoc-gen-ts_proto \
  -I=./proto/src \
  --ts_proto_out=./proto/generated \
  --ts_proto_opt=outputServices=grpc-web,env=browser,esModuleInterop=true,forceLong=string \
  ./proto/src/*.proto




echo "Proto files generated successfully!" 