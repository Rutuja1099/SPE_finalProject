# Use the official Node.js image as the base image
FROM  node:latest AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
# COPY package*.json ./


# Copy the entire frontend directory to the working directory
COPY . .

RUN npm install -g expo-cli && \
    npm install expo-build-properties@0.11.1 --force


# Install dependencies
RUN npm install

# Expose the port the app runs on
EXPOSE 8081

# Command to run the app
CMD ["npx","expo", "start", "--tunnel"]
