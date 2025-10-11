# PowerShell script to deploy Aadiz.FX portfolio website - Production Quality

param(
    [Parameter(Mandatory=$false)]
    [switch]$docker = $false,
    [Parameter(Mandatory=$false)]
    [switch]$pm2 = $false
)

Write-Host "Starting Aadiz.FX Production Deployment Process" -ForegroundColor Green

# Check if required tools are installed
Write-Host "Checking prerequisites..." -ForegroundColor Yellow

# Check Node.js
try {
    $nodeVersion = node --version
    Write-Host "[SUCCESS] Node.js $nodeVersion found" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Node.js not found. Please install Node.js v18 or higher." -ForegroundColor Red
    exit 1
}

# Check Docker (if using Docker deployment)
if ($docker) {
    try {
        $dockerVersion = docker --version
        Write-Host "[SUCCESS] Docker $dockerVersion found" -ForegroundColor Green
    } catch {
        Write-Host "[ERROR] Docker not found. Please install Docker." -ForegroundColor Red
        exit 1
    }
}

# Check PM2 (if using PM2 deployment)
if ($pm2) {
    try {
        $pm2Version = pm2 --version
        Write-Host "[SUCCESS] PM2 $pm2Version found" -ForegroundColor Green
    } catch {
        Write-Host "[WARNING] PM2 not found. Installing PM2..." -ForegroundColor Yellow
        npm install -g pm2
    }
}

# Check MongoDB (if not using Docker)
if (-not $docker) {
    try {
        $mongoVersion = mongod --version
        Write-Host "[SUCCESS] MongoDB found" -ForegroundColor Green
    } catch {
        Write-Host "[WARNING] MongoDB not found. You'll need to install MongoDB or use MongoDB Atlas." -ForegroundColor Yellow
    }
}

# Create environment files if they don't exist
Write-Host "Checking environment configuration..." -ForegroundColor Yellow

# Backend environment
if (-not (Test-Path "backend/.env")) {
    Write-Host "[INFO] Creating backend environment file" -ForegroundColor Yellow
    Copy-Item "backend/.env.example" "backend/.env" -ErrorAction SilentlyContinue
}

# Frontend environment
if (-not (Test-Path "project-lensflare/.env.local")) {
    Write-Host "[INFO] Creating frontend environment file" -ForegroundColor Yellow
    Copy-Item "project-lensflare/.env.local.example" "project-lensflare/.env.local" -ErrorAction SilentlyContinue
}

# Build backend
Write-Host "Building backend..." -ForegroundColor Yellow
Set-Location -Path "backend"
npm run build
if ($LASTEXITCODE -eq 0) {
    Write-Host "[SUCCESS] Backend built successfully" -ForegroundColor Green
} else {
    Write-Host "[ERROR] Backend build failed" -ForegroundColor Red
    exit 1
}

# Build frontend
Write-Host "Building frontend..." -ForegroundColor Yellow
Set-Location -Path "../project-lensflare"
npm run build
if ($LASTEXITCODE -eq 0) {
    Write-Host "[SUCCESS] Frontend built successfully" -ForegroundColor Green
} else {
    Write-Host "[ERROR] Frontend build failed" -ForegroundColor Red
    exit 1
}

# Deployment based on selected method
if ($docker) {
    Write-Host "Deploying with Docker..." -ForegroundColor Yellow
    Set-Location -Path ".."
    
    # Check if docker-compose file exists
    if (-not (Test-Path "docker-compose.production.yml")) {
        Write-Host "[ERROR] docker-compose.production.yml not found" -ForegroundColor Red
        exit 1
    }
    
    # Start services
    docker-compose -f docker-compose.production.yml up -d
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[SUCCESS] Services started with Docker" -ForegroundColor Green
    } else {
        Write-Host "[ERROR] Failed to start services with Docker" -ForegroundColor Red
        exit 1
    }
} elseif ($pm2) {
    Write-Host "Deploying with PM2..." -ForegroundColor Yellow
    Set-Location -Path ".."
    
    # Check if PM2 config exists
    if (-not (Test-Path "backend/ecosystem.production.config.js")) {
        Write-Host "[ERROR] ecosystem.production.config.js not found" -ForegroundColor Red
        exit 1
    }
    
    # Start services with PM2
    pm2 start backend/ecosystem.production.config.js --env production
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[SUCCESS] Services started with PM2" -ForegroundColor Green
        pm2 save
    } else {
        Write-Host "[ERROR] Failed to start services with PM2" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "Building Docker images..." -ForegroundColor Yellow
    Set-Location -Path ".."
    
    # Build Docker images
    docker build -f backend/Dockerfile.production -t aadizfx-backend ./backend
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[SUCCESS] Backend Docker image built" -ForegroundColor Green
    } else {
        Write-Host "[ERROR] Failed to build backend Docker image" -ForegroundColor Red
        exit 1
    }
    
    docker build -f project-lensflare/Dockerfile.production -t aadizfx-frontend ./project-lensflare
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[SUCCESS] Frontend Docker image built" -ForegroundColor Green
    } else {
        Write-Host "[ERROR] Failed to build frontend Docker image" -ForegroundColor Red
        exit 1
    }
}

# Seed database (only for non-Docker deployments or first time)
if (-not $docker) {
    Write-Host "Seeding database..." -ForegroundColor Yellow
    Set-Location -Path "backend"
    npm run import
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[SUCCESS] Database seeded successfully" -ForegroundColor Green
    } else {
        Write-Host "[WARNING] Database seeding failed" -ForegroundColor Yellow
    }
    Set-Location -Path ".."
}

# Return to root directory
Set-Location -Path ".."

# Summary
Write-Host "`n[SUCCESS] Production deployment completed successfully!" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Yellow

if ($docker) {
    Write-Host "1. Configure your environment variables in .env files" -ForegroundColor Yellow
    Write-Host "2. Update SSL certificate paths in nginx.production.conf" -ForegroundColor Yellow
    Write-Host "3. Run: docker-compose -f docker-compose.production.yml up -d" -ForegroundColor Yellow
} elseif ($pm2) {
    Write-Host "1. Configure your environment variables in backend/.env and project-lensflare/.env.local" -ForegroundColor Yellow
    Write-Host "2. Start MongoDB (if using local installation)" -ForegroundColor Yellow
    Write-Host "3. Run: pm2 start backend/ecosystem.production.config.js --env production" -ForegroundColor Yellow
    Write-Host "4. Run: pm2 save (to persist configuration)" -ForegroundColor Yellow
} else {
    Write-Host "1. Configure your environment variables in backend/.env and project-lensflare/.env.local" -ForegroundColor Yellow
    Write-Host "2. Start MongoDB (if using local installation)" -ForegroundColor Yellow
    Write-Host "3. Run the backend: cd backend && node dist/server.js" -ForegroundColor Yellow
    Write-Host "4. Run the frontend: cd project-lensflare && npm start" -ForegroundColor Yellow
}

Write-Host "`nFor production deployment, ensure you:" -ForegroundColor Yellow
Write-Host "- Update domain names in nginx.production.conf" -ForegroundColor Yellow
Write-Host "- Configure SSL certificates" -ForegroundColor Yellow
Write-Host "- Set strong passwords in environment files" -ForegroundColor Yellow
Write-Host "- Configure email settings for contact form" -ForegroundColor Yellow
Write-Host "- Set up monitoring and log rotation" -ForegroundColor Yellow