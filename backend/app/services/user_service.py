from ..models import User
from .. import db
from werkzeug.security import generate_password_hash, check_password_hash
import re
from flask import current_app

def is_college_email(email):
    pattern = current_app.config['COLLEGE_EMAIL_REGEX']
    return bool(re.match(pattern, email))

def create_user(username, email, password):
    if not is_college_email(email):
        return None, "Invalid college email format"

    hashed_password = generate_password_hash(password)
    new_user = User(username=username, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return new_user, None

def get_user_by_email(email):
    return User.query.filter_by(email=email).first()

def verify_password(stored_password, password):
    return check_password_hash(stored_password, password)
