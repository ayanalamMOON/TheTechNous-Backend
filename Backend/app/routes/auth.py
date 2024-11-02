from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app.models import db, User
import pyotp
from app.activity_logger import log_user_activity

auth = Blueprint('auth', __name__)

@auth.route('/')
def auth_home():
    return jsonify({'msg': 'Auth Home'}), 200    

@auth.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'Username already exists'}), 400
    
    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already exists'}), 400

    new_user = User(username=username, email=email)
    new_user.set_password(password)
    new_user.mfa_secret = pyotp.random_base32()
    db.session.add(new_user)
    db.session.commit()

    log_user_activity(new_user.id, 'User registered')

    return jsonify({'message': 'User created successfully', 'mfa_secret': new_user.mfa_secret}), 201

@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data.get('username')).first()

    if user and user.check_password(data.get('password')):
        otp = data.get('otp')
        totp = pyotp.TOTP(user.mfa_secret)
        if totp.verify(otp):
            access_token = create_access_token(identity=user.id)
            log_user_activity(user.id, 'User logged in')
            return jsonify({'access_token': access_token}), 200
        else:
            return jsonify({'message': 'Invalid OTP'}), 401

    return jsonify({'message': 'Invalid login credentials'}), 401

@auth.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    current_user = get_jwt_identity()
    user = User.query.get(current_user)
    log_user_activity(current_user, 'Viewed profile')
    return jsonify({'username': user.username, 'email': user.email, 'is_admin': user.is_admin}), 200
