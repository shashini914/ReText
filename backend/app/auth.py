from flask import Blueprint, request, jsonify
from app.models import add_user, get_user_by_email, add_session, remove_session, is_logged_in, verify_password
import uuid  # For generating mock tokens

auth = Blueprint('auth', __name__)

@auth.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    # Check if the email is already registered
    if get_user_by_email(email):
        return jsonify({"message": "User already exists"}), 409

    # Add user to the in-memory dictionary
    user_id = add_user(username, email, password)
    return jsonify({"message": "User created successfully", "user_id": user_id}), 201

@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = get_user_by_email(email)
    if user and verify_password(user['password'], password):
        # Generate a mock token and use the username as the key
        token = str(uuid.uuid4())
        add_session(user['username'])  # Save the username in session
        return jsonify({"message": "Login successful", "token": f"Bearer {user['username']}", "user": user}), 200
    return jsonify({"message": "Invalid credentials"}), 401

@auth.route('/logout', methods=['POST'])
def logout():
    data = request.get_json()
    username = data.get('username')

    if is_logged_in(username):
        remove_session(username)
        return jsonify({"message": "Logged out successfully"}), 200
    return jsonify({"message": "User not logged in"}), 400

@auth.route('/profile', methods=['GET'])
def profile():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({"message": "Token missing"}), 401

    # Extract the username from the token (formatted as "Bearer username")
    try:
        username = token.split(" ")[1]
    except IndexError:
        return jsonify({"message": "Invalid token format"}), 400

    if not is_logged_in(username):
        return jsonify({"message": "User not logged in"}), 403

    user = get_user_by_email(username + "@myseneca.ca")
    if user:
        return jsonify({"message": "Profile fetched successfully", "user": user}), 200
    return jsonify({"message": "User not found"}), 404
