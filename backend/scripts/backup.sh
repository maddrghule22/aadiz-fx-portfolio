#!/bin/bash

# Database backup script for Aditya Shinde

# Create backups directory if it doesn't exist
mkdir -p /backups

# Get current date for backup filename
DATE=$(date +%Y%m%d_%H%M%S)

# Backup MongoDB database
mongodump --uri="mongodb://localhost:27017/aadizfx" --out="/backups/mongodb_$DATE"

# Compress the backup
tar -czf "/backups/mongodb_$DATE.tar.gz" "/backups/mongodb_$DATE"

# Remove uncompressed backup to save space
rm -rf "/backups/mongodb_$DATE"

# Keep only the last 7 days of backups
find /backups -name "mongodb_*.tar.gz" -mtime +7 -delete

echo "Backup completed: /backups/mongodb_$DATE.tar.gz"