#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js 20.19+ or 22.12+ is required. Install Node.js and try again."
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "npm is required. Reinstall Node.js with npm included and try again."
  exit 1
fi

echo "Installing project dependencies..."
npm install

echo "Starting the project..."
npm start