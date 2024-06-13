import fitz  # PyMuPDF

def extract_text_from_pdf(pdf_path:str) -> str:
    # Open the pdf
    doc = fitz.open(pdf_path)
    text = ""

    # Iterate over each page 
    for page_num in range(doc.page_count):
        page = doc.load_page(page_num) # Load the page
        text += page.get_text() # Extract text from the page
    
    return text

if __name__=="__main__":
    pdf_path = "docs/Contract_0.pdf" # Replace with your PDF file path
    extracted_text = extract_text_from_pdf(pdf_path)
    print(extracted_text)
