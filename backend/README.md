# Aditya Shinde Backend API

This is the backend API for the Aditya Shinde portfolio website, built with Node.js, Express, and MongoDB.

## Features

- RESTful API for portfolio data management
- User authentication and authorization
- Contact form handling with email notifications
- File upload functionality
- Rate limiting and security measures

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **TypeScript** - Typed superset of JavaScript
- **JWT** - Authentication
- **Nodemailer** - Email sending
- **Multer** - File uploading

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file based on `.env.example` and configure your environment variables

### Running the Application

- **Development mode**:
  ```bash
  npm run dev
  ```

- **Build for production**:
  ```bash
  npm run build
  ```

- **Start production server**:
  ```bash
  npm start
  ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user profile (protected)

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/featured` - Get featured projects
- `GET /api/projects/category/:category` - Get projects by category
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create a new project (admin only)
- `PUT /api/projects/:id` - Update a project (admin only)
- `DELETE /api/projects/:id` - Delete a project (admin only)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contact forms (admin only)
- `GET /api/contact/:id` - Get contact form by ID (admin only)
- `DELETE /api/contact/:id` - Delete contact form (admin only)

### Data (Testimonials, Clients, Services)
- `GET /api/data/testimonials` - Get all testimonials
- `POST /api/data/testimonials` - Create a testimonial (admin only)
- `PUT /api/data/testimonials/:id` - Update a testimonial (admin only)
- `DELETE /api/data/testimonials/:id` - Delete a testimonial (admin only)

- `GET /api/data/clients` - Get all clients
- `POST /api/data/clients` - Create a client (admin only)
- `PUT /api/data/clients/:id` - Update a client (admin only)
- `DELETE /api/data/clients/:id` - Delete a client (admin only)

- `GET /api/data/services` - Get all services
- `POST /api/data/services` - Create a service (admin only)
- `PUT /api/data/services/:id` - Update a service (admin only)
- `DELETE /api/data/services/:id` - Delete a service (admin only)

### File Upload
- `POST /api/upload/single` - Upload a single file (admin only)
- `POST /api/upload/multiple` - Upload multiple files (admin only)
- `GET /api/upload/:filename` - Serve an uploaded file

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# Server Configuration
PORT=5000
NODE_ENV=development

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
FRONTEND_URL=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX=100
```

## Security Measures

- Helmet for HTTP headers security
- CORS enabled for cross-origin requests
- Rate limiting to prevent abuse
- JWT-based authentication
- Input validation and sanitization
- MongoDB injection prevention

## License

This project is licensed under the MIT License.