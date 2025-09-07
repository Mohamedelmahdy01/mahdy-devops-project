#!/bin/bash

echo "========================================"
echo "    Mahdy Project - Quick Start"
echo "========================================"
echo

echo "Building and starting containers..."
docker-compose up --build -d

echo
echo "Waiting for services to start..."
sleep 10

echo
echo "========================================"
echo "    Services Status"
echo "========================================"
docker-compose ps

echo
echo "========================================"
echo "    Access URLs"
echo "========================================"
echo "Frontend: http://localhost:8080"
echo "Backend:  http://localhost:3000"
echo "Health:   http://localhost:3000/health"
echo

echo "========================================"
echo "    Useful Commands"
echo "========================================"
echo "View logs:     docker-compose logs -f"
echo "Stop services: docker-compose down"
echo "Restart:       docker-compose restart"
echo