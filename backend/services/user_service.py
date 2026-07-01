import json
import os

USERS_FILE = "data/users.json"

def get_users():

    if not os.path.exists(USERS_FILE):
        return []

    with open(USERS_FILE, "r") as f:
        return json.load(f)

def save_users(users):

    with open(USERS_FILE, "w") as f:
        json.dump(users, f, indent=4)

def register_user(name, email, password):

    users = get_users()

    for user in users:
        if user["email"] == email:
            return {
                "success": False,
                "message": "Email already exists"
            }

    new_user = {
        "id": len(users) + 1,
        "name": name,
        "email": email,
        "password": password
    }

    users.append(new_user)

    save_users(users)

    return {
        "success": True,
        "message": "Registration successful",
        "user": {
            "id": new_user["id"],
            "name": new_user["name"],
            "email": new_user["email"]
        }
    }
def login_user(email, password):

    users = get_users()

    for user in users:

        if (
            user["email"] == email and
            user["password"] == password
        ):
            return {
                "success": True,
                "user": {
                    "id": user["id"],
                    "name": user["name"],
                    "email": user["email"]
                }
            }

    return {
        "success": False,
        "message": "Invalid email or password"
    }
import json
import os

USERS_FILE = "data/users.json"

def get_users():

    if not os.path.exists(USERS_FILE):
        return []

    with open(USERS_FILE, "r") as f:
        return json.load(f)

def save_users(users):

    with open(USERS_FILE, "w") as f:
        json.dump(users, f, indent=4)

def register_user(name, email, password):

    users = get_users()

    for user in users:
        if user["email"] == email:
            return {
                "success": False,
                "message": "Email already exists"
            }

    new_user = {
        "id": len(users) + 1,
        "name": name,
        "email": email,
        "password": password
    }

    users.append(new_user)

    save_users(users)

    return {
        "success": True,
        "message": "Registration successful",
        "user": {
            "id": new_user["id"],
            "name": new_user["name"],
            "email": new_user["email"]
        }
    }