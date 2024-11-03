from datetime import datetime
from app.models import db, UserActivityLog

def log_user_activity(user_id, activity):
    """
    Log user activity.

    **Usage:**
    ```python
    log_user_activity(user_id=1, activity="User logged in")
    ```

    **Parameters:**
    - `user_id` (int): The ID of the user.
    - `activity` (str): The activity performed by the user.

    **Returns:**
    None
    """
    log = UserActivityLog(user_id=user_id, activity=activity, timestamp=datetime.utcnow())
    db.session.add(log)
    db.session.commit()
