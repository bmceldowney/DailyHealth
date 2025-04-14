/** @format */

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GRPC_SERVER_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
