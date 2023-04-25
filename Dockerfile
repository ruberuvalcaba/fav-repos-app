# Use an official Node.js runtime as a parent image
FROM node:16.14.0

# Set the working directory to /app
WORKDIR /app

# Copy application files to the container
COPY . .

# Install dependencies
RUN yarn install

# Build the TypeScript code
RUN yarn build

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]
