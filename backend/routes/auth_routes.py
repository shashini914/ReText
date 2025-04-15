from flask import Blueprint, request, jsonify
from extensions import db
from models import User
from flask_jwt_extended import create_access_token

auth_bp = Blueprint('auth', __name__)

college_domains = {
    "seneca": "myseneca.ca",
    "humber": "students.humber.ca",
    "uoft": "utoronto.ca",
    "york": "my.yorku.ca"
}

@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.json
    first_name = data.get("first_name", "").strip().title()
    last_name = data.get("last_name", "").strip().title()
    email = data.get("email", "").strip().lower()
    college = data.get("college", "").strip().lower()
    password = data.get("password")

    expected_domain = college_domains.get(college)
    if not expected_domain or not email.endswith(expected_domain):
        return jsonify({"error": f"Email must end with @{expected_domain} for {college.title()} College."}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already registered"}), 409

    user = User(
    first_name=first_name,
    last_name=last_name,
    email=email,
    college=college)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "Account created successfully"}), 201

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    user = User.query.filter_by(email=data.get("email")).first()
    if user and user.check_password(data.get("password")):
        # Store user.id as identity (needed for get_jwt_identity)
        additional = {
            "email": user.email,
            "college": user.college,
            "first_name": user.first_name,
            "last_name": user.last_name
        }
        token = create_access_token(identity=str(user.id), additional_claims=additional)
        return jsonify(token=token)
    return jsonify({"error": "Invalid credentials"}), 401