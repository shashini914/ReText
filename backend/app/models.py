import hashlib

# Simulating an in-memory database (a simple dictionary)
users = {}
sessions = {}  # Dictionary to keep track of logged-in users

def hash_password(password):
    """Hash the password using MD5 (for mock purposes)"""
    return hashlib.md5(password.encode()).hexdigest()

def add_user(username, email, password):
    """Add a user to the in-memory database"""
    user_id = len(users) + 1
    hashed_password = hash_password(password)
    users[user_id] = {
        "username": username,
        "email": email,
        "password": hashed_password
    }
    return user_id

def get_user_by_email(email):
    """Retrieve a user by email"""
    for user_id, user in users.items():
        if user['email'] == email:
            return user
    return None

def verify_password(stored_password, provided_password):
    """Verify the hashed password"""
    return stored_password == hash_password(provided_password)

def add_session(username):
    """Add a user session"""
    sessions[username] = True

def remove_session(username):
    """Remove a user session"""
    sessions.pop(username, None)

def is_logged_in(username):
    """Check if a user is logged in"""
    return sessions.get(username, False)
