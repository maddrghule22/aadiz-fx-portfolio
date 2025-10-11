# Local Development Startup Script for Aadiz.FX

Write-Host "Starting Aadiz.FX in Development Mode" -ForegroundColor Green

# Check if MongoDB is needed
Write-Host "Checking MongoDB requirement..." -ForegroundColor Yellow

$envContent = Get-Content "backend/.env" -Raw
if ($envContent -match "mongodb://localhost") {
    Write-Host "[WARNING] Local MongoDB required but not installed." -ForegroundColor Yellow
    Write-Host "Options:" -ForegroundColor Yellow
    Write-Host "1. Install MongoDB locally" -ForegroundColor Yellow
    Write-Host "2. Use MongoDB Atlas (cloud) - Update MONGODB_URI in backend/.env" -ForegroundColor Yellow
    Write-Host "3. Start Docker Desktop and run: docker-compose up -d" -ForegroundColor Yellow
    Write-Host ""
}

# Start Backend
Write-Host "Starting Backend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend'; npm run dev"

# Wait a moment for backend to start
Start-Sleep -Seconds 3

# Start Frontend  
Write-Host "Starting Frontend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\project-lensflare'; npm run dev"

Write-Host ""
Write-Host "[SUCCESS] Development servers starting..." -ForegroundColor Green
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Green
Write-Host "Backend:  http://localhost:5000" -ForegroundColor Green
Write-Host ""
Write-Host "Note: You need a MongoDB connection for the backend to work properly." -ForegroundColor Yellow