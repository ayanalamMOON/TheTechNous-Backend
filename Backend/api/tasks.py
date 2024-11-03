from .celery import app
from Backend.app.viwes import app as flask_app

@app.task
def sample_task(app=flask_app):
    print("Sample task executed")
