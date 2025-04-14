/** @format */

const config = {
  grpcServerUrl: import.meta.env.VITE_GRPC_SERVER_URL || "localhost:50051",
  grpcWebUrl: import.meta.env.VITE_GRPC_WEB_URL || "http://localhost:8080",
};

export default config;
