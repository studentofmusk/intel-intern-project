from faker import Faker
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer

import os

fake: Faker = Faker()

# Creating Contract Text using Faker 
def generate_contract_text() -> str:
    # generate random details
    service_provider_name = fake.company()
    client_name = fake.company()
    amount = fake.random_number(digits=5)
    start_date = fake.date_this_year()
    end_date = fake.date_this_year()
    state = fake.state()
    notice_days = fake.random_int(min=30, max=90)

    # Contract text template
    contract_text:str = f"""
    Business Contract

    1. Services Provided:
    {service_provider_name} agrees to provide the following services to {client_name}. services are service1, service2, service3.

    2. Payment:
    {client_name} agrees to pay {service_provider_name} the amount of ${amount} for the services described above. Payment shall be made within {notice_days} days of receiving an invoice from {service_provider_name}.

    3. Term:
    This contract will commence on {start_date} and will continue until {end_date} unless terminated earlier in accordance with the Termination clause.

    4. Confidentiality:
    Both parties agree to maintain the confidentiality of any proprietary or confidential information disclosed during the term of this contract. This obligation will continue beyond the termination of this contract.

    5. Termination:
    Either party may terminate this contract with {notice_days} days written notice to the other party. In the event of termination, {service_provider_name} will be compensated for all services performed up to the date of termination.

    6. Governing Law:
    This contract shall be governed by and construed in accordance with the laws of the State of {state}.

    7. Signatures:

    {service_provider_name}
    
    Date: ____________________

    {client_name}
    Date: ____________________
    """

    return contract_text


# Creating File by go through all documents
def get_file_name(directory:str) -> str:
    last_number:int = 0
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".pdf"):
                if last_number <= int(file[-5]):
                    last_number = int(file[-5]) + 1
        return os.path.join(root, f"Contract_{last_number}.pdf")

# Generate PDF with nice Alignment
def create_pdf(file_name:str, contract_text:str) -> None:
    # Create a PDF file
    doc = SimpleDocTemplate(
        filename=file_name,
        pagesize=letter,
        rightMargin=40, 
        leftMargin=40, 
        topMargin=40, 
        bottomMargin=40
        )
    
    # Add the contract text to PDF
    styles = getSampleStyleSheet() 
    content = []
    
    for line in contract_text.splitlines():
        content.append(Paragraph(line, styles["Normal"]))
        content.append(Spacer(1, 12))

    # save the PDF
    doc.build(content)


def generate_contract() -> str:
    docs_dir:str = "docs"
    file_name:str = get_file_name(docs_dir)
    generated_text:str = generate_contract_text()
    create_pdf(
        file_name=file_name,
        contract_text=generated_text
        )
    return os.path.basename(file_name)

if __name__=="__main__":
    print("PDF Generated Successfully!\nFilename:",
    generate_contract()
    )