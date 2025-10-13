# PowerShell script to launch Aditya Shinde Portfolio preview and status dashboard

Write-Host "Launching Aditya Shinde Portfolio Preview" -ForegroundColor Green

# Wait a moment for services to fully start
Start-Sleep -Seconds 3

# Check if required ports are available
Write-Host "Checking service status..." -ForegroundColor Yellow

# Check backend (port 5000)
$backendPort = Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue
if ($backendPort) {
    Write-Host "[INFO] Backend service is running on port 5000" -ForegroundColor Green
} else {
    Write-Host "[WARNING] Backend service is not running on port 5000" -ForegroundColor Yellow
}

# Check frontend (port 3000)
$frontendPort = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
if ($frontendPort) {
    Write-Host "[INFO] Frontend service is running on port 3000" -ForegroundColor Green
} else {
    Write-Host "[WARNING] Frontend service is not running on port 3000" -ForegroundColor Yellow
}

# Open portfolio website in default browser
Write-Host "Opening portfolio website..." -ForegroundColor Yellow
Start-Process "http://localhost:3000"

# Open status dashboard in default browser
Write-Host "Opening status dashboard..." -ForegroundColor Yellow
Start-Process "file://$($pwd)/status-dashboard.html"

# Summary
Write-Host "`n[SUCCESS] Preview environment launched!" -ForegroundColor Green
Write-Host "Portfolio Website: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Status Dashboard: file://$($pwd)/status-dashboard.html" -ForegroundColor Cyan

Write-Host "`nEnhanced deployment files created:" -ForegroundColor Yellow
Write-Host "- Production Docker configuration: docker-compose.production.yml" -ForegroundColor White
Write-Host "- Enhanced Nginx configuration: nginx.production.conf" -ForegroundColor White
Write-Host "- PM2 production configuration: backend/ecosystem.production.config.js" -ForegroundColor White
Write-Host "- Production Dockerfiles: backend/Dockerfile.production, project-lensflare/Dockerfile.production" -ForegroundColor White
Write-Host "- Enhanced deployment scripts: deploy.production.ps1, deploy.production.sh" -ForegroundColor White
Write-Host "- Monitoring script: monitor.ps1" -ForegroundColor White
Write-Host "- Backup script: backup.ps1" -ForegroundColor White
Write-Host "- Enhanced deployment guide: DEPLOYMENT_ENHANCED.md" -ForegroundColor White

Write-Host "`nFor production deployment, follow the DEPLOYMENT_ENHANCED.md guide." -ForegroundColor Yellow