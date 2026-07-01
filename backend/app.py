from flask import Flask, request
from flask_cors import CORS
import os
import json
from services.user_service import (
    register_user,
    login_user
)
from services.ocr_service import extract_text

from services.chat_service import (
    ask_ai,
    analyze_nutrition_label
)

from services.history_service import (
    save_scan,
    get_history
)

from services.food_diary_service import (
    save_entry,
    get_entries
)

app = Flask(__name__)
CORS(app)

# -------------------------
# Config
# -------------------------

UPLOAD_FOLDER = "uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# -------------------------
# Home
# -------------------------

@app.route("/")
def home():
    return {
        "message": "NutriScan AI Backend Running"
    }

# -------------------------
# Scan Food (OCR + AI)
# -------------------------

@app.route("/scan", methods=["POST"])
def scan_food():

    try:
        print("SCAN STARTED")

        if "image" not in request.files:
            return {"error": "No image uploaded"}, 400

        image = request.files["image"]

        if image.filename == "":
            return {"error": "Empty filename"}, 400

        save_path = os.path.join(
            app.config["UPLOAD_FOLDER"],
            image.filename
        )

        image.save(save_path)

        print("IMAGE SAVED")
        print(save_path)

        # OCR
        extracted_text = extract_text(save_path)

        print("OCR RESULT:")
        print(extracted_text)

        # AI Analysis
        ai_response = analyze_nutrition_label(
            extracted_text
        )

        print("AI RESPONSE:")
        print(ai_response)

        try:

            cleaned = (
                ai_response
                .replace("```json", "")
                .replace("```", "")
                .strip()
            )

            print("CLEANED RESPONSE:")
            print(cleaned)

            result = json.loads(cleaned)

        except Exception as e:

            print("JSON PARSE ERROR:")
            print(str(e))

            result = {
                "product": image.filename,
                "calories": 0,
                "protein": 0,
                "sugar": 0,
                "fat": 0,
                "health_score": 0,
                "ai_analysis": ai_response
            }

        result["ocr_text"] = extracted_text

        save_scan(result)

        return result

    except Exception as e:

        import traceback
        traceback.print_exc()

        return {
            "error": str(e)
        }, 500

# -------------------------
# Food Diary
# -------------------------

@app.route("/diary", methods=["GET"])
def diary():
    return get_entries()

@app.route("/diary", methods=["POST"])
def add_diary():

    data = request.json

    save_entry(data)

    return {
        "message": "Saved"
    }

@app.route("/diary-insights", methods=["GET"])
def diary_insights():

    diary = get_entries()

    return {
        "meals_logged": len(diary),
        "total_calories": sum(
            item.get("calories", 0)
            for item in diary
        ),
        "total_protein": sum(
            item.get("protein", 0)
            for item in diary
        ),
        "total_sugar": sum(
            item.get("sugar", 0)
            for item in diary
        ),
        "total_fat": sum(
            item.get("fat", 0)
            for item in diary
        )
    }

# -------------------------
# AI Chat
# -------------------------

@app.route("/chat", methods=["POST"])
def chat():

    data = request.json

    message = data.get(
        "message",
        ""
    )

    reply = ask_ai(message)

    return {
        "reply": reply
    }

# -------------------------
# History
# -------------------------

@app.route("/history", methods=["GET"])
def history():
    return get_history()

# -------------------------
# Dashboard
# -------------------------

@app.route("/dashboard", methods=["GET"])
def dashboard():

    history = get_history()
    diary = get_entries()

    total_scans = len(history)

    average_score = 0
    healthy_products = 0

    if history:

        average_score = round(
    sum(
        item.get("health_score") or 0
        for item in history
    ) / len(history)
)

        healthy_products = len([
    item
    for item in history
    if (item.get("health_score") or 0) >= 70
])

    total_calories = sum(
    item.get("calories") or 0
    for item in diary
)

    return {
        "total_scans": total_scans,
        "average_score": average_score,
        "healthy_products": healthy_products,
        "meals_logged": len(diary),
        "total_calories": total_calories
    }
from services.user_service import register_user

@app.route("/register", methods=["POST"])
def register():

    data = request.json

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return {
            "success": False,
            "message": "All fields are required"
        }, 400

    result = register_user(
        name,
        email,
        password
    )

    return result

@app.route("/login", methods=["POST"])
def login():

    data = request.json

    email = data.get("email")
    password = data.get("password")

    result = login_user(
        email,
        password
    )

    return result
# -------------------------
# Run App
# -------------------------

if __name__ == "__main__":
    app.run(debug=True)