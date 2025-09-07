# Deployment Guide

This guide explains how to deploy the Mahdy project using GitHub Actions and Docker Hub.

## Prerequisites

1. **GitHub Repository**: Your code should be pushed to GitHub
2. **Docker Hub Account**: Create an account at [Docker Hub](https://hub.docker.com)
3. **Docker Hub Access Token**: Generate an access token for GitHub Actions

## Setup

### 1. Create Docker Hub Repositories

Create two repositories on Docker Hub:
- `mahdy-backend`
- `mahdy-frontend`

### 2. Configure GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add these secrets:

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `DOCKERHUB_USERNAME` | Your Docker Hub username | `mahdy123` |
| `DOCKERHUB_ACCESS_TOKEN` | Your Docker Hub access token | `dckr_pat_...` |

### 3. Get Docker Hub Access Token

1. Go to [Docker Hub](https://hub.docker.com)
2. Click on your profile → Account Settings
3. Go to Security tab
4. Click "New Access Token"
5. Give it a name (e.g., "GitHub Actions")
6. Select "Read, Write, Delete" permissions
7. Copy the token and add it to GitHub secrets

## Deployment Methods

### Method 1: Manual Deployment (Recommended)

1. Go to your GitHub repository
2. Click on "Actions" tab
3. Select "Manual Docker Build and Push"
4. Click "Run workflow"
5. Fill in the inputs:
   - **Backend tag**: `latest` (or your version)
   - **Frontend tag**: `latest` (or your version)
   - **Push to registry**: `true`
6. Click "Run workflow"

### Method 2: Automatic Deployment

The workflow will automatically run when:
- You push to main/master branch
- You create a tag (e.g., `v1.0.0`)
- You create a pull request

## Using the Built Images

### Pull Images

```bash
# Pull the latest images
docker pull your-username/mahdy-backend:latest
docker pull your-username/mahdy-frontend:latest

# Pull specific versions
docker pull your-username/mahdy-backend:v1.0.0
docker pull your-username/mahdy-frontend:v1.0.0
```

### Run with Docker Compose

1. Copy `env.prod.example` to `.env.prod`:
```bash
cp env.prod.example .env.prod
```

2. Edit `.env.prod` with your Docker Hub username:
```bash
DOCKERHUB_USERNAME=your-username
BACKEND_TAG=latest
FRONTEND_TAG=latest
```

3. Run with production compose file:
```bash
docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d
```

### Run Manually

```bash
# Run backend
docker run -d \
  --name mahdy-backend \
  -p 3000:3000 \
  -e NODE_ENV=production \
  your-username/mahdy-backend:latest

# Run frontend
docker run -d \
  --name mahdy-frontend \
  -p 8080:8080 \
  your-username/mahdy-frontend:latest
```

## Image Tags

### Manual Workflow
- Use any tag you specify
- Default: `latest`

### Automatic Workflow
- `latest`: For main/master branch
- `{branch-name}`: For other branches
- `{version}`: For version tags (e.g., v1.0.0)
- `{major}.{minor}`: For version tags (e.g., 1.0)

## Monitoring

### Check Build Status
1. Go to GitHub Actions tab
2. Click on the latest workflow run
3. Check the logs for any errors

### Verify Images
1. Go to Docker Hub
2. Check your repositories
3. Verify images are pushed successfully

### Test Deployment
```bash
# Check if containers are running
docker ps

# Check logs
docker logs mahdy-backend
docker logs mahdy-frontend

# Test endpoints
curl http://localhost:3000/health
curl http://localhost:8080/health
```

## Troubleshooting

### Common Issues

1. **Build Failed**
   - Check GitHub Actions logs
   - Verify Dockerfile syntax
   - Ensure all files are present

2. **Push Failed**
   - Check Docker Hub credentials
   - Verify repository exists
   - Check access token permissions

3. **Authentication Failed**
   - Verify GitHub secrets are set correctly
   - Check Docker Hub username and token
   - Ensure token has write permissions

### Debug Steps

1. **Check GitHub Actions Logs**
   - Go to Actions tab
   - Click on failed workflow
   - Check step logs

2. **Test Locally**
   ```bash
   # Build locally
   docker build -t test-backend ./backend
   docker build -t test-frontend ./frontend
   
   # Test locally
   docker run -p 3000:3000 test-backend
   docker run -p 8080:8080 test-frontend
   ```

3. **Verify Docker Hub**
   - Check if repositories exist
   - Verify you have push permissions
   - Check if images are being pushed

## Best Practices

1. **Use Semantic Versioning**
   - Tag releases with version numbers (e.g., v1.0.0)
   - Use `latest` for development

2. **Test Before Deploy**
   - Test images locally before pushing
   - Use staging environment

3. **Monitor Deployments**
   - Check GitHub Actions status
   - Monitor Docker Hub repositories
   - Test deployed applications

4. **Security**
   - Use access tokens instead of passwords
   - Rotate tokens regularly
   - Limit token permissions
