# Import Dependencies
from flask import Flask, request, jsonify, send_file, send_from_directory
from werkzeug.utils import secure_filename
from flask_cors import CORS
import os 
import re

# Import your custom functions
from models import predict
from utils import extract_text_from_pdf
from NER import extract_entities
from pdf_generator import generate_contract_download

app = Flask(__name__, static_folder="client/build")

CORS(app)

# Ensure the upload folder exists
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {'pdf'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route("/", methods=["GET"])
def serve():
    return send_from_directory(app.static_folder, "index.html")


@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path)


@app.route('/api/get-files', methods=['GET'])
def get_test_files():
    try:
        files = os.listdir("docs")
        pdf_files = [file for file in files if file.lower().endswith('.pdf')]


        return jsonify({"success": True, "data": pdf_files})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

@app.route('/api/process_pdf', methods=['GET','POST'])
def process_pdf():
    if request.method == "POST":
        if 'file' not in request.files:
            return jsonify({"success": False, "message": "No file part"}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({"success": False, "message": "No selected file"}), 400

        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)
        else:
            return jsonify({"success": False, "message": "File type not allowed"}), 400

    elif request.method == "GET":
        filename = request.args.get("filename");
        if not filename:
            return jsonify({"success":False, "message":"No filename provided"}), 400
        filepath = os.path.join("docs", filename)

    if not os.path.exists(filepath):
        return jsonify({"success":False, "message": "File not found"}), 404

    text = extract_text_from_pdf(filepath)


    res = []
    for line in text.splitlines():
        predicted_class = predict(text=line)
        if predicted_class == 6 or re.search(r"\d\s*\.\s*([\w\s]+)\s*:", line):
            entities = []
        else: entities = extract_entities(text=line)
        res.append({"line": line, "entities": entities, "predicted_class": predicted_class})
    return jsonify({"success":True, "data": res, "message":"Successfully Processed!"}), 201

@app.route('/api/compare', methods=['GET','POST'])
def compare_pdf():
    if request.method == "POST":
        if 'file1' not in request.files or 'file1' not in request.files:
            return jsonify({"success": False, "message": "No file part"}), 400
        
        file = request.files['file1']
        file2 = request.files['file2']
        if file.filename == '' or file2.filename == '':
            return jsonify({"success": False, "message": "No selected file"}), 400

        if file and allowed_file(file.filename) and file2 and allowed_file(file2.filename):
            filename = secure_filename(file.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            filename2 = secure_filename(file2.filename)
            filepath2 = os.path.join(app.config['UPLOAD_FOLDER'], filename2)
            file.save(filepath)
            file2.save(filepath2)
        else:
            return jsonify({"success": False, "message": "File type not allowed"}), 400

    elif request.method == "GET":
        filename = request.args.get("filename1");
        filename2 = request.args.get("filename2");
        if not filename or not filename2:
            return jsonify({"success":False, "message":"No filename provided"}), 400

        filepath = os.path.join("docs", filename)
        filepath2 = os.path.join("docs", filename)

        if not os.path.exists(filepath) or not os.path.exists(filepath2) :
            return jsonify({"success":False, "message": "File not found"}), 404

        text = extract_text_from_pdf(filepath)
        text2 = extract_text_from_pdf(filepath2)


        res = [[], []]
        
        for line in text.splitlines():
            predicted_class = predict(text=line)
            if predicted_class == 6 or re.search(r"\d\s*\.\s*([\w\s]+)\s*:", line):
                entities = []
            else: entities = extract_entities(text=line)
            res[0].append({"line": line, "entities": entities, "predicted_class": predicted_class})
        
        for line in text2.splitlines():
            predicted_class = predict(text=line)
            if predicted_class == 6 or re.search(r"\d\s*\.\s*([\w\s]+)\s*:", line):
                entities = []
            else: entities = extract_entities(text=line)
            res[1].append({"line": line, "entities": entities, "predicted_class": predicted_class})

        return jsonify({"success":True, "data": res, "message":"Successfully Processed!"}), 201

@app.route("/api/generate-doc", methods=["POST", "GET"])
def generate_pdf():
    if request.method == "POST":
        data = request.get_json()

        if ('filename' not in data or
            'service_provider_name' not in data or
            'client_name' not in data or
            'amount' not in data or
            'start_date' not in data or
            'state' not in data or
            'notice_days' not in data or
            'end_date' not in data):
            return jsonify({"success": False, "message":"Please FulFill the requirements"}), 401
        filename = data['filename']
        service_provider_name = data['service_provider_name']
        client_name = data['client_name']
        amount = data['amount']
        start_date = data['start_date']
        end_date = data['end_date']
        state = data['state']
        notice_days = data['notice_days']

        file_path = generate_contract_download(False, 
                            filename=filename,
                            service_provider_name=service_provider_name, 
                            client_name=client_name, 
                            amount=amount, 
                            start_date=start_date, 
                            end_date=end_date, 
                            state=state, 
                            notice_days=notice_days);
        

        if not os.path.exists(file_path):
            return jsonify({"success": False, "message": "File not found"}), 404
        else:
            return send_file(file_path, as_attachment=True), 201
        
    elif request.method == "GET":
        filename = request.args.get("filename");
        if not filename:
            return jsonify({"success": False, "message": "Filename is required"}), 400

        file_path = generate_contract_download(True, filename=filename);

        if not os.path.exists(file_path):
            return jsonify({"success": False, "message": "File not found"}), 404
        else:
            return send_file(file_path, as_attachment=True), 201


if __name__ == "__main__":
    app.run(debug=True)
    