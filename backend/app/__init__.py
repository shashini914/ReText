from flask import Flask
from flask_restful import Api

def create_app():
    app = Flask(__name__)
    api = Api(app)

    # Register blueprints
    from .auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint, url_prefix='/auth')

    # Default route
    @app.route('/')
    def index():
        return {"message": "Welcome to the Book Exchange Platform!"}

    return app
