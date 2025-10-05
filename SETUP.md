# Complete Setup Guide: Aditya Shinde Portfolio Website

This guide provides step-by-step instructions for setting up a fully optimized portfolio website with database integration.

## Project Structure

```
aadiz.fx/
├── backend/               # Node.js API server
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   ├── models/        # Database models
│   │   ├── routes/        # API endpoints
│   │   └── ...
│   ├── uploads/           # Uploaded media files
│   └── ...
├── project-lensflare/     # Next.js frontend
│   ├── src/
│   │   ├── app/           # Pages and layouts
│   │   ├── components/    # React components
│   │   └── ...
│   └── ...
└── ...
```

## Prerequisites

1. **Node.js** (v18 or higher)
2. **MongoDB** (v5.0 or higher)
3. **Git**
4. **NPM** or **Yarn**

## Database Setup

### 1. Install MongoDB

For local development, install MongoDB Community Edition:

**Windows:**
1. Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
2. Run the installer with default settings
3. Start MongoDB service

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Ubuntu/Debian:**
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

### 2. MongoDB Atlas (Cloud Option)

For production, consider using MongoDB Atlas:

1. Create an account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Configure network access and database users
4. Get your connection string

## Backend Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/aadizfx
# For MongoDB Atlas, use:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/aadizfx

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
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
```

### 3. Start Backend Server

```bash
# Development mode with hot-reloading
npm run dev

# Production mode
npm run build
npm start
```

### 4. Seed Initial Data

```bash
# Import sample data
npm run import

# Delete all data
npm run delete
```

## Frontend Setup

### 1. Install Dependencies

```bash
cd project-lensflare
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the `project-lensflare` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Start Development Server

```bash
npm run dev
```

The website will be available at `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
npm start
```

## Database Models

### Projects
```javascript
{
  id: String,
  title: String,
  description: String,
  category: String, // commercial, music-video, vfx-breakdown, short-film, documentary
  client: String,
  role: [String],
  videoUrl: String,
  thumbnailUrl: String,
  images: [String],
  beforeAfter: {
    before: String,
    after: String
  },
  tags: [String],
  year: Number,
  featured: Boolean,
  duration: String
}
```

### Testimonials
```javascript
{
  id: String,
  name: String,
  company: String,
  role: String,
  content: String,
  avatar: String,
  rating: Number
}
```

### Clients
```javascript
{
  id: String,
  name: String,
  logo: String,
  website: String
}
```

### Services
```javascript
{
  id: String,
  title: String,
  description: String,
  icon: String,
  features: [String],
  tier: String // pre-production, production, post-production, vfx
}
```

### Users (Admin)
```javascript
{
  name: String,
  email: String,
  password: String,
  role: String // admin, user
}
```

### Contact Forms
```javascript
{
  name: String,
  email: String,
  company: String,
  projectType: String,
  budget: String,
  timeline: String,
  message: String
}
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/featured` - Get featured projects
- `GET /api/projects/category/:category` - Get projects by category
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create project (admin)
- `PUT /api/projects/:id` - Update project (admin)
- `DELETE /api/projects/:id` - Delete project (admin)

### Contact Forms
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all forms (admin)
- `GET /api/contact/:id` - Get form by ID (admin)
- `DELETE /api/contact/:id` - Delete form (admin)

### Data Management
- `GET /api/data/testimonials` - Get testimonials
- `POST /api/data/testimonials` - Create testimonial (admin)
- `PUT /api/data/testimonials/:id` - Update testimonial (admin)
- `DELETE /api/data/testimonials/:id` - Delete testimonial (admin)

- `GET /api/data/clients` - Get clients
- `POST /api/data/clients` - Create client (admin)
- `PUT /api/data/clients/:id` - Update client (admin)
- `DELETE /api/data/clients/:id` - Delete client (admin)

- `GET /api/data/services` - Get services
- `POST /api/data/services` - Create service (admin)
- `PUT /api/data/services/:id` - Update service (admin)
- `DELETE /api/data/services/:id` - Delete service (admin)

