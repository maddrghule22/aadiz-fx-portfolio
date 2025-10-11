# PowerShell script to backup Aadiz.FX portfolio website

param(
    [Parameter(Mandatory=$false)]
    [string]$BackupPath = "backups",
    [Parameter(Mandatory=$false)]
    [string]$RetentionDays = "30"
)

Write-Host "Starting Aadiz.FX Backup Process" -ForegroundColor Green

# Create backup directory if it doesn't exist
if (-not (Test-Path $BackupPath)) {
    New-Item -ItemType Directory -Path $BackupPath | Out-Null
    Write-Host "[INFO] Created backup directory: $BackupPath" -ForegroundColor Green
}

# Generate timestamp for backup
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$backupName = "aadizfx_backup_$timestamp"
$backupDir = Join-Path $BackupPath $backupName

# Create backup directory
New-Item -ItemType Directory -Path $backupDir | Out-Null
Write-Host "[INFO] Created backup directory: $backupDir" -ForegroundColor Green

# Backup MongoDB database
Write-Host "Backing up MongoDB database..." -ForegroundColor Yellow
try {
    # Using mongodump to backup database
    mongodump --uri="mongodb://localhost:27017/aadizfx" --out="$backupDir/mongodb"
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[SUCCESS] MongoDB database backed up" -ForegroundColor Green
    } else {
        Write-Host "[WARNING] MongoDB backup failed" -ForegroundColor Yellow
    }
} catch {
    Write-Host "[WARNING] MongoDB backup failed: $($_.Exception.Message)" -ForegroundColor Yellow
}

# Backup backend uploads directory
Write-Host "Backing up backend uploads..." -ForegroundColor Yellow
try {
    if (Test-Path "backend/uploads") {
        Copy-Item -Path "backend/uploads" -Destination "$backupDir/uploads" -Recurse
        Write-Host "[SUCCESS] Backend uploads backed up" -ForegroundColor Green
    } else {
        Write-Host "[INFO] No uploads directory found" -ForegroundColor Yellow
    }
} catch {
    Write-Host "[WARNING] Backend uploads backup failed: $($_.Exception.Message)" -ForegroundColor Yellow
}

# Backup environment files
Write-Host "Backing up environment files..." -ForegroundColor Yellow
try {
    if (Test-Path "backend/.env") {
        Copy-Item -Path "backend/.env" -Destination "$backupDir/backend.env"
        Write-Host "[SUCCESS] Backend environment file backed up" -ForegroundColor Green
    }
    
    if (Test-Path "project-lensflare/.env.local") {
        Copy-Item -Path "project-lensflare/.env.local" -Destination "$backupDir/frontend.env"
        Write-Host "[SUCCESS] Frontend environment file backed up" -ForegroundColor Green
    }
} catch {
    Write-Host "[WARNING] Environment files backup failed: $($_.Exception.Message)" -ForegroundColor Yellow
}

# Create backup archive
Write-Host "Creating backup archive..." -ForegroundColor Yellow
$archivePath = "$BackupPath\$backupName.zip"
try {
    Compress-Archive -Path $backupDir -DestinationPath $archivePath -Force
    Write-Host "[SUCCESS] Backup archive created: $archivePath" -ForegroundColor Green
    
    # Remove temporary backup directory
    Remove-Item -Path $backupDir -Recurse -Force
    Write-Host "[INFO] Temporary backup directory removed" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Failed to create backup archive: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Clean up old backups based on retention policy
Write-Host "Cleaning up old backups..." -ForegroundColor Yellow
try {
    $cutoffDate = (Get-Date).AddDays(-[int]$RetentionDays)
    $oldBackups = Get-ChildItem -Path $BackupPath -Filter "aadizfx_backup_*.zip" | Where-Object { $_.CreationTime -lt $cutoffDate }
    
    foreach ($oldBackup in $oldBackups) {
        Remove-Item -Path $oldBackup.FullName -Force
        Write-Host "[INFO] Removed old backup: $($oldBackup.Name)" -ForegroundColor Green
    }
    
    if ($oldBackups.Count -eq 0) {
        Write-Host "[INFO] No old backups to remove" -ForegroundColor Green
    } else {
        Write-Host "[SUCCESS] Removed $($oldBackups.Count) old backups" -ForegroundColor Green
    }
} catch {
    Write-Host "[WARNING] Failed to clean up old backups: $($_.Exception.Message)" -ForegroundColor Yellow
}

# Summary
Write-Host "`n[SUCCESS] Backup process completed!" -ForegroundColor Green
Write-Host "Backup created: $archivePath" -ForegroundColor Yellow
Write-Host "Retention policy: $RetentionDays days" -ForegroundColor Yellow

Write-Host "`nTo restore from backup:" -ForegroundColor Yellow
Write-Host "1. Extract the backup archive" -ForegroundColor Yellow
Write-Host "2. Restore MongoDB: mongorestore --uri='mongodb://localhost:27017/aadizfx' <backup_path>/mongodb" -ForegroundColor Yellow
Write-Host "3. Restore uploads: Copy <backup_path>/uploads to backend/uploads" -ForegroundColor Yellow
Write-Host "4. Restore environment files if needed" -ForegroundColor Yellow