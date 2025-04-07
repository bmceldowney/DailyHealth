FROM golang:1.21 as builder

WORKDIR /app/backend

# Install protoc and required packages
RUN apt-get update && apt-get install -y protobuf-compiler && \
    go install google.golang.org/protobuf/cmd/protoc-gen-go@v1.31.0 && \
    go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@v1.3.0

# First copy only the files needed for dependency resolution
COPY go.mod go.sum ./

# Download all dependencies
RUN go mod download

# Copy the rest of the code
COPY . .

# Generate protobuf code
RUN protoc --go_out=. --go_opt=paths=source_relative \
    --go-grpc_out=. --go-grpc_opt=paths=source_relative \
    proto/health.proto

# Vendor dependencies after protobuf generation
RUN go mod vendor

# Build the application
RUN go build -mod=vendor -o main .

# Final stage
FROM golang:1.21

WORKDIR /app

# Copy the binary from builder
COPY --from=builder /app/backend/main .

EXPOSE 50051

# Run the server
CMD ["/bin/sh", "-c", "echo 'Starting gRPC server...' && ./main"] 