/** @format */

import { useState, useEffect } from "react";
import config from "../config";
import { HealthService } from "@proto/health_connect";
import { HealthRequest } from "@proto/health_pb";
import { createGrpcWebTransport } from "@bufbuild/connect-web";
import { createPromiseClient } from "@bufbuild/connect";

interface HealthStatus {
  status: string;
  message: string;
}

const transport = createGrpcWebTransport({
  baseUrl: config.grpcWebUrl,
});

const client = createPromiseClient(HealthService, transport);

export const useHealth = () => {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const request = new HealthRequest({ name: "Dogg" });
    client
      .getHealthStatus(request)
      .then((response) => {
        setHealth({
          status: response.status,
          message: response.message,
        });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { health, loading, error };
};
