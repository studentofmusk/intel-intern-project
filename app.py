# Import Dependencies
from flask import Flask, request, jsonify
import os 
from flask_cors import CORS

# Import your custom functions
from models import predict
from utils import extract_text_from_pdf
from NER import extract_entities

app = Flask(__name__)
CORS(app)

@app.route('/get-files', methods=['GET'])
def get_test_files():
    try:
        files = os.listdir("docs")
        return jsonify({"success": True, "data": files})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500


@app.route('/process_pdf', methods=['POST'])
def process_pdf():
    data = request.get_json()
    if 'filename' not in data:
        return jsonify({"success":False, "message":"No filename provided"}), 400
    
    filename = data['filename']
    filepath = os.path.join("docs", filename)

    if not os.path.exists(filepath):
        return jsonify({"success":False, "message": "File not found"}), 404

    text = extract_text_from_pdf(filepath)

    res = []
    for line in text.splitlines():
        predicted_class = predict(text=line)
        entities = extract_entities(text=line)
        res.append({"line": line, "entities": entities, "predicted_class": predicted_class})
    return jsonify({"success":True, "data": res, "message":"Successfully Processed!"})


if __name__ == "__main__":
    app.run(debug=True)
