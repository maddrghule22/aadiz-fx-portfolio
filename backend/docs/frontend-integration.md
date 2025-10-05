# Frontend Integration Guide

This guide explains how to integrate the Aditya Shinde frontend with the backend API.

## API Base URL

All API endpoints are relative to the base URL:
```
http://localhost:5000/api
```

For production, this would be:
```
https://your-domain.com/api
```

## Fetching Projects

To fetch all projects:
```javascript
const fetchProjects = async () => {
  try {
    const response = await fetch('/api/projects');
    const data = await response.json();
    
    if (data.success) {
      return data.data; // Array of projects
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};
```

To fetch featured projects:
```javascript
const fetchFeaturedProjects = async () => {
  try {
    const response = await fetch('/api/projects/featured');
    const data = await response.json();
    
    if (data.success) {
      return data.data; // Array of featured projects
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    return [];
  }
};
```

## Submitting Contact Form

To submit the contact form:
```javascript
const submitContactForm = async (formData) => {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    const data = await response.json();
    
    if (data.success) {
      return { success: true, message: data.message };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return { success: false, message: 'Network error' };
  }
};
```

## Authentication

To register a new user:
```javascript
const registerUser = async (userData) => {
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Store token in localStorage or state management
      localStorage.setItem('token', data.data.token);
      return { success: true, user: data.data };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.error('Error registering user:', error);
    return { success: false, message: 'Network error' };
  }
};
```

To login a user:
```javascript
const loginUser = async (credentials) => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Store token in localStorage or state management
      localStorage.setItem('token', data.data.token);
      return { success: true, user: data.data };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.error('Error logging in user:', error);
    return { success: false, message: 'Network error' };
  }
};
```

To fetch current user profile:
```javascript
const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem('token');
    
    const response = await fetch('/api/auth/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    const data = await response.json();
    
    if (data.success) {
      return { success: true, user: data.data };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return { success: false, message: 'Network error' };
  }
};
```

## Admin Operations

For admin operations, you'll need to include the authorization token in the headers:

```javascript
const createProject = async (projectData) => {
  try {
    const token = localStorage.getItem('token');
    
    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(projectData),
    });
    
    const data = await response.json();
    
    if (data.success) {
      return { success: true, project: data.data };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.error('Error creating project:', error);
    return { success: false, message: 'Network error' };
  }
};
```

## Error Handling

Always handle errors appropriately in your frontend:

```javascript
const handleApiError = (error) => {
  if (error.message === 'Not authorized, no token' || 
      error.message === 'Not authorized, token failed') {
    // Redirect to login page
    localStorage.removeItem('token');
    window.location.href = '/login';
  } else {
    // Show error message to user
    alert(error.message);
  }
};
```

## File Uploads

To upload files (admin only):
```javascript
const uploadFile = async (file) => {
  try {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch('/api/upload/single', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });
    
    const data = await response.json();
    
    if (data.success) {
      return { success: true, file: data.data };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.error('Error uploading file:', error);
    return { success: false, message: 'Network error' };
  }
};
```

## Best Practices

1. Always validate data before sending to the API
2. Handle loading states in your UI
3. Implement proper error handling and user feedback
4. Store authentication tokens securely
5. Use environment variables for API base URLs
6. Implement proper loading and error states in your UI components