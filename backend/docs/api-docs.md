# API Documentation

## Authentication

### Register User
**POST** `/api/auth/register`

Registers a new user.

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "string",
    "token": "string"
  }
}
```

### Login User
**POST** `/api/auth/login`

Authenticates a user and returns a JWT token.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "string",
    "token": "string"
  }
}
```

### Get Current User
**GET** `/api/auth/profile`

Retrieves the authenticated user's profile information.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

## Projects

### Get All Projects
**GET** `/api/projects`

Retrieves all projects.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "category": "string",
      "client": "string",
      "role": ["string"],
      "videoUrl": "string",
      "thumbnailUrl": "string",
      "tags": ["string"],
      "year": "number",
      "featured": "boolean",
      "duration": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
  ]
}
```

### Get Featured Projects
**GET** `/api/projects/featured`

Retrieves all featured projects.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "category": "string",
      "client": "string",
      "role": ["string"],
      "videoUrl": "string",
      "thumbnailUrl": "string",
      "tags": ["string"],
      "year": "number",
      "featured": "boolean",
      "duration": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
  ]
}
```

### Get Projects by Category
**GET** `/api/projects/category/:category`

Retrieves projects by category.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "category": "string",
      "client": "string",
      "role": ["string"],
      "videoUrl": "string",
      "thumbnailUrl": "string",
      "tags": ["string"],
      "year": "number",
      "featured": "boolean",
      "duration": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
  ]
}
```

### Get Project by ID
**GET** `/api/projects/:id`

Retrieves a specific project by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "title": "string",
    "description": "string",
    "category": "string",
    "client": "string",
    "role": ["string"],
    "videoUrl": "string",
    "thumbnailUrl": "string",
    "tags": ["string"],
    "year": "number",
    "featured": "boolean",
    "duration": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

### Create Project
**POST** `/api/projects`

Creates a new project. (Admin only)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "category": "string",
  "client": "string",
  "role": ["string"],
  "videoUrl": "string",
  "thumbnailUrl": "string",
  "tags": ["string"],
  "year": "number",
  "featured": "boolean",
  "duration": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Project created successfully",
  "data": {
    "id": "string",
    "title": "string",
    "description": "string",
    "category": "string",
    "client": "string",
    "role": ["string"],
    "videoUrl": "string",
    "thumbnailUrl": "string",
    "tags": ["string"],
    "year": "number",
    "featured": "boolean",
    "duration": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

### Update Project
**PUT** `/api/projects/:id`

Updates an existing project. (Admin only)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "string",
  "description": "string",
  "category": "string",
  "client": "string",
  "role": ["string"],
  "videoUrl": "string",
  "thumbnailUrl": "string",
  "tags": ["string"],
  "year": "number",
  "featured": "boolean",
  "duration": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Project updated successfully",
  "data": {
    "id": "string",
    "title": "string",
    "description": "string",
    "category": "string",
    "client": "string",
    "role": ["string"],
    "videoUrl": "string",
    "thumbnailUrl": "string",
    "tags": ["string"],
    "year": "number",
    "featured": "boolean",
    "duration": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

### Delete Project
**DELETE** `/api/projects/:id`

Deletes a project. (Admin only)

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Project deleted successfully"
}
```

## Contact Forms

### Submit Contact Form
**POST** `/api/contact`

Submits a contact form.

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "company": "string",
  "projectType": "string",
  "budget": "string",
  "timeline": "string",
  "message": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Contact form submitted successfully",
  "data": {
    "id": "string",
    "name": "string",
    "email": "string",
    "company": "string",
    "projectType": "string",
    "budget": "string",
    "timeline": "string",
    "message": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

### Get All Contact Forms
**GET** `/api/contact`

Retrieves all contact forms. (Admin only)

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "name": "string",
      "email": "string",
      "company": "string",
      "projectType": "string",
      "budget": "string",
      "timeline": "string",
      "message": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
  ]
}
```

### Get Contact Form by ID
**GET** `/api/contact/:id`

Retrieves a specific contact form by ID. (Admin only)

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "email": "string",
    "company": "string",
    "projectType": "string",
    "budget": "string",
    "timeline": "string",
    "message": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

### Delete Contact Form
**DELETE** `/api/contact/:id`

Deletes a contact form. (Admin only)

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Contact form deleted successfully"
}
```

