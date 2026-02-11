import sys
from PIL import Image
import pytesseract

pytesseract.pytesseract.tesseract_cmd = '/usr/bin/tesseract'

img = Image.open(sys.argv[1])

operations = pytesseract.image_to_string(
    img, config="--psm 6 -c tessedit_char_whitelist=0123456789+-x÷*X/")

result = 0

for operation in operations.splitlines():
    operation = operation.replace(" ", "").replace(
        "q", "9").replace("%", "7").replace("Q", "9").strip()
    print(operation)
    symbol = operation[0]
    number = int(operation[1:])

    if symbol == '+':
        result += number
    elif symbol == '-':
        result -= number
    elif symbol == 'x':
        result *= number
    elif symbol == '÷':
        result //= number

print(result)


