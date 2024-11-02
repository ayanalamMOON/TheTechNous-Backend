from datetime import datetime
from app.models import db, UserActivityLog

def log_user_activity(user_id, activity):
    log = UserActivityLog(user_id=user_id, activity=activity, timestamp=datetime.utcnow())
    db.session.add(log)
    db.session.commit()
