from flask import Blueprint, request, jsonify
from flask_jwt_extented import jwt_required, get_jwt_identity
from app.models import db, Blog, User

blog = Blueprint('blog', __name__)

def can_post(user_id):
    user = User.query.get(user_id)
    return user.is_admin if user else False

@blog.route('/post', methods=['GET'])
def get_posts():
    posts = BlogPost.query.all()
    return jsonify([{"id": post.id, "title": post.title, 
                    "content": post.content, "author": post.author.username} for post in posts]), 200

@blog.route('/post', methods=['POST'])
@jwt_required
def create_post():
    current_user_id = get_jwt_identity()
    if not can_post(current_user_id):
        return jsonify({"msg": "You don't have the permission to post"}), 403
    
    data = request.get_json()
    new_post = BlogPost(title=data['title'], content = data['content'], author_id  = current_user_id)
    db.session.add(new_post)
    db.session.commit()

    return jsonify({"msg": "Post Created Successfully", "id": new_post.id}), 201

@blog.route('/post/<int:post_id>', methods=['PUT'])
@jwt_required 
def update_post(post_id)
    current_user_id = get_jwt_identity()
    post = BlogPost.query.get(post_id)

    if not post:
        return jsonify 
    


