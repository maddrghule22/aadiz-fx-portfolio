# Error Responses

All error responses follow a consistent format:

```json
{
  "success": false,
  "message": "Error message describing what went wrong"
}
```

## Common HTTP Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | OK - Request was successful |
| 201 | Created - Resource was created successfully |
| 400 | Bad Request - Invalid request data |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Access denied |
| 404 | Not Found - Resource not found |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error - Something went wrong on our end |

## Common Error Messages

### Authentication Errors

```json
{
  "success": false,
  "message": "Not authorized, no token"
}
```

```json
{
  "success": false,
  "message": "Not authorized, user not found"
}
```

```json
{
  "success": false,
  "message": "Not authorized, token failed"
}
```

```json
{
  "success": false,
  "message": "Not authorized as admin"
}
```

### Validation Errors

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "type": "field",
      "value": "",
      "msg": "Name is required",
      "path": "name",
      "location": "body"
    }
  ]
}
```

### Resource Errors

```json
{
  "success": false,
  "message": "Project not found"
}
```

```json
{
  "success": false,
  "message": "User already exists with this email"
}
```

```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

### Server Errors

```json
{
  "success": false,
  "message": "Internal server error"
}
```

## Rate Limiting

When rate limits are exceeded, the API returns:

```json
{
  "success": false,
  "message": "Too many requests, please try again later"
}
```

The default rate limit is 100 requests per 15 minutes per IP address.