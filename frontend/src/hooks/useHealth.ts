/** @format */

import { useState, useEffect } from "react";
import config from "../config";
import { HealthServiceClient } from "@proto/HealthServiceClientPb";
import { HealthRequest, HealthRequestSchema } from "@proto/health_pb";
import { create } from "@bufbuild/protobuf";

interface HealthStatus {
  status: string;
  message: string;
}

const client = new HealthServiceClient(config.grpcWebUrl);

export const useHealth = () => {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const request: HealthRequest = create(HealthRequestSchema);

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
