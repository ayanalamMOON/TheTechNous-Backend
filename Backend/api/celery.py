import os
from celery import Celery
from api import app

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'api.settings')

def make_celery(app):
    celery = Celery('api', app=app)
    celery.config_from_object('django.conf:settings', namespace='CELERY')
    celery.autodiscover_tasks()
    return celery

celery_app = make_celery(app)
