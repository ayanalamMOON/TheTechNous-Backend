from api.celery import app
from api import app as flask_app

@app.task
def sample_task(app=flask_app):
    print("Sample task executed")
