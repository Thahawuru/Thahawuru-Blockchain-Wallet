#!/bin/sh

# Function to check if a port is in use and kill the process
kill_process_on_port() {
  PORT=$1
  if lsof -i :$PORT >/dev/null; then
    echo "Port $PORT is already in use. Killing the process occupying this port..."
    PID=$(lsof -t -i :$PORT)
    kill -9 $PID
    echo "Killed process $PID on port $PORT."
  else
    echo "Port $PORT is available."
  fi
}

# Check if Ganache port is in use and kill the process if necessary
kill_process_on_port 7545

# Start Ganache CLI in the background and capture its output in a temporary file
echo "Starting Ganache CLI..."
ganache-cli -p 7545 > ganache_output.log 2>&1 &

# Wait for Ganache to be ready
while ! nc -z localhost 7545; do
  echo "Waiting for Ganache to start..."
  sleep 2
done

# Extract only the first private key from Ganache output
echo "Extracting the first private key..."
PRIVATE_KEY=$(grep -A 10 "Private Keys" ganache_output.log | awk 'NR==2 {print $1}')

# Export GANACHE URL and PRIVATE KEY
export PRIVATE_KEY=$PRIVATE_KEY
export GANACHE_URL=http://localhost:7545

# Write the private key to .env
echo "PRIVATE_KEY=$PRIVATE_KEY" >> .env
echo "GANACHE_URL=http://localhost:7545" >> .env

# Run the contract deployment script
echo "Deploying smart contract..."
CONTRACT_ADDRESS=$(npx hardhat run scripts/deploy.js --network ganache | grep -o '0x[a-fA-F0-9]\{40\}')

# Update contract address in .env
echo "CONTRACT_ADDRESS=$CONTRACT_ADDRESS" >> .env

# Start the application
echo "Starting blockchain wallet service..."
npm start
