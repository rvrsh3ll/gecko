#!/bin/bash

# Check if an argument was provided
if [ -z "$1" ]; then
    echo "Usage: ./build.sh [chrome|ff]"
    exit 1
fi

TARGET=$1

# Map the argument to the npm command
if [ "$TARGET" == "chrome" ]; then
    CMD="npm run build:chrome"
elif [ "$TARGET" == "ff" ]; then
    CMD="npm run build:ff"
else
    echo "Error: Invalid target. Use 'chrome' or 'ff'."
    exit 1
fi

# Ensure the local dist folder exists so Docker can mount it
mkdir -p dist

echo "Building Gecko for $TARGET using Docker..."

# Build the image if it doesn't exist
docker build -t gecko-builder .

# Run the container and mount the current directory
docker run --rm \
  --user "$(id -u):$(id -g)" \
    -v "$(pwd)":/app gecko-builder $CMD

echo "Build complete. Check the 'dist' folder."