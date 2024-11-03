# TheTechNous
Web site for The TechNous club

## Project Overview

TheTechNous is a web application designed for The TechNous club. It provides a platform for members to share and discuss various topics related to technology.

## Setup Instructions

To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/TheTechNous.git
   cd TheTechNous
   ```

2. Set up a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. Install the required dependencies:
   ```bash
   pip install -r Backend/requirements.txt
   ```

4. Set up environment variables:
   Create a `.env` file in the `Backend` directory and add the following environment variables:
   ```env
   DJANGO_SECRET_KEY=your_secret_key
   DJANGO_DEBUG=True
   DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
   ```

5. Apply database migrations:
   ```bash
   python Backend/api/manage.py migrate
   ```

6. Start the development server:
   ```bash
   python Backend/api/manage.py runserver
   ```

## Usage Examples

### Register a New User
To register a new user, send a POST request to the `/auth/register` endpoint with the following JSON payload:
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Log In
To log in, send a POST request to the `/auth/login` endpoint with the following JSON payload:
```json
{
  "username": "john_doe",
  "password": "password123",
  "otp": "123456"  # If MFA is enabled
}
```

### Create a Blog Post
To create a new blog post, send a POST request to the `/blog/post` endpoint with the following JSON payload:
```json
{
  "title": "New Blog Post",
  "content": "This is the content of the new blog post."
}
```
Include the JWT token in the Authorization header:
```http
Authorization: Bearer your_jwt_token
```

## Contribution Guidelines

We welcome contributions to TheTechNous! To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b my-feature-branch
   ```
3. Make your changes and commit them with a descriptive commit message.
4. Push your changes to your forked repository:
   ```bash
   git push origin my-feature-branch
   ```
5. Create a pull request to the main repository.

## API Documentation

For detailed API documentation, including endpoints, request/response formats, and examples, please refer to the [API Documentation](Backend/documentation/api_documentation.md).

## Deployment Instructions

For detailed deployment instructions, including environment setup, configuration, and deployment steps, please refer to the [Deployment Instructions](Backend/documentation/deployment_instructions.md).

## Troubleshooting Guide

For a troubleshooting guide to help resolve common issues, please refer to the [Troubleshooting Guide](Backend/documentation/troubleshooting_guide.md).

## Additional Documentation

For detailed steps on how to integrate the back-end with the front-end of the LMS website, please refer to the [Frontend Integration Documentation](Backend/documentation/frontend_integration.md).

## Custom Pagination

The backend uses a custom pagination class to standardize the pagination of API responses. This ensures that all paginated responses follow a consistent structure, making it easier for frontend developers to handle paginated data.

### CustomPagination Class

The `CustomPagination` class is defined in `Backend/api/api/views.py` and extends the `PageNumberPagination` class from Django REST framework. It overrides the `get_paginated_response` method to return a standardized response format.

```python
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

class CustomPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

    def get_paginated_response(self, data):
        return Response({
            'status': 'success',
            'data': data,
            'metadata': {
                'page': self.page.number,
                'page_size': self.page_size,
                'total_pages': self.page.paginator.num_pages,
                'total_items': self.page.paginator.count
            }
        })
```

### Using CustomPagination in API Views

To use the `CustomPagination` class in your API views, set it as the `pagination_class` in your viewsets or API views.

```python
from rest_framework import viewsets
from .models import YourModel
from .serializers import YourModelSerializer
from .pagination import CustomPagination

class YourModelViewSet(viewsets.ModelViewSet):
    queryset = YourModel.objects.all()
    serializer_class = YourModelSerializer
    pagination_class = CustomPagination
```

By using the `CustomPagination` class, you ensure that all paginated API responses follow a consistent structure, making it easier for frontend developers to handle paginated data.
