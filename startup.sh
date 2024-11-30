#!/bin/sh

# Function to check if a port is in use and kill the process
kill_process_on_port() {
  PORT=$1
  echo "Checking if port $PORT is in use..."
  if lsof -i :$PORT >/dev/null; then
    echo "Port $PORT is in use. Attempting to kill the process..."
    PID=$(lsof -t -i :$PORT)
    echo "Found PID $PID using port $PORT."
    kill -9 $PID
    if [ $? -eq 0 ]; then
      echo "Successfully killed process $PID."
    else
      echo "Failed to kill process $PID."
    fi
  else
    echo "Port $PORT is not in use."
  fi
}

# Check if Ganache port is in use and kill the process if necessary
kill_process_on_port 7545

# Start Ganache CLI in the background and capture its output in a temporary file
echo "Starting Ganache CLI..."
ganache-cli -p 7545 > ganache_output.log 2>&1 &

# Wait for Ganache to be ready
echo "Waiting for Ganache to start..."
TIMEOUT=30
COUNT=0
while ! nc -z localhost 7545 && [ $COUNT -lt $TIMEOUT ]; do
  echo "Ganache is not ready yet, waiting..."
  sleep 2
  COUNT=$((COUNT + 1))
done

if [ $COUNT -ge $TIMEOUT ]; then
  echo "Ganache did not start within $TIMEOUT seconds."
  exit 1
fi

echo "Ganache is ready!"

# Extract the first private key from Ganache output
echo "Extracting the first private key..."
PRIVATE_KEY=$(grep -A 10 "Private Keys" ganache_output.log | awk 'NR==2 {print $1}')

if [ -z "$PRIVATE_KEY" ]; then
  echo "Failed to extract private key from Ganache output."
  cat ganache_output.log  # Output Ganache log for debugging
  exit 1
fi

echo "Extracted private key: $PRIVATE_KEY"

# Export GANACHE URL and PRIVATE KEY
export PRIVATE_KEY=$PRIVATE_KEY
export GANACHE_URL=http://localhost:7545

# Write the private key and Ganache URL to .env
echo "Saving environment variables to .env..."
{
  echo "PRIVATE_KEY=$PRIVATE_KEY"
  echo "GANACHE_URL=http://localhost:7545"
} >> .env

# Run the contract deployment script
echo "Deploying smart contract..."
CONTRACT_ADDRESS=$(npx hardhat run scripts/deploy.js --network ganache | grep -o '0x[a-fA-F0-9]\{40\}')

if [ -z "$CONTRACT_ADDRESS" ]; then
  echo "Failed to deploy contract or extract contract address."
  exit 1
fi

echo "Contract deployed at address: $CONTRACT_ADDRESS"

# Update contract address in .env
echo "Saving contract address to .env..."
echo "CONTRACT_ADDRESS=$CONTRACT_ADDRESS" >> .env

# Start the application
echo "Starting blockchain wallet service..."
npm start
