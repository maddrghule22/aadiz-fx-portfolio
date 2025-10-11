#!/bin/bash

# Bash script to deploy Aadiz.FX portfolio website - Production Quality

# Default values
DOCKER=false
PM2=false

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --docker)
      DOCKER=true
      shift
      ;;
    --pm2)
      PM2=true
      shift
      ;;
    *)
      echo "Unknown option $1"
      exit 1
      ;;
  esac
done

echo "Starting Aadiz.FX Production Deployment Process"

# Check if required tools are installed
echo "Checking prerequisites..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js not found. Please install Node.js v18 or higher."
    exit 1
else
    NODE_VERSION=$(node --version)
    echo "[SUCCESS] Node.js $NODE_VERSION found"
fi

# Check Docker (if using Docker deployment)
if [ "$DOCKER" = true ]; then
    if ! command -v docker &> /dev/null; then
        echo "[ERROR] Docker not found. Please install Docker."
        exit 1
    else
        DOCKER_VERSION=$(docker --version)
        echo "[SUCCESS] Docker $DOCKER_VERSION found"
    fi
fi

# Check PM2 (if using PM2 deployment)
if [ "$PM2" = true ]; then
    if ! command -v pm2 &> /dev/null; then
        echo "[WARNING] PM2 not found. Installing PM2..."
        npm install -g pm2
    else
        PM2_VERSION=$(pm2 --version)
        echo "[SUCCESS] PM2 $PM2_VERSION found"
    fi
fi

# Check MongoDB (if not using Docker)
if [ "$DOCKER" = false ]; then
    if ! command -v mongod &> /dev/null; then
        echo "[WARNING] MongoDB not found. You'll need to install MongoDB or use MongoDB Atlas."
    else
        echo "[SUCCESS] MongoDB found"
    fi
fi

# Create environment files if they don't exist
echo "Checking environment configuration..."

# Backend environment
if [ ! -f "backend/.env" ]; then
    echo "[INFO] Creating backend environment file"
    cp backend/.env.example backend/.env 2>/dev/null || echo "[INFO] No .env.example file found"
fi

# Frontend environment
if [ ! -f "project-lensflare/.env.local" ]; then
    echo "[INFO] Creating frontend environment file"
    cp project-lensflare/.env.local.example project-lensflare/.env.local 2>/dev/null || echo "[INFO] No .env.local.example file found"
fi

# Build backend
echo "Building backend..."
cd backend
npm run build
if [ $? -eq 0 ]; then
    echo "[SUCCESS] Backend built successfully"
else
    echo "[ERROR] Backend build failed"
    exit 1
fi

# Build frontend
echo "Building frontend..."
cd ../project-lensflare
npm run build
if [ $? -eq 0 ]; then
    echo "[SUCCESS] Frontend built successfully"
else
    echo "[ERROR] Frontend build failed"
    exit 1
fi

# Deployment based on selected method
if [ "$DOCKER" = true ]; then
    echo "Deploying with Docker..."
    cd ..
    
    # Check if docker-compose file exists
    if [ ! -f "docker-compose.production.yml" ]; then
        echo "[ERROR] docker-compose.production.yml not found"
        exit 1
    fi
    
    # Start services
    docker-compose -f docker-compose.production.yml up -d
    if [ $? -eq 0 ]; then
        echo "[SUCCESS] Services started with Docker"
    else
        echo "[ERROR] Failed to start services with Docker"
        exit 1
    fi
elif [ "$PM2" = true ]; then
    echo "Deploying with PM2..."
    cd ..
    
    # Check if PM2 config exists
    if [ ! -f "backend/ecosystem.production.config.js" ]; then
        echo "[ERROR] ecosystem.production.config.js not found"
        exit 1
    fi
    
    # Start services with PM2
    pm2 start backend/ecosystem.production.config.js --env production
    if [ $? -eq 0 ]; then
        echo "[SUCCESS] Services started with PM2"
        pm2 save
    else
        echo "[ERROR] Failed to start services with PM2"
        exit 1
    fi
else
    echo "Building Docker images..."
    cd ..
    
    # Build Docker images
    docker build -f backend/Dockerfile.production -t aadizfx-backend ./backend
    if [ $? -eq 0 ]; then
        echo "[SUCCESS] Backend Docker image built"
    else
        echo "[ERROR] Failed to build backend Docker image"
        exit 1
    fi
    
    docker build -f project-lensflare/Dockerfile.production -t aadizfx-frontend ./project-lensflare
    if [ $? -eq 0 ]; then
        echo "[SUCCESS] Frontend Docker image built"
    else
        echo "[ERROR] Failed to build frontend Docker image"
        exit 1
    fi
fi

# Seed database (only for non-Docker deployments or first time)
if [ "$DOCKER" = false ]; then
    echo "Seeding database..."
    cd backend
    npm run import
    if [ $? -eq 0 ]; then
        echo "[SUCCESS] Database seeded successfully"
    else
        echo "[WARNING] Database seeding failed"
    fi
    cd ..
fi

# Return to root directory
cd ..

# Summary
echo ""
echo "[SUCCESS] Production deployment completed successfully!"
echo "Next steps:"

if [ "$DOCKER" = true ]; then
    echo "1. Configure your environment variables in .env files"
    echo "2. Update SSL certificate paths in nginx.production.conf"
    echo "3. Run: docker-compose -f docker-compose.production.yml up -d"
elif [ "$PM2" = true ]; then
    echo "1. Configure your environment variables in backend/.env and project-lensflare/.env.local"
    echo "2. Start MongoDB (if using local installation)"
    echo "3. Run: pm2 start backend/ecosystem.production.config.js --env production"
    echo "4. Run: pm2 save (to persist configuration)"
else
    echo "1. Configure your environment variables in backend/.env and project-lensflare/.env.local"
    echo "2. Start MongoDB (if using local installation)"
    echo "3. Run the backend: cd backend && node dist/server.js"
    echo "4. Run the frontend: cd project-lensflare && npm start"
fi

echo ""
echo "For production deployment, ensure you:"
echo "- Update domain names in nginx.production.conf"
echo "- Configure SSL certificates"
echo "- Set strong passwords in environment files"
echo "- Configure email settings for contact form"
echo "- Set up monitoring and log rotation"