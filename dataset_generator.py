import pandas as pd
from pandas import DataFrame
from faker import Faker
import os
# classes = {
#     0: "Services Provided", 
#     1: "Payment", 
#     2: "Term", 
#     3: "Confidentiality", 
#     4: "Termination", 
#     5: "Governing Law", 
#     6: "Signatures"
# }

fake: Faker = Faker()

# Creating Dataset using Faker 
def generate_data() -> DataFrame:
    # generate random details
    service_provider_name = fake.company()
    client_name = fake.company()
    amount = fake.random_number(digits=5)
    start_date = fake.date_this_year()
    end_date = fake.date_this_year()
    state = fake.state()
    notice_days = fake.random_int(min=30, max=90)

    # Contract text template
    datasets =[
        [f"{service_provider_name} agrees to provide the following services to {client_name}. services are service1 service2, service3.", 0],
        [f"{client_name} agrees to pay {service_provider_name} the amount of ${amount} for the services described above. Payment shall be made within {notice_days} days of receiving an invoice from {service_provider_name}.", 1],
        [f"This contract will commence on {start_date} and will continue until {end_date} unless terminated earlier in accordance with the Termination clause.", 2],
        [f"Both parties agree to maintain the confidentiality of any proprietary or confidential information disclosed during the term of this contract. This obligation will continue beyond the termination of this contract.", 3],
        [f"Either party may terminate this contract with {notice_days} days written notice to the other party. In the event of termination, {service_provider_name} will be compensated for all services performed up to the date of termination.", 4],
        [f"This contract shall be governed by and construed in accordance with the laws of the State of {state}.", 5],
        [f"{service_provider_name}", 6],
        [f"{client_name}", 6]
    ]

    return pd.DataFrame(datasets)

def generate_dataset(filename:str, batch_size:int=10) -> None:
    all_df = []
    for i in range(batch_size):
        all_df.append(generate_data())

    df_concat = pd.concat(all_df)
    df_concat.columns = ["features", "label"]
    file_path = os.path.join("data", filename)
    df_concat.to_csv(file_path, index=False)


if __name__ == "__main__":
    generate_dataset("test.csv", 10)
    generate_dataset("eval.csv", 10)
    print("Generated Successfully!")