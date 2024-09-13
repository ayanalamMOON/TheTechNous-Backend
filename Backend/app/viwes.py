from flask import Flask
from routes.admon import admin
from routes.blog import blog
from routes.auth import auth
from models import db

app = Flask(__name__)

app.config['SQLALCHAMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

app.register_blueprint(admin, url_prefic='/admin')
app.register_blueprint(blog, url_prefix='/blog')
app.register_blueprint(auth, url_prefix='/auth')

with app.app_context():
    db.create_all()