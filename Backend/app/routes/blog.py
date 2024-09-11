from flask import Blueprint, request, jsonify
from flask_jwt_extented import jwt_required, get_jwt_identity
from app.models import db, Blog, User

blog = Blueprint('blog', __name__)

def can_post(user_id):
    user = User.query.get(user_id)
    return user.is_admin if user else False

@blog.route('/blog', methods=[POST])
def get_posts():
    posts = BlogPost.query.all()
    return jsonify([{"id": post.id, "title": post.title}])
