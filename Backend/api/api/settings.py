"""
Django settings for api project.

Generated by 'django-admin startproject' using Django 5.1.1.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.1/ref/settings/
"""

from pathlib import Path
import os
import logging.config
import dj_database_url

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv(
    'DJANGO_SECRET_KEY', 'django-insecure-msit7$4d*^4y%@*t-8c71(*d1oilxan*4cm8-u4vu7j2sz#!3k'
)

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.getenv('DJANGO_DEBUG', 'True') == 'True'

ALLOWED_HOSTS = os.getenv('DJANGO_ALLOWED_HOSTS', '').split(',')


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_meta',
    'imagekit',
    'django.contrib.sitemaps',
    'django.contrib.sites',  # Site framework support
    'channels',  # Django Channels
    'rest_framework',  # Django Rest Framework
    'django_elasticsearch_dsl',  # Elasticsearch integration
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
]

ROOT_URLCONF = 'api.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'api.wsgi.application'
ASGI_APPLICATION = 'api.asgi.application'  # Django Channels

# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DJANGO_DB_NAME', 'dev_db'),
        'USER': os.getenv('DJANGO_DB_USER', 'dev_user'),
        'PASSWORD': os.getenv('DJANGO_DB_PASSWORD', 'dev_password'),
        'HOST': os.getenv('DJANGO_DB_HOST', 'localhost'),
        'PORT': os.getenv('DJANGO_DB_PORT', '5432'),
        'OPTIONS': {
            'MAX_CONNS': 20,  # Maximum number of connections in the pool
            'MIN_CONNS': 5,   # Minimum number of connections in the pool
        }
    }
}

# Free hosting service database settings
if os.getenv('DJANGO_ENVIRONMENT') == 'free_hosting':
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': os.getenv('FREE_HOSTING_DB_NAME'),
            'USER': os.getenv('FREE_HOSTING_DB_USER'),
            'PASSWORD': os.getenv('FREE_HOSTING_DB_PASSWORD'),
            'HOST': os.getenv('FREE_HOSTING_DB_HOST'),
            'PORT': os.getenv('FREE_HOSTING_DB_PORT'),
            'OPTIONS': {
                'MAX_CONNS': 20,  # Maximum number of connections in the pool
                'MIN_CONNS': 5,   # Minimum number of connections in the pool
            }
        }
    }

# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# SEO settings
META_SITE_PROTOCOL = 'https'
META_USE_SITES = True
META_USE_OG_PROPERTIES = True

# Logging configuration
LOGGING_CONFIG = None

LOGLEVEL = os.getenv('DJANGO_LOGLEVEL', 'info').upper()

logging.config.dictConfig({
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'default': {
            'format': '[{asctime}] {levelname} {name} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'default',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': LOGLEVEL,
    },
})

# Environment-specific settings
ENVIRONMENT = os.getenv('DJANGO_ENVIRONMENT', 'development')

if ENVIRONMENT == 'production':
    DEBUG = False
    ALLOWED_HOSTS = os.getenv('DJANGO_ALLOWED_HOSTS', '').split(',')
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': os.getenv('DJANGO_DB_NAME'),
            'USER': os.getenv('DJANGO_DB_USER'),
            'PASSWORD': os.getenv('DJANGO_DB_PASSWORD'),
            'HOST': os.getenv('DJANGO_DB_HOST'),
            'PORT': os.getenv('DJANGO_DB_PORT'),
            'OPTIONS': {
                'MAX_CONNS': 20,  # Maximum number of connections in the pool
                'MIN_CONNS': 5,   # Minimum number of connections in the pool
            }
        }
    }
    STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
    SECURE_SSL_REDIRECT = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_HSTS_SECONDS = 3600
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True
    SESSION_COOKIE_HTTPONLY = True
    CSRF_COOKIE_HTTPONLY = True
    SESSION_COOKIE_AGE = 1209600  # 2 weeks
    SESSION_EXPIRE_AT_BROWSER_CLOSE = True
    SECURE_BROWSER_XSS_FILTER = True
    SECURE_REFERRER_POLICY = 'same-origin'
elif ENVIRONMENT == 'ci':
    DEBUG = False
    ALLOWED_HOSTS = ['*']
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': os.getenv('CI_DB_NAME', 'ci_db'),
            'USER': os.getenv('CI_DB_USER', 'ci_user'),
            'PASSWORD': os.getenv('CI_DB_PASSWORD', 'ci_password'),
            'HOST': os.getenv('CI_DB_HOST', 'localhost'),
            'PORT': os.getenv('CI_DB_PORT', '5432'),
            'OPTIONS': {
                'MAX_CONNS': 20,  # Maximum number of connections in the pool
                'MIN_CONNS': 5,   # Minimum number of connections in the pool
            }
        }
    }
