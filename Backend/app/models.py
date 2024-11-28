from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import check_password_hash
from argon2 import PasswordHasher
import re
from cryptography.fernet import Fernet
import os
from Backend.app.viwes import db

ph = PasswordHasher()

# Generate a key for encryption
key = os.getenv('ENCRYPTION_KEY', Fernet.generate_key())
cipher_suite = Fernet(key)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, nullable=False, index=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(128), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)
    roles = db.relationship('Role', secondary='user_roles', backref=db.backref('users', lazy='dynamic'))
    mfa_secret = db.Column(db.String(32), nullable=True)
    salt = db.Column(db.String(32), nullable=False, default=os.urandom(16).hex())
    password_history = db.relationship('PasswordHistory', backref='user', lazy=True)

    def set_password(self, password):
        if not self.validate_password(password):
            raise ValueError("Password does not meet the required criteria")
        if self.is_common_password(password):
            raise ValueError("Password is too common")
        if self.is_password_reused(password):
            raise ValueError("Password has been used before")
        self.password_hash = ph.hash(password + self.salt)
        self.add_password_to_history(password)

    def check_password(self, password):
        try:
            return ph.verify(self.password_hash, password + self.salt)
        except:
            return False

    def validate_password(self, password):
        if len(password) < 8:
            return False
        if not re.search(r"[A-Z]", password):
            return False
        if not re.search(r"[a-z]", password):
            return False
        if not re.search(r"[0-9]", password):
            return False
        if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
            return False
        return True

    def is_common_password(self, password):
        common_passwords = [
            "123456", "password", "123456789", "12345678", "12345", "1234567", "1234567890", "qwerty", "abc123", "password1"
        ]
        return password in common_passwords

    def is_password_reused(self, password):
        for history in self.password_history:
            if ph.verify(history.password_hash, password + self.salt):
                return True
        return False

    def add_password_to_history(self, password):
        password_history = PasswordHistory(user_id=self.id, password_hash=ph.hash(password + self.salt))
        db.session.add(password_history)
        db.session.commit()

    def encrypt_data(self, data):
        return cipher_suite.encrypt(data.encode()).decode()

    def decrypt_data(self, encrypted_data):
        return cipher_suite.decrypt(encrypted_data.encode()).decode()

    def set_email(self, email):
        self.email = self.encrypt_data(email)

    def get_email(self):
        return self.decrypt_data(self.email)

class Role(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True)

class UserRoles(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete='CASCADE'))
    role_id = db.Column(db.Integer, db.ForeignKey('role.id', ondelete='CASCADE'))

class BlogPost(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable= False, index=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

    author = db.relationship('User', backref=db.backref('blog_posts', lazy=True))

    def get_absolute_url(self):
        return f"/blog/post/{self.id}"

class UserActivityLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False, index=True)
    activity = db.Column(db.String(255), nullable=False)
    timestamp = db.Column(db.DateTime, server_default=db.func.now())

    user = db.relationship('User', backref=db.backref('activity_logs', lazy=True))

class Notification(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False, index=True)
    message = db.Column(db.String(255), nullable=False)
    timestamp = db.Column(db.DateTime, server_default=db.func.now())

    user = db.relationship('User', backref=db.backref('notifications', lazy=True))

class SocialMediaShare(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey('blog_post.id'), nullable=False, index=True)
    platform = db.Column(db.String(64), nullable=False)
    shared_at = db.Column(db.DateTime, server_default=db.func.now())

    post = db.relationship('BlogPost', backref=db.backref('social_shares', lazy=True))

class MediaFile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    file_name = db.Column(db.String(255), nullable=False)
    file_url = db.Column(db.String(255), nullable=False)
    uploaded_at = db.Column(db.DateTime, server_default=db.func.now())

class SearchQuery(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    query = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True, index=True)
    timestamp = db.Column(db.DateTime, server_default=db.func.now())

    user = db.relationship('User', backref=db.backref('search_queries', lazy=True))

class PasswordHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
