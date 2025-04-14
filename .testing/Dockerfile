FROM node:18
WORKDIR /test
COPY package.json ./
# Install only ts-proto and its dependencies
RUN npm install
# The command to run when the container starts
CMD ["./node_modules/.bin/protoc-gen-ts_proto", "--version"]