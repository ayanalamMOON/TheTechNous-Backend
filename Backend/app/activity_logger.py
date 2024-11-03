from datetime import datetime
from Backend.app.viwes import db
from app.models import UserActivityLog
from app import app

def log_user_activity(user_id, activity):
    """
    Log user activity.

    :param user_id: The ID of the user.
    :param activity: The activity description.
    """
    log = UserActivityLog(user_id=user_id, activity=activity, timestamp=datetime.utcnow())
    db.session.add(log)
    db.session.commit()
    app.logger.info(f"User {user_id} activity: {activity}")

def log_login_time(user_id):
    """
    Log user login time.

    :param user_id: The ID of the user.
    """
    log_user_activity(user_id, "User logged in")

def log_completed_task(user_id, task_id):
    """
    Log user completed task.

    :param user_id: The ID of the user.
    :param task_id: The ID of the completed task.
    """
    log_user_activity(user_id, f"Completed task {task_id}")

def log_interaction(user_id, interaction):
    """
    Log user interaction.

    :param user_id: The ID of the user.
    :param interaction: The interaction description.
    """
    log_user_activity(user_id, f"Interaction: {interaction}")

"""
Activity Logger

This module provides functionality to log user activities in the application.

Usage:
1. Import the `log_user_activity` function.
2. Call the function with the user ID and activity description.

Example:
```python
from app.activity_logger import log_user_activity

log_user_activity(user_id=1, activity="User logged in")
```
"""
