# Quick Start Guide

## GitHub Actions + Docker Hub Deployment

### 1. Setup Docker Hub

1. Create Docker Hub account at [hub.docker.com](https://hub.docker.com)
2. Create two repositories:
   - `mahdy-backend`
   - `mahdy-frontend`

### 2. Get Access Token

1. Go to Docker Hub → Account Settings → Security
2. Click "New Access Token"
3. Name: "GitHub Actions"
4. Permissions: "Read, Write, Delete"
5. Copy the token

### 3. Configure GitHub Secrets

Go to your GitHub repo → Settings → Secrets and variables → Actions

Add these secrets:
- `DOCKERHUB_USERNAME`: Your Docker Hub username
- `DOCKERHUB_ACCESS_TOKEN`: The token you copied

### 4. Deploy

1. Go to GitHub repo → Actions tab
2. Select "Manual Docker Build and Push"
3. Click "Run workflow"
4. Use default inputs or customize tags
5. Click "Run workflow"

### 5. Use the Images

```bash
# Pull images
docker pull your-username/mahdy-backend:latest
docker pull your-username/mahdy-frontend:latest

# Run with docker-compose
cp env.prod.example .env.prod
# Edit .env.prod with your Docker Hub username
docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d
```

## Manual Commands

```bash
# Build and push manually
docker build -t your-username/mahdy-backend:latest ./backend
docker build -t your-username/mahdy-frontend:latest ./frontend

docker push your-username/mahdy-backend:latest
docker push your-username/mahdy-frontend:latest
```

## Access

- Frontend: http://localhost:8080
- Backend: http://localhost:3000
- Health: http://localhost:3000/health

## Troubleshooting

- Check GitHub Actions logs for build errors
- Verify Docker Hub credentials
- Ensure repositories exist on Docker Hub
- Test images locally before pushing
