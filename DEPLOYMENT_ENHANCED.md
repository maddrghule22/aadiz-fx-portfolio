# Enhanced Production Deployment Guide

This guide provides instructions for deploying the Aditya Shinde portfolio website with enhanced quality configurations for production environments.

## Deployment Options

The enhanced deployment provides three deployment methods:

1. **Docker Compose** (Recommended for production)
2. **PM2 Process Manager** (Alternative for production)
3. **Manual Deployment** (Traditional approach)

## Prerequisites

- Server with at least 2GB RAM and 20GB storage
- Domain name registered and configured
- SSL certificate (Let's Encrypt or similar)
- DNS records configured

## Option 1: Docker Compose Deployment (Recommended)

### 1. Install Docker and Docker Compose

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install docker.io docker-compose -y

# CentOS/RHEL
sudo yum install docker docker-compose -y

# Start Docker service
sudo systemctl start docker
sudo systemctl enable docker
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
# MongoDB credentials
MONGO_ROOT_USER=admin
MONGO_ROOT_PASSWORD=your_secure_password

# JWT secret for authentication
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Email configuration for contact form
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=adityashinde6050@gmail.com
```

### 3. Update Nginx Configuration

Edit `nginx.production.conf`:
- Replace `aadizfx.com` with your domain name
- Update SSL certificate paths

### 4. Deploy Services

```bash
# Build and start services
docker-compose -f docker-compose.production.yml up -d

# Check service status
docker-compose -f docker-compose.production.yml ps

# View logs
docker-compose -f docker-compose.production.yml logs -f
```

## Option 2: PM2 Deployment

### 1. Install Node.js and PM2

```bash
# Install Node.js (v18+)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 globally
npm install -g pm2
```

### 2. Configure Environment Variables

Configure `backend/.env` and `project-lensflare/.env.local` with production values.

### 3. Deploy Services

```bash
# Start services with PM2
pm2 start backend/ecosystem.production.config.js --env production

# Save PM2 configuration
pm2 save

# Set PM2 to start on boot
pm2 startup
```

## Option 3: Manual Deployment

### 1. Install Dependencies

```bash
# Install Node.js (v18+)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB
sudo apt-get install -y mongodb
```

### 2. Build Applications

```bash
# Build backend
cd backend
npm install --production
npm run build

# Build frontend
cd ../project-lensflare
npm install --production
npm run build
```

### 3. Start Applications

```bash
# Start backend
cd backend
node dist/server.js &

# Start frontend
cd ../project-lensflare
npm start &
```

## SSL Certificate Configuration

### Using Let's Encrypt (Certbot)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Test auto-renewal
sudo certbot renew --dry-run
```

## Nginx Configuration

Copy the enhanced nginx configuration:

```bash
# Copy configuration
sudo cp nginx.production.conf /etc/nginx/sites-available/aadizfx

# Enable site
sudo ln -s /etc/nginx/sites-available/aadizfx /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

## Monitoring and Maintenance

### Monitoring Scripts

Use the provided monitoring scripts:

```bash
# PowerShell (Windows)
.\monitor.ps1

# The script checks:
# - Backend service status
# - Frontend service status
# - MongoDB process
# - Docker containers
# - PM2 processes
```

### Backup Strategy

Use the backup script for regular backups:

```bash
# Create backup
.\backup.ps1 -BackupPath "backups" -RetentionDays "30"

# The script:
# - Backs up MongoDB database
# - Backs up uploaded files
# - Archives backup with timestamp
# - Cleans up old backups
```

## Security Configuration

### 1. Update Secrets

- Change JWT secret in environment files
- Set strong passwords for MongoDB
- Configure email credentials

### 2. File Permissions

```bash
# Set proper permissions for sensitive files
chmod 600 backend/.env
chmod 600 project-lensflare/.env.local
```

### 3. Firewall Configuration

```bash
# Configure UFW firewall
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

## Performance Optimization

### 1. Resource Limits

The Docker Compose configuration includes resource limits for each service:
- MongoDB: 512MB memory limit
- Backend: 1GB memory limit
- Frontend: 1GB memory limit
- Nginx: 128MB memory limit

### 2. Health Checks

All services include health checks for automatic restart on failure.

### 3. Multi-stage Docker Builds

Production Dockerfiles use multi-stage builds to reduce image size.

## Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure ports 80, 443, 5000, and 3000 are available
2. **Permission errors**: Check file permissions for environment files
3. **MongoDB connection**: Verify MongoDB is running and accessible
4. **SSL certificate errors**: Check certificate paths in nginx configuration

### Logs

Check logs for troubleshooting:

```bash
# Docker logs
docker-compose -f docker-compose.production.yml logs -f

# PM2 logs
pm2 logs

# Nginx logs
sudo tail -f /var/log/nginx/error.log
```

## Maintenance Tasks

### Regular Tasks

1. **Update dependencies**: Regularly update npm packages
2. **Renew SSL certificates**: Let's Encrypt certificates expire every 90 days
3. **Monitor disk space**: Check for log file growth
4. **Review security**: Regularly update passwords and secrets

### Automated Tasks

Set up cron jobs for automated maintenance:

```bash
# Add to crontab
crontab -e

# Daily backup at 2 AM
0 2 * * * /path/to/backup.ps1

# Weekly dependency update on Sundays
0 3 * * 0 cd /path/to/project && npm update

# Monthly log rotation
0 4 1 * * /usr/sbin/logrotate /etc/logrotate.conf
```

## Scaling Considerations

### Horizontal Scaling

For high-traffic scenarios:

1. **Load Balancer**: Use HAProxy or cloud load balancer
2. **Multiple Instances**: Scale backend and frontend instances
3. **Database Replication**: Set up MongoDB replica sets
4. **CDN**: Use CDN for static assets

### Vertical Scaling

For increased performance:

1. **More RAM**: Increase server memory
2. **Better CPU**: Upgrade to more powerful processors
3. **SSD Storage**: Use SSD for faster I/O
4. **Network Optimization**: Use better network connectivity

## Conclusion

This enhanced deployment guide provides a production-ready setup for the Aditya Shinde portfolio website with improved security, performance, and maintainability. Choose the deployment method that best fits your infrastructure and requirements.