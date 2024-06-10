from flask import Flask, request, jsonify, send_file
import spacy
import pdfplumber

app = Flask(__name__)

# Load spaCy model
nlp = spacy.load("en_core_web_sm")
@app.route('/')
def index():
    return send_file('index.html')

@app.route('/parse_pdf', methods=['POST'])
def parse_pdf():
    # Check if a PDF file was sent in the request
    if 'file' not in request.files:
        print(request.files)
        return jsonify({'error': 'No file part'})
    
    pdf_file = request.files['file']
    
    # Check if the file is a PDF
    if pdf_file.filename.endswith('.pdf'):
        # Read the PDF file and extract text
        with pdfplumber.open(pdf_file) as pdf:
            pdf_text = ""
            for page in pdf.pages:
                pdf_text += page.extract_text()
        
        # Process the text using spaCy for named entity recognition
        doc = nlp(pdf_text)
        
        # Extract entities and their labels
        entities = [(ent.text, ent.label_) for ent in doc.ents]
        entities_dict = {'entities': []}
        
        # Convert entities to dictionary for JSON response
        check = []
        for text, label in entities:
            if text not in check:
                if label in ['PERSON', 'ORG', 'DATE', 'GPE', 'MONEY', 'PHONE', 'EMAIL']:
                    entities_dict['entities'].append({'text': text, 'label': label})
                check.append(text)
        
        # Return JSON response
        return jsonify(entities_dict)
    else:
        return jsonify({'error': 'Invalid file format'})

if __name__ == '__main__':
    app.run(debug=True)
