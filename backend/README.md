# Mahdy Backend

Node.js Express backend service for the project.

## Running

### Using Docker (Recommended)
```bash
# From main directory
docker-compose up backend

# Or build container directly
docker build -t mahdy-backend .
docker run -p 3000:3000 mahdy-backend
```

### Locally (for development)
```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Run in production mode
npm start
```

## API Endpoints

### GET /
```json
{
  "message": "Hello from Node.js Backend!",
  "timestamp": "2025-01-27T10:30:00.000Z",
  "environment": "development",
  "service": "backend"
}
```

### GET /health
```json
{
  "status": "healthy",
  "uptime": 123.456,
  "timestamp": "2025-01-27T10:30:00.000Z",
  "service": "backend"
}
```

### GET /api/hello
```json
{
  "message": "Hello from API endpoint!",
  "data": {
    "method": "GET",
    "url": "/api/hello",
    "headers": {...},
    "clientIP": "127.0.0.1",
    "timestamp": "2025-01-27T10:30:00.000Z"
  },
  "service": "backend"
}
```

## Environment Variables

- `PORT`: Port number (default: 3000)
- `NODE_ENV`: Environment (development/production)
- `FRONTEND_URL`: Frontend URL for CORS

## Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY app.js ./
USER nodejs
EXPOSE 3000
CMD ["npm", "start"]
```

## Security Features

- Non-root user
- CORS configuration
- Health checks
- Input validation