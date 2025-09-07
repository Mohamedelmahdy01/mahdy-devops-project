# Use the official Node.js 18 Alpine image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy dependencies files
COPY package*.json ./

# Install production dependencies
RUN npm install --only=production

# Copy source code
COPY . .

# Install curl for healthcheck
USER root
RUN apk add --no-cache curl
USER node

# Expose app port
EXPOSE 3000

# Healthcheck using curl
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Start the app
CMD ["npm", "start"]
