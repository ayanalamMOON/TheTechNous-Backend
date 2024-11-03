# API Documentation

This document provides detailed information about the API endpoints, request/response formats, and examples for TheTechNous project.

## Authentication

### Register a New User

**Endpoint:** `POST /auth/register`

**Request:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "mfa_secret": "your_mfa_secret"
}
```

### Log In

**Endpoint:** `POST /auth/login`

**Request:**
```json
{
  "username": "john_doe",
  "password": "password123",
  "otp": "123456"  # If MFA is enabled
}
```

**Response:**
```json
{
  "access_token": "your_jwt_token"
}
```

### Get User Profile

**Endpoint:** `GET /auth/profile`

**Headers:**
```http
Authorization: Bearer your_jwt_token
```

**Response:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "is_admin": false
}
```

## Blog Post Management

### Get Blog Posts

**Endpoint:** `GET /blog/post`

**Response:**
```json
[
  {
    "id": 1,
    "title": "New Blog Post",
    "content": "This is the content of the new blog post.",
    "author": "john_doe",
    "url": "/blog/post/1"
  }
]
```

### Create Blog Post

**Endpoint:** `POST /blog/post`

**Headers:**
```http
Authorization: Bearer your_jwt_token
```

**Request:**
```json
{
  "title": "New Blog Post",
  "content": "This is the content of the new blog post."
}
```

**Response:**
```json
{
  "msg": "Post Created Successfully",
  "id": 1
}
```

### Update Blog Post

**Endpoint:** `PUT /blog/post/{post_id}`

**Headers:**
```http
Authorization: Bearer your_jwt_token
```

**Request:**
```json
{
  "title": "Updated Blog Post",
  "content": "This is the updated content of the blog post."
}
```

**Response:**
```json
{
  "msg": "Post Updated Successfully"
}
```

### Delete Blog Post

**Endpoint:** `DELETE /blog/post/{post_id}`

**Headers:**
```http
Authorization: Bearer your_jwt_token
```

**Response:**
```json
{
  "msg": "Post Deleted Successfully"
}
```

### Search Blog Posts

**Endpoint:** `GET /blog/search?q={query}`

**Response:**
```json
[
  {
    "id": 1,
    "title": "New Blog Post",
    "content": "This is the content of the new blog post.",
    "author": "john_doe",
    "url": "/blog/post/1"
  }
]
```

## Admin Functionalities

### Get Users

**Endpoint:** `GET /admin/users`

**Headers:**
```http
Authorization: Bearer your_jwt_token
```

**Response:**
```json
[
  {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "is_admin": false
  },
  {
    "id": 2,
    "username": "jane_doe",
    "email": "jane@example.com",
    "is_admin": true
  }
]
```

### Update User

**Endpoint:** `PUT /admin/users/{user_id}`

**Headers:**
```http
Authorization: Bearer your_jwt_token
```

**Request:**
```json
{
  "is_admin": true
}
```

**Response:**
```json
{
  "msg": "User updated successfully"
}
```

### Delete User

**Endpoint:** `DELETE /admin/users/{user_id}`

**Headers:**
```http
Authorization: Bearer your_jwt_token
```

**Response:**
```json
{
  "msg": "User deleted successfully"
}
```

## Error Handling

### HTTP Exceptions

**Description:**
Handles various HTTP exceptions and returns appropriate error messages and status codes.

**Example:**
```json
{
  "error": "Resource not found"
}
```

### Database Errors

**Description:**
Handles database errors and returns appropriate error messages and status codes.

**Example:**
```json
{
  "error": "A database error occurred"
}
```

### Validation Errors

**Description:**
Handles validation errors and returns appropriate error messages and status codes.

**Example:**
```json
{
  "error": "A validation error occurred"
}
```

### Authentication Errors

**Description:**
Handles authentication errors and returns appropriate error messages and status codes.

**Example:**
```json
{
  "error": "An authentication error occurred"
}
```

## Activity Logging

### Log User Activity

**Description:**
Logs user activities in the application.

**Usage:**
1. Import the `log_user_activity` function.
2. Call the function with the user ID and activity description.

**Example:**
```python
from app.activity_logger import log_user_activity

log_user_activity(user_id=1, activity="User logged in")
```
