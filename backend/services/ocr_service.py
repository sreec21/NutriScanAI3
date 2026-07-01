import pytesseract
from PIL import Image, ImageEnhance, ImageFilter

pytesseract.pytesseract.tesseract_cmd = (
    r"C:\Program Files\Tesseract-OCR\tesseract.exe"
)

def extract_text(image_path):

    image = Image.open(image_path)

    # enlarge image
    image = image.resize(
        (image.width * 3, image.height * 3)
    )

    # grayscale
    image = image.convert("L")

    # sharpen
    image = image.filter(
        ImageFilter.SHARPEN
    )

    # increase contrast
    enhancer = ImageEnhance.Contrast(image)
    image = enhancer.enhance(2)

    text = pytesseract.image_to_string(
        image,
        config="--psm 6"
    )

    return text