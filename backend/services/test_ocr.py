# test_ocr.py

#from services.ocr_service import extract_text
from ocr_service import extract_text
print(
    extract_text(
        "../uploads/cheese.jpg"
    )
)