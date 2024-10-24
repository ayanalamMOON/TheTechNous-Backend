from marshmallow import Schema, fields, validate

class UserSchema(Schema):
    username = fields.str(required=True, validate=validate.Length(min=3, max=64))
    email = fields.Email(required=True)
    password = fields.Str(required=True, validate=validate.Length(min=8))

class BlogPostSchema(Schema):
    title = fields.Str(required=True, validate=validate.Length(min=1, max=200))
    content = fields.Str(required=True)

user_schema = UserSchema()
blog_post_schema = BlogPostSchema()
