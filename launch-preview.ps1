# PowerShell script to launch Aditya Shinde Portfolio preview and status dashboard

param(
    [Parameter(Mandatory=$false)]
    [switch]$prod = $false
)

Write-Host "Launching Aditya Shinde Portfolio Preview" -ForegroundColor Green

if ($prod) {
    Write-Host "Starting in Production Mode..." -ForegroundColor Yellow
    # Build and start production servers
    Set-Location -Path "c:\Users\darsh\OneDrive\Desktop\aadiz.fx\project-lensflare"
    npm run build
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] Frontend build failed" -ForegroundColor Red
        exit 1
    }
    
    # Start backend
    Start-Process -FilePath "powershell" -ArgumentList "-Command", "cd c:\Users\darsh\OneDrive\Desktop\aadiz.fx\backend; npm run prod" -WindowStyle Hidden
    
    # Start frontend
    Start-Process -FilePath "powershell" -ArgumentList "-Command", "cd c:\Users\darsh\OneDrive\Desktop\aadiz.fx\project-lensflare; npm start" -WindowStyle Hidden
    
    # Wait for services to start
    Start-Sleep -Seconds 5
    
    Write-Host "[INFO] Production servers started" -ForegroundColor Green
} else {
    Write-Host "Starting in Development Mode..." -ForegroundColor Yellow
    # Start development servers
    Start-Process -FilePath "powershell" -ArgumentList "-Command", "cd c:\Users\darsh\OneDrive\Desktop\aadiz.fx\backend; npm run dev" -WindowStyle Hidden
    
    Start-Process -FilePath "powershell" -ArgumentList "-Command", "cd c:\Users\darsh\OneDrive\Desktop\aadiz.fx\project-lensflare; npm run dev" -WindowStyle Hidden
    
    # Wait for services to start
    Start-Sleep -Seconds 5
    
    Write-Host "[INFO] Development servers started" -ForegroundColor Green
}

# Open portfolio website in default browser
Write-Host "Opening portfolio website..." -ForegroundColor Yellow
Start-Process "http://localhost:3000"

# Open status dashboard in default browser
Write-Host "Opening status dashboard..." -ForegroundColor Yellow
$dashboardPath = Join-Path $pwd "status-dashboard.html"
Start-Process "file://$($dashboardPath.Replace('\', '/'))"

# Summary
Write-Host "`n[SUCCESS] Preview environment launched!" -ForegroundColor Green
if ($prod) {
    Write-Host "Mode: Production" -ForegroundColor Cyan
} else {
    Write-Host "Mode: Development" -ForegroundColor Cyan
}
Write-Host "Portfolio Website: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Status Dashboard: file://$($dashboardPath.Replace('\', '/'))" -ForegroundColor Cyan

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
Write-Host "To stop servers, close the PowerShell windows or run taskkill commands." -ForegroundColor Yellow