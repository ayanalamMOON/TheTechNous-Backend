from flask import Flask
from routes.admon import admin
from routes.blog import blog
from routes.auth import auth
from models import db
