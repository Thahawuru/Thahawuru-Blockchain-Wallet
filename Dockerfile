# Use the latest Node.js 20 base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port used by the Blockchain Wallet service
EXPOSE 8082

# Start the application
CMD ["npm", "start"]
