from marshmallow import Schema, fields, validate
from Backend.app.viwes import app

class UserSchema(Schema):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.app = app

    username = fields.Str(required=True, validate=validate.Length(min=3, max=64))
    email = fields.Email(required=True)
    password = fields.Str(required=True, validate=validate.Length(min=8))

class BlogPostSchema(Schema):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.app = app

    title = fields.Str(required=True, validate=validate.Length(min=1, max=200))
    content = fields.Str(required=True)

class PersonalizedFeedbackSchema(Schema):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.app = app

    user_id = fields.Int(required=True)
    feedback = fields.Str(required=True)
    timestamp = fields.DateTime(required=True)

user_schema = UserSchema()
blog_post_schema = BlogPostSchema()
personalized_feedback_schema = PersonalizedFeedbackSchema()
