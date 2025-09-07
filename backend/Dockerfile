# Use the official Node.js 18 Alpine image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if present)
COPY package*.json ./

# Install application dependencies
RUN npm install --only=production

# Copy the rest of the application source code
COPY . .

# Ensure 'node' user owns the app directory
RUN chown -R node:node /app

# Switch to non-root user
USER node

# Expose the port
EXPOSE 3000

# Install curl for healthcheck
USER root
RUN apk add --no-cache curl
USER node

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Start the app
CMD ["npm", "start"]
