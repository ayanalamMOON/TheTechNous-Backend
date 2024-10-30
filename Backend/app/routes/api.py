from flask import Blueprint
from app.routes.auth import auth
from app.routes.admin import admin
from app.routes.blog import blog

api = Blueprint('api', __name__)

api.register_blueprint(auth, url_prefix='/auth')
api.register_blueprint(admin, url_prefix='/admin')
api.register_blueprint(blog, url_prefix='/blog')
