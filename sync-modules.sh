#!/bin/bash

# Create the directory if it doesn't exist
mkdir -p frontend/node_modules

# Copy node_modules from container to host
docker cp $(docker-compose ps -q frontend):/app/node_modules/. frontend/node_modules/

echo "Node modules synced to frontend/node_modules" 