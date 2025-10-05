# Environment Configuration Guide

This guide explains how to configure environment variables for different deployment scenarios.

## Development Environment

Create a `.env` file in the backend root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/aadizfx

# JWT Configuration
JWT_SECRET=your-development-jwt-secret-key
JWT_EXPIRE=7d

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=adityashinde6050@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=adityashinde6050@gmail.com

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX=100

# Backup Configuration
BACKUP_DIR=./backups
MAX_BACKUPS=7
```

## Production Environment

For production deployments, use these secure configurations:

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# MongoDB Configuration (MongoDB Atlas example)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/aadizfx

# JWT Configuration (use a strong, random secret)
JWT_SECRET=your-production-jwt-secret-key-change-this
JWT_EXPIRE=7d

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=adityashinde6050@gmail.com
EMAIL_PASS=your-production-app-password
EMAIL_FROM=adityashinde6050@gmail.com

# Frontend URL
FRONTEND_URL=https://yourdomain.com

# Rate Limiting
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX=100

# Backup Configuration
BACKUP_DIR=/var/backups/aadizfx
MAX_BACKUPS=30
```

## Staging Environment

For staging environments:

```env
# Server Configuration
PORT=5000
NODE_ENV=staging

# MongoDB Configuration
MONGODB_URI=mongodb://staging-db:27017/aadizfx

# JWT Configuration
JWT_SECRET=your-staging-jwt-secret-key
JWT_EXPIRE=7d

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=adityashinde6050@gmail.com
EMAIL_PASS=your-staging-app-password
EMAIL_FROM=adityashinde6050@gmail.com

# Frontend URL
FRONTEND_URL=https://staging.yourdomain.com

# Rate Limiting
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX=100

# Backup Configuration
BACKUP_DIR=/var/backups/aadizfx-staging
MAX_BACKUPS=7
```

## Environment Variable Descriptions

### Server Configuration
- `PORT`: The port the server will listen on (default: 5000)
- `NODE_ENV`: Environment mode (development, production, staging)

### MongoDB Configuration
- `MONGODB_URI`: Connection string for MongoDB database

### JWT Configuration
- `JWT_SECRET`: Secret key for signing JWT tokens (should be strong and random)
- `JWT_EXPIRE`: Token expiration time (e.g., 1d, 7d, 30d)

### Email Configuration
- `EMAIL_HOST`: SMTP server host
- `EMAIL_PORT`: SMTP server port
- `EMAIL_USER`: Email account username
- `EMAIL_PASS`: Email account password or app password
- `EMAIL_FROM`: Sender email address

### Frontend Configuration
- `FRONTEND_URL`: URL of the frontend application (for CORS)

### Rate Limiting
- `RATE_LIMIT_WINDOW`: Time window in milliseconds (900000 = 15 minutes)
- `RATE_LIMIT_MAX`: Maximum requests per window

### Backup Configuration
- `BACKUP_DIR`: Directory to store database backups
- `MAX_BACKUPS`: Maximum number of backups to keep

## Security Best Practices

1. **Never commit .env files** to version control
2. **Use different secrets** for each environment
3. **Rotate secrets** regularly
4. **Use strong passwords** for database and email accounts
5. **Enable two-factor authentication** for email accounts
6. **Use app passwords** instead of regular passwords for Gmail
7. **Restrict database access** to specific IP addresses
8. **Use HTTPS** in production environments

## Environment-Specific Configurations

### Development
- Use local MongoDB instance
- Enable detailed logging
- Use less strict rate limits
- Enable debugging features

### Production
- Use MongoDB Atlas or production database
- Enable performance optimizations
- Use strict rate limits
- Disable debugging features
- Enable compression
- Use secure headers

### Staging
- Mirror production configuration as closely as possible
- Use separate database from production
- Enable some debugging features for testing
- Use production-like performance settings

## Configuration Management

### Using Process Environment Variables

You can also set environment variables directly in your deployment environment:

```bash
export PORT=5000
export NODE_ENV=production
export MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/aadizfx
# ... other variables
```

### Docker Configuration

For Docker deployments, use environment variables in your docker-compose.yml:

```yaml
version: '3.8'
services:
  backend:
    build: .
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - PORT=5000
      - MONGODB_URI=mongodb://mongodb:27017/aadizfx
      # ... other variables
    env_file:
      - .env
```

### Kubernetes Configuration

For Kubernetes, use ConfigMaps and Secrets:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: aadizfx-config
data:
  NODE_ENV: "production"
  PORT: "5000"
  # ... other non-sensitive variables

---
apiVersion: v1
kind: Secret
metadata:
  name: aadizfx-secrets
type: Opaque
data:
  JWT_SECRET: <base64-encoded-secret>
  MONGODB_URI: <base64-encoded-uri>
  # ... other sensitive variables
```

## Validation

The application validates required environment variables at startup. If any critical variables are missing, the application will exit with an error message indicating which variables need to be set.

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check `MONGODB_URI` format
   - Verify database credentials
   - Ensure database server is running
   - Check network connectivity

2. **Email Not Sending**
   - Verify `EMAIL_USER` and `EMAIL_PASS`
   - Check if "Less secure app access" is disabled for Gmail
   - Use App Passwords for Gmail
   - Verify SMTP settings

3. **JWT Authentication Issues**
   - Check `JWT_SECRET` consistency across instances
   - Verify token expiration settings
   - Ensure HTTPS in production

4. **CORS Errors**
   - Verify `FRONTEND_URL` matches frontend origin
   - Check if frontend is running
   - Ensure proper protocol (http/https)

This environment configuration guide ensures your Aadiz.FX backend is properly configured for any deployment scenario.