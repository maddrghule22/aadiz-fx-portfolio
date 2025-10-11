# PowerShell script to deploy Aadiz.FX portfolio website

Write-Host "Starting Aadiz.FX Deployment Process" -ForegroundColor Green

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

# Check MongoDB
try {
    $mongoVersion = mongod --version
    Write-Host "[SUCCESS] MongoDB found" -ForegroundColor Green
} catch {
    Write-Host "[WARNING] MongoDB not found. You'll need to install MongoDB or use MongoDB Atlas." -ForegroundColor Yellow
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

# Return to root directory
Set-Location -Path ".."

# Summary
Write-Host "`n[SUCCESS] Deployment preparation completed successfully!" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Configure your environment variables in backend/.env and project-lensflare/.env.local" -ForegroundColor Yellow
Write-Host "2. Start MongoDB (if using local installation)" -ForegroundColor Yellow
Write-Host "3. Run the backend: cd backend && npm start" -ForegroundColor Yellow
Write-Host "4. Run the frontend: cd project-lensflare && npm start" -ForegroundColor Yellow
Write-Host "5. For production deployment, follow DEPLOYMENT_CHECKLIST.md" -ForegroundColor Yellow