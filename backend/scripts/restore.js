#!/usr/bin/env node

// Database restore script
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Get backup file from command line arguments
const backupFile = process.argv[2];

if (!backupFile) {
  console.error('Usage: node restore.js <backup-file.tar.gz>');
  console.error('Example: node restore.js ./backups/aadizfx-backup-2023-01-01-12-00-00.tar.gz');
  process.exit(1);
}

// Check if backup file exists
if (!fs.existsSync(backupFile)) {
  console.error(`Backup file not found: ${backupFile}`);
  process.exit(1);
}

// Configuration
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/aadizfx';
const TEMP_DIR = './temp-restore';

console.log(`Restoring backup: ${backupFile}`);

// Extract the backup file
const extractCommand = `tar -xzf "${backupFile}" -C .`;

exec(extractCommand, (error, stdout, stderr) => {
  if (error) {
    console.error(`Extraction failed: ${error.message}`);
    process.exit(1);
  }
  
  if (stderr) {
    console.error(`Extraction stderr: ${stderr}`);
  }
  
  // Get the extracted directory name
  const backupDirName = path.basename(backupFile, '.tar.gz');
  const backupDirPath = path.join('.', backupDirName);
  
  console.log(`Backup extracted to: ${backupDirPath}`);
  
  // Execute mongorestore
  const restoreCommand = `mongorestore --uri="${MONGODB_URI}" --drop "${backupDirPath}"`;
  
  console.log('Starting database restore...');
  
  exec(restoreCommand, (restoreError, restoreStdout, restoreStderr) => {
    if (restoreError) {
      console.error(`Restore failed: ${restoreError.message}`);
    }
    
    if (restoreStderr) {
      console.error(`Restore stderr: ${restoreStderr}`);
    }
    
    console.log('Database restore completed');
    
    // Clean up extracted directory
    fs.rmSync(backupDirPath, { recursive: true, force: true });
    console.log(`Removed temporary extraction directory`);
  });
});