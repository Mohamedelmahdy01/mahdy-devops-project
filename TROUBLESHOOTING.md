# Troubleshooting Guide

## Common Issues and Solutions

### 1. Frontend Docker Build Error

**Error**: `addgroup: group 'nginx' in use`

**Cause**: The nginx:alpine image already has a nginx group and user.

**Solution**: Use the existing nginx user instead of creating a new one.

**Fixed in**: `frontend/Dockerfile` - Updated to use existing nginx user.

### 2. GitHub Actions Authentication Failed

**Error**: `authentication failed` or `unauthorized`

**Solutions**:
1. Check Docker Hub username and access token in GitHub secrets
2. Verify the access token has write permissions
3. Ensure the Docker Hub repositories exist

### 3. Image Push Failed

**Error**: `denied: requested access to the resource is denied`

**Solutions**:
1. Verify Docker Hub repository exists
2. Check if you have push permissions
3. Ensure access token has correct permissions

### 4. Build Context Issues

**Error**: `failed to solve: failed to compute cache key`

**Solutions**:
1. Check if all required files exist
2. Verify .dockerignore is not excluding necessary files
3. Ensure Dockerfile paths are correct

## Testing Locally

Before pushing to GitHub Actions, test locally:

```bash
# Test backend build
docker build -t test-backend ./backend

# Test frontend build
docker build -t test-frontend ./frontend

# Test running
docker run -p 3000:3000 test-backend
docker run -p 8080:8080 test-frontend
```

## Debug Commands

```bash
# Check Docker Hub login
docker login

# Test push manually
docker tag test-backend your-username/mahdy-backend:test
docker push your-username/mahdy-backend:test

# Check GitHub Actions logs
# Go to GitHub → Actions → Select workflow → Check logs
```

## Common Fixes

### 1. Update Dockerfile
If you encounter user/group issues:
- Use existing users in base images
- Check base image documentation
- Avoid creating conflicting users

### 2. Check Secrets
Ensure GitHub secrets are set correctly:
- `DOCKERHUB_USERNAME`: Your Docker Hub username
- `DOCKERHUB_ACCESS_TOKEN`: Valid access token with write permissions

### 3. Verify Repositories
Make sure Docker Hub repositories exist:
- `mahdy-backend`
- `mahdy-frontend`

## Getting Help

1. Check GitHub Actions logs for detailed error messages
2. Test builds locally first
3. Verify all prerequisites are met
4. Check Docker Hub and GitHub documentation