## Testimonials

### Get All Testimonials
**GET** `/api/data/testimonials`

Retrieves all testimonials.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "name": "string",
      "company": "string",
      "role": "string",
      "content": "string",
      "avatar": "string",
      "rating": "number",
      "createdAt": "date",
      "updatedAt": "date"
    }
  ]
}
```

### Create Testimonial
**POST** `/api/data/testimonials`

Creates a new testimonial. (Admin only)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "id": "string",
  "name": "string",
  "company": "string",
  "role": "string",
  "content": "string",
  "avatar": "string",
  "rating": "number"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Testimonial created successfully",
  "data": {
    "id": "string",
    "name": "string",
    "company": "string",
    "role": "string",
    "content": "string",
    "avatar": "string",
    "rating": "number",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

### Update Testimonial
**PUT** `/api/data/testimonials/:id`

Updates an existing testimonial. (Admin only)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "string",
  "company": "string",
  "role": "string",
  "content": "string",
  "avatar": "string",
  "rating": "number"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Testimonial updated successfully",
  "data": {
    "id": "string",
    "name": "string",
    "company": "string",
    "role": "string",
    "content": "string",
    "avatar": "string",
    "rating": "number",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

### Delete Testimonial
**DELETE** `/api/data/testimonials/:id`

Deletes a testimonial. (Admin only)

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Testimonial deleted successfully"
}
```

## Clients

### Get All Clients
**GET** `/api/data/clients`

Retrieves all clients.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "name": "string",
      "logo": "string",
      "website": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
  ]
}
```

### Create Client
**POST** `/api/data/clients`

Creates a new client. (Admin only)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "id": "string",
  "name": "string",
  "logo": "string",
  "website": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Client created successfully",
  "data": {
    "id": "string",
    "name": "string",
    "logo": "string",
    "website": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

### Update Client
**PUT** `/api/data/clients/:id`

Updates an existing client. (Admin only)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "string",
  "logo": "string",
  "website": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Client updated successfully",
  "data": {
    "id": "string",
    "name": "string",
    "logo": "string",
    "website": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

### Delete Client
**DELETE** `/api/data/clients/:id`

Deletes a client. (Admin only)

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Client deleted successfully"
}
```

## Services

### Get All Services
**GET** `/api/data/services`

Retrieves all services.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "icon": "string",
      "features": ["string"],
      "tier": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
  ]
}
```

### Create Service
**POST** `/api/data/services`

Creates a new service. (Admin only)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "icon": "string",
  "features": ["string"],
  "tier": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Service created successfully",
  "data": {
    "id": "string",
    "title": "string",
    "description": "string",
    "icon": "string",
    "features": ["string"],
    "tier": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

### Update Service
**PUT** `/api/data/services/:id`

Updates an existing service. (Admin only)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "string",
  "description": "string",
  "icon": "string",
  "features": ["string"],
  "tier": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Service updated successfully",
  "data": {
    "id": "string",
    "title": "string",
    "description": "string",
    "icon": "string",
    "features": ["string"],
    "tier": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

### Delete Service
**DELETE** `/api/data/services/:id`

Deletes a service. (Admin only)

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Service deleted successfully"
}
```

## File Upload

### Upload Single File
**POST** `/api/upload/single`

Uploads a single file. (Admin only)

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**
```
file: <file>
```

**Response:**
```json
{
  "success": true,
  "message": "File uploaded successfully",
  "data": {
    "filename": "string",
    "originalname": "string",
    "mimetype": "string",
    "size": "number",
    "path": "string"
  }
}
```

### Upload Multiple Files
**POST** `/api/upload/multiple`

Uploads multiple files. (Admin only)

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**
```
images: <file1>, <file2>, ...
```

**Response:**
```json
{
  "success": true,
  "message": "Files uploaded successfully",
  "data": [
    {
      "filename": "string",
      "originalname": "string",
      "mimetype": "string",
      "size": "number",
      "path": "string"
    }
  ]
}
```

### Serve File
**GET** `/api/upload/:filename`

Serves an uploaded file.

**Response:**
```
File content
```