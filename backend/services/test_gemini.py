import google.generativeai as genai
import os

genai.configure(
    api_key=os.getenv("GOOGLE_API_KEY")
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)

response = model.generate_content(
    "What is protein?"
)

print(response.text)