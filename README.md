# Mahdy Project - Frontend & Backend Separation

This project demonstrates how to separate Frontend from Backend and create separate containers for each, connecting them using Docker Compose.

## Architecture

```
├── backend/                 # Node.js Backend
│   ├── app.js              # Express server
│   ├── package.json        # Dependencies
│   └── Dockerfile          # Backend container
├── frontend/               # Static Frontend
│   ├── index.html          # Main HTML file
│   ├── styles.css          # CSS styles
│   ├── script.js           # JavaScript logic
│   ├── nginx.conf          # Nginx configuration
│   └── Dockerfile          # Frontend container
├── docker-compose.yml      # Container orchestration
└── README.md              # Documentation
```

## Quick Start

### 1. Run the complete project
```bash
# Build and run all containers
docker-compose up --build

# Run in background
docker-compose up -d --build
```

### 2. Access the application
- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:3000
- **Backend Health**: http://localhost:3000/health

### 3. Stop the project
```bash
# Stop containers
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

## Useful Commands

### Monitor containers
```bash
# Show container status
docker-compose ps

# Show logs
docker-compose logs -f

# Show logs for specific service
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Rebuild specific container
```bash
# Rebuild backend only
docker-compose build backend

# Rebuild frontend only
docker-compose build frontend
```

### Access container
```bash
# Access backend container
docker-compose exec backend sh

# Access frontend container
docker-compose exec frontend sh
```

## Network and Communication

- **Docker Network**: `mahdy-network`
- **Backend Service Name**: `backend` (accessible from frontend via `http://backend:3000`)
- **Frontend Service Name**: `frontend`

## Features

### Backend (Node.js + Express)
- REST API endpoints
- CORS enabled
- Health check endpoint
- Environment variables support
- Non-root user for security
- Health checks in Docker

### Frontend (Nginx + Static Files)
- Responsive design
- Dark/Light theme toggle
- Arabic/English language toggle
- Backend integration
- Nginx optimization
- Security headers
- Gzip compression

## Security

- Non-root users in all containers
- Security headers in Nginx
- CORS configuration in Backend
- Health checks to ensure service health

## Development

### Add new dependencies to backend
```bash
# Access container
docker-compose exec backend sh

# Install new package
npm install package-name

# Exit and save changes
exit

# Rebuild container
docker-compose build backend
```

### Modify frontend
```bash
# Modify files in frontend/ folder
# Then rebuild container
docker-compose build frontend
```

## Performance Monitoring

```bash
# Show resource usage
docker stats

# Show network details
docker network inspect mahdy-network

# Show container details
docker inspect mahdy-backend
docker inspect mahdy-frontend
```

## Troubleshooting

### Connection issues
```bash
# Test connection between containers
docker-compose exec frontend ping backend
docker-compose exec backend ping frontend
```

### Port issues
```bash
# Check used ports
netstat -tulpn | grep :3000
netstat -tulpn | grep :8080
```

### Log issues
```bash
# Show all logs
docker-compose logs

# Show logs with timestamps
docker-compose logs -t
```

## Important Notes

1. **Environment Variables**: Can be modified in `docker-compose.yml`
2. **Ports**: Can be changed in `docker-compose.yml` if already in use
3. **Network**: Containers communicate via internal Docker network
4. **Volumes**: Can add volumes to persist data

## Usage as DevOps Example

This project is a practical example of:
- Containerization with Docker
- Microservices architecture
- Service orchestration with Docker Compose
- Network communication between services
- Health checks and monitoring
- Security best practices

Can be used as a template for future projects or as a learning resource to understand Docker and containerization.