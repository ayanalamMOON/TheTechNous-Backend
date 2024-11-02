import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'api.settings')

def make_celery():
    app = Celery('api')
    app.config_from_object('django.conf:settings', namespace='CELERY')
    app.autodiscover_tasks()
    return app

app = make_celery()
