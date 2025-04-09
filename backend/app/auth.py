from flask import Blueprint, request, jsonify
from app.models import (
    add_user, get_user_by_email, get_user_by_username,
    add_session, remove_session, is_logged_in, verify_password
)
import uuid  # For generating mock tokens

auth = Blueprint('auth', __name__)

# ---------------- SIGNUP ----------------
@auth.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({"error": "All fields are required."}), 400

    if not email.endswith("@myseneca.ca"):
        return jsonify({"error": "Only @myseneca.ca emails are allowed."}), 400

    if get_user_by_email(email):
        return jsonify({"message": "User already exists"}), 409

    user_id = add_user(username, email, password)
    return jsonify({"message": "User created successfully", "user_id": user_id}), 201

# ---------------- LOGIN ----------------
@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required."}), 400

    user = get_user_by_email(email)
    if user and verify_password(user['password'], password):
        # Token will simply be a string: Bearer <username>
        token = str(uuid.uuid4())  # Mock token – not used
        add_session(user['username'])  # Mark user as "logged in"
        return jsonify({
            "message": "Login successful",
            "token": f"Bearer {user['username']}",
            "user": {
                "email": user['email'],
                "username": user['username']
            }
        }), 200

    return jsonify({"message": "Invalid credentials"}), 401

# ---------------- LOGOUT ----------------
@auth.route('/logout', methods=['POST'])
def logout():
    data = request.get_json()
    username = data.get('username')

    if is_logged_in(username):
        remove_session(username)
        return jsonify({"message": "Logged out successfully"}), 200

    return jsonify({"message": "User not logged in"}), 400

# ---------------- PROFILE ----------------
@auth.route('/profile', methods=['GET'])
def profile():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({"message": "Token missing"}), 401

    try:
        # Extract username from "Bearer username"
        username = token.split(" ")[1]
    except IndexError:
        return jsonify({"message": "Invalid token format"}), 400

    if not is_logged_in(username):
        return jsonify({"message": "User not logged in"}), 403

    # Fetch user only if they are logged in
    user = get_user_by_username(username)
    if user:
        return jsonify({
            "message": "Profile fetched successfully",
            "user": {
                "username": user["username"],
                "email": user["email"]
            }
        }), 200

    return jsonify({"message": "User not found"}), 404
