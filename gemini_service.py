import os
from dotenv import load_dotenv
import json
import google.generativeai as genai
load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

genai.configure(
    api_key=GEMINI_API_KEY
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)


def analyze_medicine(image):

    prompt = f"""
You are MediLens AI, an intelligent medicine assistant.

Analyze the medicine package shown in the uploaded image.
Read any visible text from the packaging and explain it.

Analyze the medicine information and explain it for normal people with no medical background.

IMPORTANT RULES:

- Use simple everyday language.
- Avoid medical jargon whenever possible.
- Explain things as if talking to a patient.
- Do NOT diagnose diseases.
- Do NOT recommend self-medication.
- Encourage consulting healthcare professionals.
- Never leave any field empty.
- Never return null.
- Never return empty arrays.
- Every array must contain at least 2-3 items.
- If information is unavailable, provide a helpful general explanation.
- If still unknown, write:
  "Not clearly available from the packaging. Consult a healthcare professional."

For side effects:
- Return at least 3 common side effects.

For warnings:
- Return at least 3 important warnings.

For who_should_be_careful:
- Return at least 2 groups of people.

For seek_medical_help_if:
- Return at least 2 emergency situations.

Return ONLY valid JSON.

JSON FORMAT:

{{
  "medicine_name": "",
  "ai_summary": "",
  "what_it_does": "",
  "how_to_take": "",
  "side_effects": [],
  "important_warnings": [],
  "who_should_be_careful": [],
  "seek_medical_help_if": [],
  "storage": "",
  "ingredients": [
    {{
      "name": "",
      "purpose": ""
    }}
  ]
}}
"""

    try:

        response = model.generate_content(
    [prompt, image]
)

        text = response.text.strip()

        if text.startswith("```json"):
            text = text.replace("```json", "")

        if text.endswith("```"):
            text = text.replace("```", "")

        data = json.loads(text)

        # Fallbacks

        if not data.get("side_effects"):
            data["side_effects"] = [
                "Mild stomach discomfort",
                "Nausea",
                "Headache"
            ]

        if not data.get("important_warnings"):
            data["important_warnings"] = [
                "Follow your doctor's instructions.",
                "Do not exceed the recommended dose.",
                "Seek medical advice if symptoms worsen."
            ]

        if not data.get("who_should_be_careful"):
            data["who_should_be_careful"] = [
                "Pregnant or breastfeeding women",
                "People with existing medical conditions"
            ]

        if not data.get("seek_medical_help_if"):
            data["seek_medical_help_if"] = [
                "Difficulty breathing",
                "Severe allergic reaction"
            ]

        if not data.get("storage"):
            data["storage"] = (
                "Store in a cool dry place away from direct sunlight."
            )

        if not data.get("ingredients"):
            data["ingredients"] = [
                {
                    "name": "Not clearly identified",
                    "purpose": (
                        "Consult a healthcare professional "
                        "for ingredient details."
                    )
                }
            ]

        print("\n===== GEMINI RESPONSE =====")
        print(json.dumps(data, indent=2))
        print("===========================\n")

        return data

    except Exception as e:

        print("Gemini Error:", str(e))

        return {
            "medicine_name": "Unknown Medicine",

            "ai_summary":
            "Unable to fully analyze the medicine at this time.",

            "what_it_does":
            "Information not clearly available from the packaging.",

            "how_to_take":
            "Follow your doctor's instructions.",

            "side_effects": [
                "Nausea",
                "Headache",
                "Mild stomach discomfort"
            ],

            "important_warnings": [
                "Consult a healthcare professional before use.",
                "Keep out of reach of children.",
                "Do not exceed the recommended dose."
            ],

            "who_should_be_careful": [
                "Pregnant women",
                "People with chronic illnesses"
            ],

            "seek_medical_help_if": [
                "Difficulty breathing",
                "Severe allergic reaction"
            ],

            "storage":
            "Store in a cool dry place away from direct sunlight.",

            "ingredients": [
                {
                    "name": "Unknown",
                    "purpose":
                    "Ingredient information unavailable."
                }
            ]
        }