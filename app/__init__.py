# app/__init__.py
from flask import Flask

def create_app():
    app = Flask(__name__)
    app.secret_key = 'dev'  # Change to an environment variable in production

    from .routes import main
    app.register_blueprint(main)

    return app
