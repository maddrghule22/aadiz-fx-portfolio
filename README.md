# Aditya Shinde Portfolio Website

A professional portfolio website for videographers and VFX artists, featuring a stunning cinematic design with a Next.js frontend and Node.js backend.

## 🎬 Features

### Frontend (Next.js 15)
- Modern, responsive design with cinematic aesthetics
- Interactive portfolio gallery with filtering and sorting
- Client testimonials carousel
- Services showcase with pricing tiers
- Comprehensive contact form with project details
- SEO optimized with proper meta tags
- Performance optimized with Next.js Image component
- Built with TypeScript and Tailwind CSS

### Backend (Node.js + Express)
- RESTful API for managing portfolio content
- MongoDB database integration
- Authentication system with JWT
- File upload functionality
- Email service for contact form submissions
- Rate limiting and security features
- Data validation and sanitization

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB 5+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd aadiz.fx
   ```

2. **Install dependencies for both frontend and backend**
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   cd ..
   
   # Install frontend dependencies
   cd project-lensflare
   npm install
   cd ..
   ```

3. **Configure environment variables**
   - Create `backend/.env` with your configuration
   - Create `project-lensflare/.env.local` with your configuration

4. **Start the development servers**
   ```bash
   # Start backend (from backend directory)
   npm run dev
   
   # Start frontend (from project-lensflare directory)
   npm run dev
   ```

5. **Open your browser**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:5000](http://localhost:5000)

## 📁 Project Structure

```
aadiz.fx/
├── backend/               # Node.js backend API
│   ├── src/               # Source code
│   │   ├── controllers/   # Request handlers
│   │   ├── models/        # Database models
│   │   ├── routes/        # API endpoints
│   │   └── ...
│   ├── uploads/           # Uploaded files
│   └── ...
├── project-lensflare/     # Next.js frontend
│   ├── src/
│   │   ├── app/           # Pages and layouts
│   │   ├── components/    # React components
│   │   └── ...
│   └── ...
└── ...
```

## 🌐 Deployment

### Production Deployment

Follow the steps in [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) to deploy the website to production.

### Key Deployment Steps

1. **Configure environment variables** for production
2. **Set up MongoDB** (local or cloud)
3. **Build both frontend and backend**
4. **Deploy with PM2** for process management
5. **Set up Nginx** as a reverse proxy
6. **Configure SSL** with Let's Encrypt
7. **Set up monitoring and backups**

## 🛠️ Development

### Backend API Endpoints

- `GET /api/projects` - Get all projects
- `GET /api/projects/featured` - Get featured projects
- `GET /api/data/testimonials` - Get testimonials
- `GET /api/data/clients` - Get clients
- `GET /api/data/services` - Get services
- `POST /api/contact` - Submit contact form

### Frontend Pages

- `/` - Homepage
- `/work` - Portfolio gallery
- `/work/[id]` - Project details
- `/services` - Services showcase
- `/about` - About page
- `/contact` - Contact form

## 📞 Support

For questions or support:
- Email: adityashinde6050@gmail.com
- Phone: +91 81809 99435

## 📄 License

This project is created for Aditya Shinde. All rights reserved.