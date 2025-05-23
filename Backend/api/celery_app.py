from __future__ import absolute_import, unicode_literals


import os

from celery import Celery
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'api.settings')

app = Celery('api')

app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)


@app.task(bind=True)
def debug_task(self):
    """
    A simple debug task that prints the request.

    :param self: The task instance.
    """
    print('Request: {0!r}'.format(self.request))
