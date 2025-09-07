# GitHub Actions Workflows

This directory contains GitHub Actions workflows for the Mahdy project.

## Available Workflows

### 1. Manual Docker Build and Push (`manual-build.yml`)

**Trigger**: Manual (workflow_dispatch)

**Purpose**: Build and optionally push Docker images to Docker Hub

**Inputs**:
- `backend_tag`: Backend image tag (default: latest)
- `frontend_tag`: Frontend image tag (default: latest)
- `push_to_registry`: Whether to push to Docker Hub (default: true)

**Usage**:
1. Go to Actions tab in GitHub
2. Select "Manual Docker Build and Push"
3. Click "Run workflow"
4. Fill in the inputs (optional)
5. Click "Run workflow"

### 2. Automatic Docker Build and Push (`docker-build.yml`)

**Trigger**: 
- Push to main/master branch
- Push tags (v*)
- Pull requests to main/master
- Manual (workflow_dispatch)

**Purpose**: Automatically build and push Docker images

**Features**:
- Automatic tagging based on branch/tag
- Multi-platform builds
- Build caching
- Metadata extraction

## Required Secrets

Add these secrets to your GitHub repository:

### Docker Hub Secrets
- `DOCKERHUB_USERNAME`: Your Docker Hub username
- `DOCKERHUB_ACCESS_TOKEN`: Your Docker Hub access token

### How to get Docker Hub Access Token:
1. Go to Docker Hub
2. Click on your profile
3. Go to Account Settings
4. Go to Security tab
5. Click "New Access Token"
6. Give it a name (e.g., "GitHub Actions")
7. Copy the token and add it to GitHub secrets

## Image Naming Convention

Images will be pushed to Docker Hub with the following naming:
- Backend: `{DOCKERHUB_USERNAME}/mahdy-backend:{tag}`
- Frontend: `{DOCKERHUB_USERNAME}/mahdy-frontend:{tag}`

## Tags

### Manual Workflow
- Uses the tag you specify in the input
- Default: `latest`

### Automatic Workflow
- `latest`: For main/master branch
- `{branch-name}`: For other branches
- `{version}`: For version tags (e.g., v1.0.0)
- `{major}.{minor}`: For version tags (e.g., 1.0)

## Usage Examples

### Manual Build with Custom Tags
```bash
# In GitHub Actions UI:
# backend_tag: v1.0.0
# frontend_tag: v1.0.0
# push_to_registry: true
```

### Build Only (No Push)
```bash
# In GitHub Actions UI:
# backend_tag: latest
# frontend_tag: latest
# push_to_registry: false
```

### Using Built Images

After successful build, you can use the images:

```bash
# Pull images
docker pull {DOCKERHUB_USERNAME}/mahdy-backend:latest
docker pull {DOCKERHUB_USERNAME}/mahdy-frontend:latest

# Run containers
docker run -p 3000:3000 {DOCKERHUB_USERNAME}/mahdy-backend:latest
docker run -p 8080:8080 {DOCKERHUB_USERNAME}/mahdy-frontend:latest
```

## Troubleshooting

### Common Issues

1. **Authentication Failed**
   - Check Docker Hub username and access token
   - Ensure secrets are properly set in GitHub

2. **Build Failed**
   - Check Dockerfile syntax
   - Verify all required files are present
   - Check build logs in GitHub Actions

3. **Push Failed**
   - Verify Docker Hub repository exists
   - Check if you have push permissions
   - Ensure access token has write permissions

### Debug Steps

1. Check GitHub Actions logs
2. Verify secrets are set correctly
3. Test Docker build locally
4. Check Docker Hub repository permissions
