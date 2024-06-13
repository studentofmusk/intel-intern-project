from typing import List
import spacy

# Load spaCy's English model 
nlp = spacy.load("en_core_web_sm")


def extract_details(text:str) -> List[List[str]]:
    doc = nlp(text)

    # # Initialize dictionaries to store extracted details
    # details = {
    #     'services_provided': [],
    #     'payment': [],
    #     'term': [],
    #     'confidentiality': [],
    #     'termination': [],
    #     'governing_law': [],
    #     'parties': []
    # }

    # Iterate through entities recognized by spaCy
    # for ent in doc.ents:
    #     if ent.label_ in ('ORG', 'PERSON'):
    #         details['parties'].append(ent.text)
    #     elif ent.label_ == 'DATE':
    #         details['term'].append(ent.text)
    #     elif ent.label_ == 'MONEY':
    #         details['payment'].append(ent.text)
    #     elif 'service' in ent.text.lower():
    #         details['services_provided'].append(ent.text)
    #     elif 'confidential' in ent.text.lower() or 'proprietary' in ent.text.lower():
    #         details['confidentiality'].append(ent.text)
    #     elif 'termination' in ent.text.lower() or 'terminate' in ent.text.lower():
    #         details['termination'].append(ent.text)
    #     elif 'law' in ent.text.lower() or 'state' in ent.text.lower():
    #         details['governing_law'].append(ent.text)
    
    # return details

    
    entities = []
    for ent in doc.ents:
        entities.append([ent.text, ent.label_])
    return entities



if __name__ == "__main__":
    # Example text for extraction
    example_text = """Cole LLC agrees to provide the following services to Hines, Munoz and Dennis. Services are service1, service2, service3.
    Hines, Munoz and Dennis agrees to pay Cole LLC the amount of $36777 for the services described above. Payment shall be made within 66 days of receiving an invoice from Cole LLC.
    This contract will commence on 2024-03-01 and will continue until 2024-01-17 unless terminated earlier in accordance with the Termination clause.
    Both parties agree to maintain the confidentiality of any proprietary or confidential information disclosed during the term of this contract. This obligation will continue beyond the termination of this contract.
    Either party may terminate this contract with 66 days written notice to the other party. In the event of termination, Cole LLC will be compensated for all services performed up to the date of termination.
    This contract shall be governed by and construed in accordance with the laws of the State of Nebraska.
    Cole LLC
    Hines, Munoz and Dennis"""
    
    
    extracted_details = extract_details(example_text)
    print(extracted_details)