elif ENVIRONMENT == 'staging':
    DEBUG = False
    ALLOWED_HOSTS = os.getenv('STAGING_ALLOWED_HOSTS', '').split(',')
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': os.getenv('STAGING_DB_NAME'),
            'USER': os.getenv('STAGING_DB_USER'),
            'PASSWORD': os.getenv('STAGING_DB_PASSWORD'),
            'HOST': os.getenv('STAGING_DB_HOST'),
            'PORT': os.getenv('STAGING_DB_PORT'),
            'OPTIONS': {
                'MAX_CONNS': 20,  # Maximum number of connections in the pool
                'MIN_CONNS': 5,   # Minimum number of connections in the pool
            }
        }
    }
else:
    DEBUG = True
    ALLOWED_HOSTS = ['localhost', '127.0.0.1']
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': os.getenv('DJANGO_DB_NAME', 'dev_db'),
            'USER': os.getenv('DJANGO_DB_USER', 'dev_user'),
            'PASSWORD': os.getenv('DJANGO_DB_PASSWORD', 'dev_password'),
            'HOST': os.getenv('DJANGO_DB_HOST', 'localhost'),
            'PORT': os.getenv('DJANGO_DB_PORT', '5432'),
            'OPTIONS': {
                'MAX_CONNS': 20,  # Maximum number of connections in the pool
                'MIN_CONNS': 5,   # Minimum number of connections in the pool
            }
        }
    }

# HTTPS settings
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# Security headers
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'
CONTENT_SECURITY_POLICY = (
    "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; "
    "font-src 'self'; connect-src 'self'"
)

# Celery settings
CELERY_BROKER_URL = os.getenv('CELERY_BROKER_URL', 'redis://localhost:6379/0')
CELERY_RESULT_BACKEND = os.getenv('CELERY_RESULT_BACKEND', 'redis://localhost:6379/0')
CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'

# Redis caching configuration
CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': 'redis://127.0.0.1:6379/1',
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
        }
    }
}

# Rate limiting settings
REST_FRAMEWORK = {
    'DEFAULT_THROTTLE_RATES': {
        'anon': '100/day',
        'user': '1000/day'
    },
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,
}

# Input validation settings
DATA_UPLOAD_MAX_MEMORY_SIZE = 5242880  # 5 MB

# Ensure all necessary environment variables are defined and accessible
REQUIRED_ENV_VARS = [
    'DJANGO_SECRET_KEY',
    'DJANGO_DEBUG',
    'DJANGO_ALLOWED_HOSTS',
    'DJANGO_LOGLEVEL',
    'DJANGO_ENVIRONMENT',
    'CELERY_BROKER_URL',
    'CELERY_RESULT_BACKEND',
    'DATABASE_URL'
]

for var in REQUIRED_ENV_VARS:
    if var not in os.environ:
        raise EnvironmentError(f"Required environment variable {var} is not set.")

# CORS settings
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_HEADERS = [
    "Content-Type",
    "Authorization",
]

# Django Channels settings
CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            "hosts": [('127.0.0.1', 6379)],
        },
    },
}

# Update DATABASES configuration to use dj_database_url to parse DATABASE_URL
DATABASES['default'] = dj_database_url.config(default=os.getenv('DATABASE_URL'))

# Content Security Policy (CSP) settings
CSP_DEFAULT_SRC = ("'self'",)
CSP_SCRIPT_SRC = ("'self'",)
CSP_STYLE_SRC = ("'self'",)
CSP_IMG_SRC = ("'self'",)
CSP_FONT_SRC = ("'self'",)
CSP_CONNECT_SRC = ("'self'",)

# HTTP Strict Transport Security (HSTS) settings
SECURE_HSTS_SECONDS = 31536000  # 1 year
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True

# Updated CORS settings
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://example.com",
]

# Rate limiting settings using Django Rest Framework's throttling settings
REST_FRAMEWORK = {
    'DEFAULT_THROTTLE_RATES': {
        'anon': '100/day',
        'user': '1000/day',
        'burst': '10/minute',
    },
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,
}

# Elasticsearch settings
ELASTICSEARCH_DSL = {
    'default': {
        'hosts': 'localhost:9200'
    },
}
