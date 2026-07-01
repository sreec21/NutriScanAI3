import google.generativeai as genai
import json
import os

genai.configure(
    api_key=os.getenv("GOOGLE_API_KEY")
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)


def ask_ai(message):

    response = model.generate_content(
        f"""
        You are NutriScan AI.

        Answer nutrition questions.

        Question:
        {message}
        """
    )

    return response.text


def analyze_nutrition_label(text):

    response = model.generate_content(
        f"""
Extract nutrition information.

Return ONLY valid JSON.

Example:

{{
    "product": "Cheese",
    "calories": 120,
    "protein": 8,
    "sugar": 2,
    "fat": 10,
    "health_score": 75,
    "ai_analysis": "High protein but moderate fat."
}}

Nutrition Label:

{text}
"""
    )

    return response.text