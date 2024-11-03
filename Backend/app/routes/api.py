from flask import Blueprint
from app.routes.auth import auth
from app.routes.admin import admin
from app.routes.blog import blog
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from Backend.app.viwes import app

api = Blueprint('api', __name__, app=app)

limiter = Limiter(
    get_remote_address,
    app=api,
    default_limits=["200 per day", "50 per hour"]
)

api.register_blueprint(auth, url_prefix='/auth')
api.register_blueprint(admin, url_prefix='/admin')
api.register_blueprint(blog, url_prefix='/blog')

# User roles and permissions management
from app.routes.roles import roles
api.register_blueprint(roles, url_prefix='/roles')

# Notification system
from app.routes.notifications import notifications
api.register_blueprint(notifications, url_prefix='/notifications')

# Social media sharing
from app.routes.social import social
api.register_blueprint(social, url_prefix='/social')

# File uploads and media management
from app.routes.media import media
api.register_blueprint(media, url_prefix='/media')

# Advanced search functionality
from app.routes.search import search
api.register_blueprint(search, url_prefix='/search')
