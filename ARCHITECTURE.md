# Mahdy Project Architecture

## General Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Docker Host                              │
│                                                             │
│  ┌─────────────────┐    ┌─────────────────┐                │
│  │   Frontend      │    │   Backend       │                │
│  │   Container     │    │   Container     │                │
│  │                 │    │                 │                │
│  │  ┌───────────┐  │    │  ┌───────────┐  │                │
│  │  │  Nginx    │  │    │  │  Node.js  │  │                │
│  │  │  :8080    │  │    │  │  :3000    │  │                │
│  │  └───────────┘  │    │  └───────────┘  │                │
│  │                 │    │                 │                │
│  │  Static Files:  │    │  API Endpoints: │                │
│  │  - index.html   │    │  - /            │                │
│  │  - styles.css   │    │  - /health      │                │
│  │  - script.js    │    │  - /api/hello   │                │
│  └─────────────────┘    └─────────────────┘                │
│           │                       │                        │
│           └───────────┬───────────┘                        │
│                       │                                    │
│              ┌───────────────┐                             │
│              │ Docker Network│                             │
│              │ mahdy-network│                            │
│              └───────────────┘                             │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

```
User Request
     │
     ▼
┌─────────────┐
│  Browser    │
│  :8080      │
└─────────────┘
     │
     ▼
┌─────────────┐    HTTP Request    ┌─────────────┐
│  Frontend   │ ──────────────────▶│  Backend    │
│  Container  │                    │  Container  │
│  (Nginx)    │◀────────────────── │  (Node.js)  │
└─────────────┘    JSON Response   └─────────────┘
     │
     ▼
┌─────────────┐
│  User       │
│  Browser    │
└─────────────┘
```

## Container Details

### Frontend Container
- **Base Image**: nginx:alpine
- **Port**: 8080
- **User**: nginx (non-root)
- **Files**:
  - index.html
  - styles.css
  - script.js
  - nginx.conf

### Backend Container
- **Base Image**: node:18-alpine
- **Port**: 3000
- **User**: nodejs (non-root)
- **Dependencies**:
  - express
  - cors

## Network Configuration

### Docker Network
- **Name**: mahdy-network
- **Driver**: bridge
- **Services**:
  - frontend (accessible as `frontend`)
  - backend (accessible as `backend`)

### Port Mapping
- Frontend: `localhost:8080` → `frontend:8080`
- Backend: `localhost:3000` → `backend:3000`

## Environment Variables

### Backend
- `NODE_ENV`: production/development
- `PORT`: 3000
- `FRONTEND_URL`: http://localhost:8080

### Frontend
- `FRONTEND_PORT`: 8080

## Security Features

### Container Security
- Non-root users in both containers
- Minimal base images (alpine)
- Health checks enabled
- Resource limits (can be added)

### Network Security
- Internal Docker network
- CORS configuration
- Security headers in Nginx

### Application Security
- Input validation
- XSS protection
- Content Security Policy

## Monitoring & Health Checks

### Health Check Endpoints
- Frontend: `GET /health`
- Backend: `GET /health`

### Health Check Configuration
```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 40s
```

## Deployment Options

### Development
```bash
docker-compose up --build
```

### Production
```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### Scaling
```bash
docker-compose up --scale backend=3
```

## Performance Optimizations

### Frontend
- Nginx gzip compression
- Static file caching
- Minified assets (can be added)

### Backend
- Express.js optimization
- Connection pooling (can be added)
- Caching (can be added)

## CI/CD Integration

### Build Process
1. Build backend container
2. Build frontend container
3. Run tests
4. Deploy to registry
5. Deploy to production

### Testing
- Unit tests for backend
- Integration tests
- End-to-end tests

## Logging

### Log Locations
- Frontend: Nginx access/error logs
- Backend: Application logs
- Docker: Container logs

### Log Management
```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend
```

## Troubleshooting

### Common Issues
1. **Port conflicts**: Change ports in docker-compose.yml
2. **Network issues**: Check Docker network configuration
3. **Permission issues**: Verify user permissions in containers
4. **Health check failures**: Check service endpoints

### Debug Commands
```bash
# Check container status
docker-compose ps

# Check network connectivity
docker-compose exec frontend ping backend

# Check logs
docker-compose logs backend
docker-compose logs frontend

# Inspect containers
docker inspect mahdy-backend
docker inspect mahdy-frontend
```