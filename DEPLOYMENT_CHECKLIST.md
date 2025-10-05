# Deployment Checklist

This checklist outlines the remaining steps to make the Aditya Shinde portfolio website publicly available.

## Prerequisites

- [ ] Domain name registered and configured
- [ ] Server/VPS with at least 2GB RAM and 20GB storage
- [ ] MongoDB database (local or cloud)
- [ ] SSL certificate (Let's Encrypt or similar)
- [ ] DNS records configured

## Backend Setup

- [ ] Install Node.js v18+ on server
- [ ] Install MongoDB v5+ on server or configure MongoDB Atlas
- [ ] Clone repository to server
- [ ] Install backend dependencies: `cd backend && npm install`
- [ ] Configure `.env` file with production values
- [ ] Build backend: `npm run build`
- [ ] Install PM2 globally: `npm install -g pm2`
- [ ] Start backend with PM2: `pm2 start ecosystem.config.js --env production`
- [ ] Set PM2 to start on boot: `pm2 startup` and `pm2 save`
- [ ] Seed database with initial data: `npm run import`

## Frontend Setup

- [ ] Install Node.js v18+ on server (if hosting on same server)
- [ ] Clone repository to server (if separate from backend)
- [ ] Install frontend dependencies: `cd project-lensflare && npm install`
- [ ] Configure `.env.local` with production URLs
- [ ] Build frontend: `npm run build`
- [ ] Start frontend: `npm start` or use PM2

## Nginx Configuration

- [ ] Install Nginx on server
- [ ] Copy [nginx.conf](file:///c:/Users/darsh/OneDrive/Desktop/aadiz.fx/nginx.conf) to `/etc/nginx/sites-available/aadizfx`
- [ ] Enable site: `ln -s /etc/nginx/sites-available/aadizfx /etc/nginx/sites-enabled/`
- [ ] Test configuration: `nginx -t`
- [ ] Restart Nginx: `systemctl restart nginx`

## SSL Certificate

- [ ] Install Certbot: `sudo apt-get install certbot python3-certbot-nginx`
- [ ] Obtain SSL certificate: `sudo certbot --nginx -d yourdomain.com`
- [ ] Test auto-renewal: `sudo certbot renew --dry-run`

## Security Configuration

- [ ] Update JWT secret in backend `.env` file
- [ ] Configure email credentials in backend `.env` file
- [ ] Set proper file permissions for sensitive files
- [ ] Configure firewall rules (ufw or similar)
- [ ] Set up SSH key authentication (disable password login)

## Monitoring and Maintenance

- [ ] Set up log rotation for application logs
- [ ] Configure backup script to run daily via cron
- [ ] Set up health check monitoring
- [ ] Configure error tracking (Sentry or similar)
- [ ] Set up uptime monitoring

## Testing

- [ ] Test website loading speed
- [ ] Test all forms and API endpoints
- [ ] Test mobile responsiveness
- [ ] Test cross-browser compatibility
- [ ] Verify SEO meta tags
- [ ] Test social media sharing
- [ ] Verify SSL certificate installation
- [ ] Test backup and restore procedures

## Go Live

- [ ] Update DNS records to point to server IP
- [ ] Monitor server resources and application logs
- [ ] Test contact form submission
- [ ] Verify admin panel functionality
- [ ] Announce launch on social media

## Post-Launch

- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google Analytics
- [ ] Configure automated security updates
- [ ] Document deployment process
- [ ] Train team on content management