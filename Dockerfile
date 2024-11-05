# Use Node.js 20 base image
FROM node:20-alpine

# Install dependencies like jq for JSON processing
RUN apk add --no-cache jq

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Copy startup script
COPY startup.sh /app/startup.sh
RUN chmod +x /app/startup.sh

# Expose the service port
EXPOSE 8082
