.PHONY: up down restart rebuild clean logs frontend-logs backend-logs frontend-shell backend-shell install-frontend install-backend

# Start all services
up:
	docker-compose up -d

# Stop all services
down:
	docker-compose down

# Stop and remove volumes
down-v:
	docker-compose down -v

# Restart all services
restart:
	docker-compose restart

# Restart frontend only
restart-frontend:
	docker-compose restart frontend

# Restart backend only
restart-backend:
	docker-compose restart backend

# Rebuild and start all services
rebuild:
	docker-compose down
	docker-compose build
	docker-compose up -d

# Full rebuild (including volumes)
rebuild-full:
	docker-compose down -v
	docker-compose build --no-cache
	docker-compose up -d
	docker-compose exec frontend sh -c "npm run generate-proto"

# Clean up Docker system
clean:
	docker system prune -f

# View logs for all services
logs:
	docker-compose logs -f

# View frontend logs
frontend-logs:
	docker-compose logs -f frontend

# View backend logs
backend-logs:
	docker-compose logs -f backend

# Open shell in frontend container
frontend-shell:
	docker-compose exec frontend sh

# Open shell in backend container
backend-shell:
	docker-compose exec backend sh

# Install frontend dependencies
install-frontend:
	docker-compose exec frontend npm install

# Install backend dependencies
install-backend:
	docker-compose exec backend npm install

# Install specific frontend package
install-frontend-pkg:
	@read -p "Enter package name: " pkg; \
	docker-compose exec frontend npm install $$pkg

# Install specific backend package
install-backend-pkg:
	@read -p "Enter package name: " pkg; \
	docker-compose exec backend npm install $$pkg

# Sync node_modules to host
sync-modules:
	./sync-modules.sh

# Generate protos
generate-proto:
	docker-compose exec frontend sh -c "npm run generate-proto"

# Show help
help:
	@echo "Available commands:"
	@echo "  up                  - Start all services"
	@echo "  down                - Stop all services"
	@echo "  down-v              - Stop all services and remove volumes"
	@echo "  restart             - Restart all services"
	@echo "  restart-frontend    - Restart only frontend service"
	@echo "  restart-backend     - Restart only backend service"
	@echo "  rebuild             - Rebuild and restart all services"
	@echo "  rebuild-full        - Full rebuild including volumes and no-cache"
	@echo "  clean               - Clean up Docker system"
	@echo "  logs                - View logs for all services"
	@echo "  frontend-logs       - View frontend logs"
	@echo "  backend-logs        - View backend logs"
	@echo "  frontend-shell      - Open shell in frontend container"
	@echo "  backend-shell       - Open shell in backend container"
	@echo "  install-frontend    - Install frontend dependencies"
	@echo "  install-backend     - Install backend dependencies"
	@echo "  install-frontend-pkg- Install specific frontend package"
	@echo "  install-backend-pkg - Install specific backend package"
	@echo "  generate-proto      - Generate protobuf files for frontend"