# Road Safety App - Docker Deployment

This directory contains Docker configuration files for deploying the Road Safety Application backend.

## Prerequisites

- Docker and Docker Compose installed on your system
- Git repository cloned locally

## Deployment Steps

### 1. Build and Deploy

Navigate to the deployment directory:

```bash
cd road-safety-app/backend/deployment
```

Start the application using Docker Compose:

```bash
docker-compose up -d
```

This will:
- Build the backend application image
- Start the MySQL database
- Start Adminer (web-based database management tool)
- Link all services together

### 2. Checking the Deployment

- Backend API is accessible at: http://localhost:3000
- Adminer is accessible at: http://localhost:8080
  - System: MySQL
  - Server: mysql
  - Username: root
  - Password: password
  - Database: road_safety_db

### 3. Managing the Deployment

Stop the services:

```bash
docker-compose down
```

Stop the services and remove volumes (this will delete the database data):

```bash
docker-compose down -v
```

View logs:

```bash
# All services
docker-compose logs

# Specific service
docker-compose logs backend
```

Restart a specific service:

```bash
docker-compose restart backend
```

### Environment Variables

The following environment variables can be configured in the docker-compose.yml file:

- `DATABASE_HOST`: MySQL host (default: mysql)
- `DATABASE_PORT`: MySQL port (default: 3306)
- `DATABASE_USER`: MySQL user (default: root)
- `DATABASE_PASSWORD`: MySQL password (default: password)
- `DATABASE_NAME`: Database name (default: road_safety_db)
- `PORT`: Port on which the backend API runs (default: 3000)

## Directory Structure

- `docker-compose.yml`: Configuration for all services
- `../Dockerfile`: Dockerfile for building the backend application
- `../.dockerignore`: Files to exclude from Docker build

## Customization

To customize the deployment, edit the `docker-compose.yml` file and adjust the environment variables or other settings as needed. 