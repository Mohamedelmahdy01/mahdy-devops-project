# Mahdy Project Makefile

.PHONY: help build up down logs clean restart status

# Default target
help:
	@echo "Mahdy Project - Available Commands:"
	@echo ""
	@echo "  make build     - Build all containers"
	@echo "  make up        - Start all services"
	@echo "  make down      - Stop all services"
	@echo "  make restart   - Restart all services"
	@echo "  make logs      - Show logs for all services"
	@echo "  make status    - Show status of all services"
	@echo "  make clean     - Clean up containers and images"
	@echo "  make dev       - Start in development mode"
	@echo "  make prod      - Start in production mode"
	@echo "  make deploy-prod - Deploy using production images"
	@echo "  make pull-prod - Pull production images from Docker Hub"
	@echo "  make deploy-status - Show deployment status"
	@echo ""

# Build all containers
build:
	docker-compose build

# Start all services
up:
	docker-compose up -d

# Start with build
up-build:
	docker-compose up -d --build

# Stop all services
down:
	docker-compose down

# Stop and remove volumes
down-clean:
	docker-compose down -v

# Show logs
logs:
	docker-compose logs -f

# Show logs for specific service
logs-backend:
	docker-compose logs -f backend

logs-frontend:
	docker-compose logs -f frontend

# Restart all services
restart:
	docker-compose restart

# Show status
status:
	docker-compose ps

# Clean up
clean:
	docker-compose down -v
	docker system prune -f

# Development mode
dev:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d

# Production mode
prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Health check
health:
	@echo "Checking backend health..."
	@curl -f http://localhost:3000/health || echo "Backend is not healthy"
	@echo "Checking frontend health..."
	@curl -f http://localhost:8080/health || echo "Frontend is not healthy"

# Install dependencies locally (for development)
install-backend:
	cd backend && npm install

# Run backend locally
run-backend:
	cd backend && npm run dev

# Run frontend locally
run-frontend:
	cd frontend && npx serve -s . -l 8080

# Production deployment
deploy-prod:
	docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d

# Pull production images
pull-prod:
	docker pull $(DOCKERHUB_USERNAME)/mahdy-backend:$(BACKEND_TAG)
	docker pull $(DOCKERHUB_USERNAME)/mahdy-frontend:$(FRONTEND_TAG)

# Show deployment status
deploy-status:
	@echo "Docker Hub Images:"
	@echo "Backend: $(DOCKERHUB_USERNAME)/mahdy-backend:$(BACKEND_TAG)"
	@echo "Frontend: $(DOCKERHUB_USERNAME)/mahdy-frontend:$(FRONTEND_TAG)"
	@echo ""
	@echo "Local Containers:"
	@docker ps --filter "name=mahdy-"