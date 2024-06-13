# Import Dependencies
from models import predict
from utils import extract_text_from_pdf
from NER import extract_entities

while True:
    filename = input("Enter Document Name:")
    if filename == "exit":
        break
    filepath = "docs/"+filename+".pdf"
    text = extract_text_from_pdf(filepath)
    res = []
    for line in text.splitlines():
        predicted_class = predict(text=text)
        entities = extract_entities(text=text)
        res.append([line, entities, predicted_class])
    print(res)
