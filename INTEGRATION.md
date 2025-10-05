# Integration Guide: Connecting Frontend and Backend

This guide explains how to connect the existing Aditya Shinde Next.js frontend with the newly created backend.

## Project Structure

```
aadiz.fx/
├── project-lensflare/     # Existing Next.js frontend
│   ├── src/
│   │   ├── app/           # Pages and layouts
│   │   ├── components/    # React components
│   │   ├── data/          # Static data (to be replaced with API calls)
│   │   └── ...
│   └── ...
└── backend/               # New Node.js backend
    ├── src/
    │   ├── controllers/   # Request handlers
    │   ├── models/        # Database models
    │   ├── routes/        # API endpoints
    │   └── ...
    ├── uploads/           # Uploaded files
    └── ...
```

## Integration Steps

### 1. Update Frontend API Calls

Replace static data imports with API calls to the backend.

#### Before (static data):
```javascript
// In src/data/index.ts
import { projects } from '@/data/projects';
```

#### After (API calls):
```javascript
// Create src/lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const fetchProjects = async () => {
  const response = await fetch(`${API_BASE_URL}/projects`);
  const data = await response.json();
  return data.data;
};

export const fetchFeaturedProjects = async () => {
  const response = await fetch(`${API_BASE_URL}/projects/featured`);
  const data = await response.json();
  return data.data;
};

export const fetchTestimonials = async () => {
  const response = await fetch(`${API_BASE_URL}/data/testimonials`);
  const data = await response.json();
  return data.data;
};

export const fetchClients = async () => {
  const response = await fetch(`${API_BASE_URL}/data/clients`);
  const data = await response.json();
  return data.data;
};

export const fetchServices = async () => {
  const response = await fetch(`${API_BASE_URL}/data/services`);
  const data = await response.json();
  return data.data;
};
```

### 2. Update Environment Variables

Create `.env.local` in the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Replace Static Data with API Calls

#### Update src/app/page.tsx:
```javascript
'use client'

import { useState, useEffect } from 'react';
import HeroSection from '@/components/HeroSection'
import FeaturedWork from '@/components/FeaturedWork'
import ServicesSnippet from '@/components/ServicesSnippet'
import TestimonialsSection from '@/components/TestimonialsSection'
import ClientsSection from '@/components/ClientsSection'
import ContactCTA from '@/components/ContactCTA'
import { fetchFeaturedProjects, fetchServices, fetchTestimonials, fetchClients } from '@/lib/api'

export default function HomePage() {
  const [featuredProjects, setFeaturedProjects] = useState([])
  const [services, setServices] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsData, servicesData, testimonialsData, clientsData] = await Promise.all([
          fetchFeaturedProjects(),
          fetchServices(),
          fetchTestimonials(),
          fetchClients()
        ])
        
        setFeaturedProjects(projectsData)
        setServices(servicesData)
        setTestimonials(testimonialsData)
        setClients(clientsData)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <HeroSection />
      <FeaturedWork projects={featuredProjects} />
      <ServicesSnippet services={services} />
      <TestimonialsSection testimonials={testimonials} />
      <ClientsSection clients={clients} />
      <ContactCTA />
    </>
  )
}
```

### 4. Update Contact Form Submission

Update src/app/contact/page.tsx to submit to the backend:

```javascript
// In the handleSubmit function
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsSubmitting(true)
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    
    const data = await response.json()
    
    if (data.success) {
      setIsSubmitted(true)
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          name: '',
          email: '',
          company: '',
          projectType: '',
          budget: '',
          timeline: '',
          message: ''
        })
      }, 3000)
    } else {
      // Handle error
      console.error('Submission failed:', data.message)
    }
  } catch (error) {
    console.error('Network error:', error)
  } finally {
    setIsSubmitting(false)
  }
}
```

### 5. Update Components to Accept Dynamic Data

#### Update src/components/FeaturedWork.tsx:
```javascript
// Add props interface
interface FeaturedWorkProps {
  projects: any[]; // Replace with proper type
}

// Update component signature
export default function FeaturedWork({ projects }: FeaturedWorkProps) {
  // Use the projects prop instead of importing static data
  return (
    // ... existing JSX using the projects prop
  )
}
```

Apply similar updates to other components that use static data.

### 6. Start Both Servers

#### Backend:
```bash
cd backend
npm run dev
```

#### Frontend:
```bash
cd project-lensflare
npm run dev
```

## Data Migration

To migrate existing static data to the database:

### 1. Seed the Database
```bash
cd backend
npm run import
```

### 2. Verify Data
Visit `http://localhost:5000/api/projects` to verify projects are loaded.

## Admin Panel Access

To access admin features:

### 1. Register an Admin User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "securepassword"
  }'
```

### 2. Login to Get Token
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "securepassword"
  }'
```

### 3. Use Token for Admin Operations
Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## CORS Configuration

The backend is configured to allow CORS from the frontend origin. If you need to adjust this:

Update `src/server.ts`:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

## File Upload Integration

To use the file upload functionality in the admin panel:

### 1. Upload a File
```bash
curl -X POST http://localhost:5000/api/upload/single \
  -H "Authorization: Bearer <your-jwt-token>" \
  -F "file=@/path/to/your/image.jpg"
```

### 2. Use the Returned Path
The API returns a path that can be used in your project data:
```json
{
  "success": true,
  "message": "File uploaded successfully",
  "data": {
    "filename": "unique-id.jpg",
    "path": "/uploads/unique-id.jpg"
  }
}
```

## Testing the Integration

### 1. Health Check
```bash
curl http://localhost:5000/health
```

### 2. Fetch Projects
```bash
curl http://localhost:5000/api/projects
```

### 3. Submit Contact Form
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "projectType": "Commercial",
    "budget": "$5,000 - $10,000",
    "timeline": "Within 1 month",
    "message": "Test message"
  }'
```

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure the frontend URL matches the CORS configuration
2. **Network Errors**: Check that both servers are running
3. **404 Errors**: Verify API endpoints in the backend documentation
4. **Authentication Errors**: Ensure you're including the JWT token for admin operations

### Debugging Steps

1. Check browser console for network errors
2. Check backend terminal for error messages
3. Verify environment variables are set correctly
4. Ensure MongoDB is running and accessible

This integration guide should help you successfully connect the Aditya Shinde frontend with the new backend, enabling dynamic content management and admin capabilities.