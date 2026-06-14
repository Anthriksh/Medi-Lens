from fastapi import FastAPI, UploadFile, File
import shutil
import os
from fastapi.middleware.cors import CORSMiddleware
from gemini_service import analyze_medicine

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@app.get("/")
def root():
    return {
        "message": "MediLens AI Running"
    }


@app.post("/scan")
async def scan_medicine(file: UploadFile = File(...)):

    try:

        # Save uploaded image
        filepath = os.path.join(
            UPLOAD_DIR,
            file.filename
        )

        with open(filepath, "wb") as buffer:
            shutil.copyfileobj(
                file.file,
                buffer
            )
            image = Image.open(filepath)
            analysis = analyze_medicine(image)




        # AI Analysis
        analysis = analyze_medicine(
            extracted_text
        )

        return {
            "success": True,
            "ocr_text": extracted_text,
            "analysis": analysis
        }

    except Exception as e:

        return {
            "success": False,
            "error": str(e)
        }