# Deployment Guide

This guide explains how to deploy the Aditya Shinde backend to production.

## Prerequisites

1. Node.js (v14 or higher)
2. MongoDB database (local or cloud instance)
3. Server environment (VPS, cloud server, etc.)

## Environment Setup

### 1. Install Node.js

For Ubuntu/Debian:
```bash
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
```

For CentOS/RHEL:
```bash
curl -fsSL https://rpm.nodesource.com/setup_16.x | sudo bash -
sudo yum install -y nodejs
```

### 2. Install MongoDB

For Ubuntu/Debian:
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

## Deployment Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd aadiz.fx/backend
```

### 2. Install Dependencies

```bash
npm install --production
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory with production values:

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/aadizfx

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=adityashinde6050@gmail.com

# Frontend URL
FRONTEND_URL=https://yourdomain.com

# Rate Limiting
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX=100
```

### 4. Build the Application

```bash
npm run build
```

### 5. Start the Server

```bash
npm start
```

## Using PM2 for Process Management

PM2 is recommended for production deployments to keep your application running.

### 1. Install PM2

```bash
npm install -g pm2
```

### 2. Start Application with PM2

```bash
pm2 start dist/server.js --name aadizfx-backend
```

### 3. Set PM2 to Start on Boot

```bash
pm2 startup
pm2 save
```

### 4. PM2 Useful Commands

```bash
# View application status
pm2 status

# View logs
pm2 logs aadizfx-backend

# Restart application
pm2 restart aadizfx-backend

# Stop application
pm2 stop aadizfx-backend

# Delete application from PM2
pm2 delete aadizfx-backend
```

## Using Nginx as Reverse Proxy

### 1. Install Nginx

For Ubuntu/Debian:
```bash
sudo apt-get install nginx
```

For CentOS/RHEL:
```bash
sudo yum install nginx
```

### 2. Create Nginx Configuration

Create a new file `/etc/nginx/sites-available/aadizfx`:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 3. Enable the Site

```bash
sudo ln -s /etc/nginx/sites-available/aadizfx /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## SSL Certificate with Let's Encrypt

### 1. Install Certbot

For Ubuntu/Debian:
```bash
sudo apt-get install certbot python3-certbot-nginx
```

For CentOS/RHEL:
```bash
sudo yum install certbot python3-certbot-nginx
```

### 2. Obtain SSL Certificate

```bash
sudo certbot --nginx -d yourdomain.com
```

### 3. Auto-renewal

Certbot sets up a cron job automatically, but you can test it with:

```bash
sudo certbot renew --dry-run
```

## Database Backup

### 1. Create Backup Script

Create `backup.sh`:

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mongodump --uri="mongodb://localhost:27017/aadizfx" --out="/backups/mongodb_$DATE"
find /backups -type d -mtime +7 -exec rm -rf {} +
```

### 2. Make Script Executable

```bash
chmod +x backup.sh
```

### 3. Schedule with Cron

```bash
# Edit crontab
crontab -e

# Add line to run backup daily at 2 AM
0 2 * * * /path/to/backup.sh
```

## Monitoring and Logging

### 1. View Application Logs

With PM2:
```bash
pm2 logs aadizfx-backend
```

### 2. System Logs

```bash
# Nginx logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# System logs
journalctl -u mongod
```

## Environment-Specific Configurations

### Development
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/aadizfx
```

### Production
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://localhost:27017/aadizfx
```

### Staging
```env
NODE_ENV=staging
PORT=5000
MONGODB_URI=mongodb://localhost:27017/aadizfx_staging
```

## Troubleshooting

### Common Issues

1. **Port already in use**:
   ```bash
   lsof -i :5000
   kill -9 <PID>
   ```

2. **MongoDB connection issues**:
   ```bash
   systemctl status mongod
   systemctl restart mongod
   ```

3. **Nginx configuration errors**:
   ```bash
   nginx -t
   systemctl restart nginx
   ```

4. **PM2 application not starting**:
   ```bash
   pm2 logs
   pm2 restart aadizfx-backend
   ```

### Health Checks

Create a health check endpoint monitor:
```bash
curl -f http://localhost:5000/health || exit 1
```

## Security Considerations

1. Use strong, unique passwords for all services
2. Keep Node.js and dependencies updated
3. Restrict MongoDB access to localhost only
4. Use firewall rules to limit access
5. Regularly backup your data
6. Monitor logs for suspicious activity
7. Use HTTPS in production
8. Set proper file permissions

## Performance Optimization

1. Use PM2 cluster mode for multiple CPU cores:
   ```bash
   pm2 start dist/server.js -i max --name aadizfx-backend
   ```

2. Enable gzip compression in Nginx:
   ```nginx
   gzip on;
   gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
   ```

3. Use Redis for caching (optional):
   ```bash
   npm install redis
   ```

This deployment guide should help you successfully deploy the Aditya Shinde backend to a production environment.