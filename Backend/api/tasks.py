from .celery import app

@app.task
def sample_task():
    print("Sample task executed")
