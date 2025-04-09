import hashlib
import json
import os

users = {}
sessions = {}  # Track logged-in users
USER_FILE = "users.json"

# Load users from file (runs once)
def load_users():
    global users
    if os.path.exists(USER_FILE):
        with open(USER_FILE, 'r') as f:
            users = json.load(f)

# Save users to file
def save_users():
    with open(USER_FILE, 'w') as f:
        json.dump(users, f, indent=4)

def hash_password(password):
    return hashlib.md5(password.encode()).hexdigest()

def add_user(username, email, password):
    user_id = str(len(users) + 1)
    hashed_password = hash_password(password)
    users[user_id] = {
        "username": username,
        "email": email,
        "password": hashed_password
    }
    save_users()
    return user_id

def get_user_by_email(email):
    for user in users.values():
        if user['email'] == email:
            return user
    return None

def get_user_by_username(username):
    for user in users.values():
        if user['username'] == username:
            return user
    return None

def verify_password(stored_password, provided_password):
    return stored_password == hash_password(provided_password)

def add_session(username):
    sessions[username] = True

def remove_session(username):
    sessions.pop(username, None)

def is_logged_in(username):
    return sessions.get(username, False)

# 🔁 Automatically load users on import
load_users()
