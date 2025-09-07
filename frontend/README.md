# Mahdy Frontend

Static frontend service using Nginx.

## Running

### Using Docker (Recommended)
```bash
# From main directory
docker-compose up frontend

# Or build container directly
docker build -t mahdy-frontend .
docker run -p 8080:8080 mahdy-frontend
```

### Locally (for development)
```bash
# Use any static server
npx serve -s . -l 8080

# Or Python
python -m http.server 8080

# Or Node.js
npx http-server -p 8080
```

## Files

- `index.html`: Main page
- `styles.css`: Styling
- `script.js`: JavaScript logic
- `nginx.conf`: Nginx configuration
- `Dockerfile`: Container configuration

## Features

- Responsive design
- Dark/Light theme
- Arabic/English toggle
- Backend integration
- Modern UI/UX

## Configuration

### Nginx Settings
- Port: 8080
- Gzip compression enabled
- Security headers
- Static file caching
- Health check endpoint

### Backend Integration
```javascript
// Backend URL configuration
const BACKEND_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3000' 
  : 'http://backend:3000';
```

## Docker

```dockerfile
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY index.html /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
USER nginx
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
```

## Security Features

- Non-root user
- Security headers
- Content Security Policy
- XSS protection
- Content type validation

## Responsive Design

- Mobile-first approach
- Flexible grid layout
- Touch-friendly buttons
- Optimized for all screen sizes