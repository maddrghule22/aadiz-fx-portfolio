#!/usr/bin/env node

// Database backup script
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const BACKUP_DIR = process.env.BACKUP_DIR || './backups';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/aadizfx';
const MAX_BACKUPS = process.env.MAX_BACKUPS || 7; // Keep last 7 backups

// Create backup directory if it doesn't exist
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

// Generate backup filename with timestamp
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const backupName = `aadizfx-backup-${timestamp}`;
const backupPath = path.join(BACKUP_DIR, backupName);

console.log(`Creating backup: ${backupName}`);

// Execute mongodump
const command = `mongodump --uri="${MONGODB_URI}" --out="${backupPath}"`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Backup failed: ${error.message}`);
    process.exit(1);
  }
  
  if (stderr) {
    console.error(`Backup stderr: ${stderr}`);
  }
  
  console.log(`Backup created successfully: ${backupPath}`);
  
  // Compress the backup
  const compressCommand = `tar -czf "${backupPath}.tar.gz" -C "${BACKUP_DIR}" "${backupName}"`;
  
  exec(compressCommand, (compressError, compressStdout, compressStderr) => {
    if (compressError) {
      console.error(`Compression failed: ${compressError.message}`);
    }
    
    if (compressStderr) {
      console.error(`Compression stderr: ${compressStderr}`);
    }
    
    console.log(`Backup compressed: ${backupPath}.tar.gz`);
    
    // Remove uncompressed backup directory
    fs.rmSync(backupPath, { recursive: true, force: true });
    console.log(`Removed uncompressed backup directory`);
    
    // Clean up old backups
    cleanupOldBackups();
  });
});

// Function to clean up old backups
function cleanupOldBackups() {
  fs.readdir(BACKUP_DIR, (err, files) => {
    if (err) {
      console.error(`Failed to read backup directory: ${err.message}`);
      return;
    }
    
    // Filter for backup files
    const backupFiles = files.filter(file => 
      file.startsWith('aadizfx-backup-') && file.endsWith('.tar.gz')
    );
    
    // Sort by modification time (newest first)
    backupFiles.sort((a, b) => {
      const aTime = fs.statSync(path.join(BACKUP_DIR, a)).mtime.getTime();
      const bTime = fs.statSync(path.join(BACKUP_DIR, b)).mtime.getTime();
      return bTime - aTime;
    });
    
    // Remove old backups
    if (backupFiles.length > MAX_BACKUPS) {
      const filesToRemove = backupFiles.slice(MAX_BACKUPS);
      filesToRemove.forEach(file => {
        const filePath = path.join(BACKUP_DIR, file);
        fs.unlinkSync(filePath);
        console.log(`Removed old backup: ${file}`);
      });
    }
    
    console.log(`Backup cleanup completed. Kept ${Math.min(backupFiles.length, MAX_BACKUPS)} recent backups.`);
  });
}