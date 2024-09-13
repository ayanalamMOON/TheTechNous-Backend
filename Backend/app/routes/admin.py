from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import db, User

admin = Blueprint('admin', __name__)

@admin.route('/')
def admin_home():
    return jsonify({'msg': 'Admin Home'}), 200

def is_admin():
    user = User.query.get(user_id)
    return user.is_admin if user else False


@admin.route('/users', methods=['GET'])
@jwt_required
def get_users():
    current_user_id = get_jwt_identity()
    if not is_admin(current_user_id):
        return jsonify({'msg': 'Admin Access required'}), 403
    
    users = User.query.all()
    return jsonify([{"id": user.id, "username": user.username, 
                    "email": user.email, "is_admin": user.is_admin} for user in users]), 200

@admin.route('/users/<int:user_id>', methods=['PUT'])
@jwt_required
def update_user(user_id):
    current_user_id = get_jwt_identity()
    if not is_admin(current_user_id):
        return jsonify({'msg': 'Admin Access required'}), 403
    
    user = User.query.get(user_id)
    if not user:
        return jsonify({'msg': 'User not found'}), 404
    
    data = request.get_json()
    user.is_admin = data.get('is_admin', user.is_admin)
    db.session.commit()

    return jsonify({"msg": "User updated successfully"}), 200

@admin.route('/users/<int:user_id>', methods=['DELETE'])
@jwt_required
def delete_user(user_id):
    current_user_id = get_jwt_identity()
    if not is_admin(current_user_id):
        return jsonify({'msg': 'Admin Access required'}), 403
    
    user = User.query.get(user_id)
    if not user:
        return jsonify({'msg': 'User not found'}), 404
    
    db.session.delete(user)
    db.session.commit()

    return jsonify({"msg": "User deleted successfully"}), 200