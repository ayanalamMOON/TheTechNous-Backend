from djongo import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.utils.translation import gettext_lazy as _
from django.core.exceptions import ValidationError
import re
from cryptography.fernet import Fernet
import os

# Generate a key for encryption
key = os.getenv('ENCRYPTION_KEY', Fernet.generate_key())
cipher_suite = Fernet(key)

class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError(_('The Email field must be set'))
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))

        return self.create_user(username, email, password, **extra_fields)

class User(AbstractBaseUser):
    id = models.ObjectIdField(primary_key=True)
    username = models.CharField(max_length=64, unique=True, null=False)
    email = models.EmailField(max_length=120, unique=True, null=False)
    password = models.CharField(max_length=128, null=False)
    is_admin = models.BooleanField(default=False)
    roles = models.ArrayReferenceField(to='Role', on_delete=models.CASCADE)
    mfa_secret = models.CharField(max_length=32, null=True)
    salt = models.CharField(max_length=32, null=False, default=os.urandom(16).hex())

    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def set_password(self, password):
        if not self.validate_password(password):
            raise ValidationError("Password does not meet the required criteria")
        self.password = self.make_password(password + self.salt)

    def check_password(self, password):
        return self.check_password(password + self.salt)

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

    def encrypt_data(self, data):
        return cipher_suite.encrypt(data.encode()).decode()

    def decrypt_data(self, encrypted_data):
        return cipher_suite.decrypt(encrypted_data.encode()).decode()

    def set_email(self, email):
        self.email = self.encrypt_data(email)

    def get_email(self):
        return self.decrypt_data(self.email)

class Role(models.Model):
    id = models.ObjectIdField(primary_key=True)
    name = models.CharField(max_length=64, unique=True)

class UserRoles(models.Model):
    id = models.ObjectIdField(primary_key=True)
    user = models.ReferenceField(User, on_delete=models.CASCADE)
    role = models.ReferenceField(Role, on_delete=models.CASCADE)

class BlogPost(models.Model):
    id = models.ObjectIdField(primary_key=True)
    title = models.CharField(max_length=200, null=False)
    content = models.TextField(null=False)
    author = models.ReferenceField(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def get_absolute_url(self):
        return f"/blog/post/{self.id}"

class UserActivityLog(models.Model):
    id = models.ObjectIdField(primary_key=True)
    user = models.ReferenceField(User, on_delete=models.CASCADE)
    activity = models.CharField(max_length=255, null=False)
    timestamp = models.DateTimeField(auto_now_add=True)

class Notification(models.Model):
    id = models.ObjectIdField(primary_key=True)
    user = models.ReferenceField(User, on_delete=models.CASCADE)
    message = models.CharField(max_length=255, null=False)
    timestamp = models.DateTimeField(auto_now_add=True)

class SocialMediaShare(models.Model):
    id = models.ObjectIdField(primary_key=True)
    post = models.ReferenceField(BlogPost, on_delete=models.CASCADE)
    platform = models.CharField(max_length=64, null=False)
    shared_at = models.DateTimeField(auto_now_add=True)

class MediaFile(models.Model):
    id = models.ObjectIdField(primary_key=True)
    file_name = models.CharField(max_length=255, null=False)
    file_url = models.CharField(max_length=255, null=False)
    uploaded_at = models.DateTimeField(auto_now_add=True)

class SearchQuery(models.Model):
    id = models.ObjectIdField(primary_key=True)
    query = models.CharField(max_length=255, null=False)
    user = models.ReferenceField(User, on_delete=models.CASCADE, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
