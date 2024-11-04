from .celery import app
from Backend.app.viwes import app as flask_app

@app.task
def sample_task(app=flask_app):
    print("Sample task executed")

@app.task
def send_email_task(subject, recipient, body, app=flask_app):
    with app.app_context():
        from flask_mail import Message
        from app import mail
        msg = Message(subject, recipients=[recipient], body=body)
        mail.send(msg)
        print(f"Email sent to {recipient}")

@app.task
def generate_report_task(user_id, app=flask_app):
    with app.app_context():
        from app.models import User, Report
        user = User.query.get(user_id)
        if user:
            report = Report(user_id=user.id, content="Sample report content")
            db.session.add(report)
            db.session.commit()
            print(f"Report generated for user {user.username}")
        else:
            print(f"User with id {user_id} not found")
