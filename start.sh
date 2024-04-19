#!/bin/bash

# Function to check if a container is running
is_container_running() {
  docker ps --filter "name=$1" --format "{{.Names}}" | grep -q "^$1$"
}

# Start the navidShop container
docker start navidShop
if [ $? -ne 0 ]; then
  echo "Failed to start navidShop container"
  exit 1
fi

# Start the redisToy container
docker start redistoy
if [ $? -ne 0 ]; then
  echo "Failed to start redisToy container"
  exit 1
fi

# # Wait for the containers to be running
# echo "Waiting for containers to start..."
# while ! is_container_running navidShop || ! is_container_running redisToy; do
#   sleep 1
# done

echo "Containers started successfully"

# Run yarn start:dev in the current directory
yarn start:dev