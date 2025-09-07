# Use the official Node.js 18 Alpine image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if present)
# Using wildcard to handle both files
COPY package*.json ./

# Install application dependencies
# The --only=production flag installs only production dependencies
RUN npm install --only=production

# Copy the rest of the application source code
COPY . .

# Switch to the non-root 'node' user that already exists in the image
USER node

# Expose the port the application runs on
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Command to run the application
CMD ["npm", "start"]