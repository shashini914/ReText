from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from models import *
import config
from extensions import db, jwt  

def create_app():
    app = Flask(__name__)
    app.config.from_object(config)

    db.init_app(app)
    jwt.init_app(app)
    CORS(app, supports_credentials=True, origins=["http://localhost:3000"])

    migrate = Migrate(app, db)
    
    # Register blueprints
    from routes.auth_routes import auth_bp
    app.register_blueprint(auth_bp, url_prefix="/api/auth")

    from routes.book_routes import book_bp
    app.register_blueprint(book_bp, url_prefix='/api/books')


    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
