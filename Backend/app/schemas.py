from marshmallow import Schema, fields, validate, validates, ValidationError
from Backend.api.api import app

class UserSchema(Schema):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.app = app

    username = fields.Str(required=True, validate=validate.Length(min=3, max=64))
    email = fields.Email(required=True)
    password = fields.Str(required=True, validate=validate.Length(min=8))

    @validates('username')
    def validate_username(self, value):
        if not value.isalnum():
            raise ValidationError("Username must be alphanumeric.")
        if ' ' in value:
            raise ValidationError("Username must not contain spaces.")

    @validates('password')
    def validate_password(self, value):
        if len(value) < 8:
            raise ValidationError("Password must be at least 8 characters long.")
        if not any(char.isdigit() for char in value):
            raise ValidationError("Password must contain at least one digit.")
        if not any(char.isupper() for char in value):
            raise ValidationError("Password must contain at least one uppercase letter.")
        if not any(char.islower() for char in value):
            raise ValidationError("Password must contain at least one lowercase letter.")
        if not any(char in "!@#$%^&*()_+-=[]{}|;':,.<>?/~`" for char in value):
            raise ValidationError("Password must contain at least one special character.")

class BlogPostSchema(Schema):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.app = app

    title = fields.Str(required=True, validate=validate.Length(min=1, max=200))
    content = fields.Str(required=True)

    @validates('title')
    def validate_title(self, value):
        if len(value) < 1 or len(value) > 200:
            raise ValidationError("Title must be between 1 and 200 characters long.")

    @validates('content')
    def validate_content(self, value):
        if len(value) < 1:
            raise ValidationError("Content must not be empty.")

user_schema = UserSchema()
blog_post_schema = BlogPostSchema()