### File Upload
- `POST /api/upload/single` - Upload single file (admin)
- `POST /api/upload/multiple` - Upload multiple files (admin)
- `GET /api/upload/:filename` - Serve uploaded file

## Optimization Techniques

### Backend Optimizations

1. **Rate Limiting**
   - Prevents abuse with 100 requests per 15 minutes per IP

2. **Caching**
   - Database query caching for frequently accessed data
   - API response caching for static content

3. **Security**
   - Helmet for HTTP security headers
   - CORS configuration
   - Input validation and sanitization
   - JWT-based authentication

4. **Database Indexing**
   - Indexed fields for faster queries
   - Proper schema design for efficient data retrieval

### Frontend Optimizations

1. **Performance**
   - Image optimization with Next.js Image component
   - Code splitting for faster initial loads
   - Lazy loading for components below the fold
   - Efficient React component rendering

2. **SEO**
   - Dynamic metadata generation
   - Semantic HTML structure
   - Structured data markup
   - Mobile-responsive design

3. **User Experience**
   - Smooth animations and transitions
   - Loading states and skeleton screens
   - Error handling and fallbacks
   - Accessible interface components

## Deployment

### Backend Deployment

1. **Using PM2 (Recommended)**
   ```bash
   # Install PM2 globally
   npm install -g pm2
   
   # Build the application
   npm run build
   
   # Start with PM2
   pm2 start dist/server.js --name aadizfx-backend
   
   # Set to start on boot
   pm2 startup
   pm2 save
   ```

2. **Using Docker**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build
   EXPOSE 5000
   CMD ["node", "dist/server.js"]
   ```

### Frontend Deployment

1. **Vercel (Recommended)**
   - Connect your GitHub repository
   - Set environment variables
   - Deploy with one click

2. **Manual Deployment**
   ```bash
   # Build for production
   npm run build
   
   # Start server
   npm start
   ```

## Monitoring and Maintenance

### Health Checks
```bash
# Backend health check
curl http://localhost:5000/health

# API endpoint test
curl http://localhost:5000/api/projects
```

### Logging
- Backend: Morgan for HTTP request logging
- Frontend: Console logging for debugging
- Error tracking with Sentry or similar services

### Backups
1. **Database Backup**
   ```bash
   mongodump --uri="mongodb://localhost:27017/aadizfx" --out="/backups/mongodb_$(date +%Y%m%d)"
   ```

2. **File Backup**
   - Regular backups of the uploads directory
   - Automated backup scripts with cron jobs

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check if MongoDB service is running
   - Verify connection string in `.env`
   - Ensure firewall allows connections on port 27017

2. **Port Already in Use**
   ```bash
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   
   # macOS/Linux
   lsof -i :5000
   kill -9 <PID>
   ```

3. **CORS Errors**
   - Check `FRONTEND_URL` in backend `.env`
   - Ensure frontend and backend URLs match

4. **Email Not Sending**
   - Verify email credentials
   - Check if "Less secure app access" is enabled for Gmail
   - Use App Passwords for Gmail

### Performance Tuning

1. **Database Indexing**
   ```javascript
   // Add indexes to frequently queried fields
   db.projects.createIndex({ "featured": 1 })
   db.projects.createIndex({ "category": 1 })
   db.projects.createIndex({ "year": -1 })
   ```

2. **API Response Caching**
   - Implement Redis for caching API responses
   - Cache static content for better performance

3. **Image Optimization**
   - Use WebP format for images
   - Implement responsive images with srcset
   - Compress images before uploading

## Security Best Practices

1. **Environment Variables**
   - Never commit `.env` files to version control
   - Use different values for development and production

2. **Authentication**
   - Use strong passwords for admin accounts
   - Implement two-factor authentication
   - Regularly rotate JWT secrets

3. **Input Validation**
   - Validate all user inputs
   - Sanitize data before storing in database
   - Use rate limiting to prevent brute force attacks

4. **File Uploads**
   - Validate file types and sizes
   - Store uploaded files outside public directory
   - Implement virus scanning for uploaded files

This setup guide provides everything needed to run a fully optimized portfolio website with database integration. Follow the steps in order for best results.