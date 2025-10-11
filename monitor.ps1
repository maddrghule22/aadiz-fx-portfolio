# PowerShell script to monitor Aadiz.FX portfolio website

Write-Host "Starting Aadiz.FX Monitoring Process" -ForegroundColor Green

# Function to check if a port is listening
function Test-Port {
    param(
        [int]$Port
    )
    
    $tcpProperties = [System.Net.NetworkInformation.IPGlobalProperties]::GetIPGlobalProperties()
    $listeners = $tcpProperties.GetActiveTcpListeners()
    
    return $listeners | Where-Object { $_.Port -eq $Port } | Measure-Object | ForEach-Object { $_.Count -gt 0 }
}

# Function to check HTTP status
function Test-Http {
    param(
        [string]$Url
    )
    
    try {
        $response = Invoke-WebRequest -Uri $Url -Method HEAD -TimeoutSec 10
        return $response.StatusCode
    } catch {
        return 0
    }
}

# Check backend service
Write-Host "Checking backend service..." -ForegroundColor Yellow
$backendPortOpen = Test-Port -Port 5000
if ($backendPortOpen) {
    Write-Host "[INFO] Backend port 5000 is open" -ForegroundColor Green
    $backendStatus = Test-Http -Url "http://localhost:5000/health"
    if ($backendStatus -eq 200) {
        Write-Host "[SUCCESS] Backend is responding with status 200" -ForegroundColor Green
    } else {
        Write-Host "[WARNING] Backend responded with status $backendStatus" -ForegroundColor Yellow
    }
} else {
    Write-Host "[ERROR] Backend port 5000 is not open" -ForegroundColor Red
}

# Check frontend service
Write-Host "Checking frontend service..." -ForegroundColor Yellow
$frontendPortOpen = Test-Port -Port 3000
if ($frontendPortOpen) {
    Write-Host "[INFO] Frontend port 3000 is open" -ForegroundColor Green
    $frontendStatus = Test-Http -Url "http://localhost:3000/api/health"
    if ($frontendStatus -eq 200) {
        Write-Host "[SUCCESS] Frontend is responding with status 200" -ForegroundColor Green
    } else {
        Write-Host "[WARNING] Frontend responded with status $frontendStatus" -ForegroundColor Yellow
    }
} else {
    Write-Host "[ERROR] Frontend port 3000 is not open" -ForegroundColor Red
}

# Check MongoDB
Write-Host "Checking MongoDB..." -ForegroundColor Yellow
try {
    $mongoProcess = Get-Process -Name mongod -ErrorAction Stop
    Write-Host "[SUCCESS] MongoDB process is running (PID: $($mongoProcess.Id))" -ForegroundColor Green
} catch {
    Write-Host "[WARNING] MongoDB process not found" -ForegroundColor Yellow
}

# Check Docker containers (if Docker is used)
Write-Host "Checking Docker containers..." -ForegroundColor Yellow
try {
    $dockerContainers = docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
    if ($dockerContainers) {
        Write-Host "[INFO] Docker containers:" -ForegroundColor Green
        Write-Host $dockerContainers
    } else {
        Write-Host "[INFO] No Docker containers running" -ForegroundColor Yellow
    }
} catch {
    Write-Host "[INFO] Docker not available or no containers running" -ForegroundColor Yellow
}

# Check PM2 processes (if PM2 is used)
Write-Host "Checking PM2 processes..." -ForegroundColor Yellow
try {
    $pm2List = pm2 list
    if ($pm2List) {
        Write-Host "[INFO] PM2 processes:" -ForegroundColor Green
        Write-Host $pm2List
    } else {
        Write-Host "[INFO] No PM2 processes running" -ForegroundColor Yellow
    }
} catch {
    Write-Host "[INFO] PM2 not available or no processes running" -ForegroundColor Yellow
}

# Summary
Write-Host "`nMonitoring Summary:" -ForegroundColor Yellow
Write-Host "==================" -ForegroundColor Yellow

if ($backendPortOpen -and $backendStatus -eq 200) {
    Write-Host "✓ Backend service is healthy" -ForegroundColor Green
} else {
    Write-Host "✗ Backend service has issues" -ForegroundColor Red
}

if ($frontendPortOpen -and $frontendStatus -eq 200) {
    Write-Host "✓ Frontend service is healthy" -ForegroundColor Green
} else {
    Write-Host "✗ Frontend service has issues" -ForegroundColor Red
}

Write-Host "`nFor detailed logs, check:" -ForegroundColor Yellow
Write-Host "- Backend logs: backend/logs/" -ForegroundColor Yellow
Write-Host "- Frontend logs: project-lensflare/.next/" -ForegroundColor Yellow
Write-Host "- Nginx logs: /var/log/nginx/ (if using Nginx)" -ForegroundColor Yellow
Write-Host "- Docker logs: docker logs <container_name>" -ForegroundColor Yellow
Write-Host "- PM2 logs: pm2 logs" -ForegroundColor Yellow