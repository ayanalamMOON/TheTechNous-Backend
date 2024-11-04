# Deployment Instructions

This document provides detailed deployment instructions for TheTechNous project, including environment setup, configuration, and deployment steps.

## Prerequisites

Before deploying the project, ensure you have the following prerequisites:

1. **Python 3.8 or higher**: Install Python from the official website: [Python Downloads](https://www.python.org/downloads/)
2. **MongoDB**: Install MongoDB from the official website: [MongoDB Downloads](https://www.mongodb.com/try/download/community)
3. **Redis**: Install Redis from the official website: [Redis Downloads](https://redis.io/download)
4. **Celery**: Install Celery by adding it to your `requirements.txt` file.

## Environment Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/TheTechNous.git
   cd TheTechNous
   ```

2. **Set up a virtual environment and activate it**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. **Install the required dependencies**:
   ```bash
   pip install -r Backend/requirements.txt
   ```

4. **Set up environment variables**:
   Create a `.env` file in the `Backend` directory and add the following environment variables:
   ```env
   DJANGO_SECRET_KEY=your_secret_key
   DJANGO_DEBUG=False
   DJANGO_ALLOWED_HOSTS=your_domain.com
   DJANGO_DB_NAME=your_db_name
   DJANGO_DB_USER=your_db_user
   DJANGO_DB_PASSWORD=your_db_password
   DJANGO_DB_HOST=your_db_host
   DJANGO_DB_PORT=your_db_port
   CELERY_BROKER_URL=redis://localhost:6379/0
   CELERY_RESULT_BACKEND=redis://localhost:6379/0
   ```

## Database Setup

1. **Create the MongoDB database**:
   ```bash
   mongo
   use your_db_name
   db.createUser({
     user: "your_db_user",
     pwd: "your_db_password",
     roles: [{ role: "readWrite", db: "your_db_name" }]
   })
   ```

2. **Apply database migrations**:
   ```bash
   python Backend/api/manage.py migrate
   ```

## Static Files

1. **Collect static files**:
   ```bash
   python Backend/api/manage.py collectstatic
   ```

## Running the Application

1. **Start the Django development server**:
   ```bash
   python Backend/api/manage.py runserver
   ```

2. **Start the Celery worker**:
   ```bash
   celery -A api worker --loglevel=info
   ```

3. **Start the Celery beat scheduler**:
   ```bash
   celery -A api beat --loglevel=info
   ```

## Deployment to Production

1. **Set up a production server**: Use a cloud provider like AWS, DigitalOcean, or Heroku to set up a production server.

2. **Install and configure a web server**: Use a web server like Nginx or Apache to serve your Django application.

3. **Set up Gunicorn**: Install Gunicorn and configure it to serve your Django application.
   ```bash
   pip install gunicorn
   gunicorn Backend.api.wsgi:application --bind 0.0.0.0:8000
   ```

4. **Configure the web server**: Configure Nginx or Apache to proxy requests to Gunicorn.

5. **Set up a process manager**: Use a process manager like Supervisor or systemd to manage Gunicorn and Celery processes.

6. **Enable HTTPS**: Use Let's Encrypt to obtain an SSL certificate and configure your web server to use HTTPS.

## Monitoring and Logging

1. **Set up monitoring**: Use monitoring tools like Prometheus, Grafana, or New Relic to monitor your application.

2. **Set up logging**: Configure logging to capture application logs and errors. Use tools like ELK Stack (Elasticsearch, Logstash, Kibana) or Graylog for centralized logging.

## Backup and Recovery

1. **Set up database backups**: Use tools like `mongodump` to create regular backups of your MongoDB database.

2. **Set up file backups**: Use tools like rsync or cloud storage services to back up static and media files.

3. **Test recovery procedures**: Regularly test your backup and recovery procedures to ensure you can restore your application in case of data loss or server failure.

## WebSocket Configuration

1. **Configure Django Channels**: Add the following configuration to your Django settings file (`Backend/api/api/settings.py`):
   ```python
   # Django Channels settings
   CHANNEL_LAYERS = {
       'default': {
           'BACKEND': 'channels_redis.core.RedisChannelLayer',
           'CONFIG': {
               "hosts": [('127.0.0.1', 6379)],
           },
       },
   }
   ```

2. **Install Django Channels**: Install Django Channels by adding it to your `requirements.txt` file:
   ```bash
   channels==3.0.3
   ```

3. **Update ASGI Configuration**: Update the `asgi.py` file to include the Channels configuration:
   ```python
   import os
   import django
   from channels.routing import get_default_application
   from channels.routing import ProtocolTypeRouter, URLRouter
   from channels.auth import AuthMiddlewareStack
   from django.core.asgi import get_asgi_application
   from channels.layers import get_channel_layer

   os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'api.settings')
   django.setup()

   application = ProtocolTypeRouter({
       "http": get_asgi_application(),
       "websocket": AuthMiddlewareStack(
           URLRouter(
               # Add your websocket URL routes here
           )
       ),
   })

   channel_layer = get_channel_layer()
   ```

## MongoDB Setup and Configuration for Specific Features

1. **User Authentication**:
   - Ensure the `User` model in `Backend/app/models.py` is configured to use MongoDB.
   - Update the authentication views and routes in `Backend/app/routes/auth.py` to interact with MongoDB.

2. **Blog Posts**:
   - Ensure the `BlogPost` model in `Backend/app/models.py` is configured to use MongoDB.
   - Update the blog post views and routes in `Backend/app/routes/blog.py` to interact with MongoDB.

3. **Notifications**:
   - Ensure the `Notification` model in `Backend/app/models.py` is configured to use MongoDB.
   - Update the notification views and routes in `Backend/app/routes/notifications.py` to interact with MongoDB.

By following these deployment instructions, you can successfully deploy TheTechNous project to a production environment.
