# Use Node.js 20 base image
FROM node:20-alpine

# Install dependencies like jq for JSON processing
RUN apk add --no-cache jq

# Set the working directory to the root of the container
WORKDIR /

# Copy package.json and package-lock.json, then install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy the rest of the application code to the root directory
COPY . .

# Copy startup script and ensure it is executable
COPY startup.sh /startup.sh
RUN chmod +x /startup.sh

# Set the entrypoint to the startup script
ENTRYPOINT ["/startup.sh"]

# Expose the service port
EXPOSE 8082
