import torch
from torch.utils.data import DataLoader
from torch.optim import lr_scheduler, AdamW
from torch.utils.data import Dataset, DataLoader
from transformers import BertForSequenceClassification
from transformers import BertTokenizer
from sklearn.model_selection import train_test_split
import pandas as pd 

# Read the dataset
df = pd.read_csv("data/train.csv")

# Train and Test data split
train_df, val_df = train_test_split(df, test_size=0.2, random_state=42, stratify=df.label)

# Load Bert Tokenizer
tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")

# Tokenize  the input text 
def tokenize_function(texts):
    return tokenizer(
        texts.tolist(),
        padding=True,
        truncation=True,
        max_length=128,
        return_tensors='pt'
    )

train_texts = train_df['features'].values
val_texts = val_df['features'].values

train_encodings = tokenize_function(train_texts)
val_encodings = tokenize_function(val_texts)


class ContractDataset(Dataset):
    def __init__(self, encodings, labels):
        self.encodings = encodings
        self.labels = labels

    def __getitem__(self, idx):
        item = {key:val[idx] for key, val in self.encodings.items()}
        item['label'] = torch.tensor(self.labels[idx])
        return item

    def __len__(self):
        return len(self.labels)

train_labels = train_df['label'].values
val_labels = val_df['label'].values

train_dataset = ContractDataset(train_encodings, train_labels)
val_dataset = ContractDataset(val_encodings, val_labels)


# Load the Bert model of sequence classification
model = BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=7)

train_loader = DataLoader(
    dataset=train_dataset,
    batch_size=8,
    shuffle=True
)
val_loader = DataLoader(
    dataset=val_dataset,
    batch_size=8,
    shuffle=False
)

# Define optimizer and learning rate scheduler
optimizer = AdamW(model.parameters(), lr=5e-5)
scheduler = lr_scheduler.StepLR(optimizer, step_size=1, gamma=0.1)

# Move model to GPU if available
device = torch.device('cuda') if torch.cuda.is_available() else torch.device('cpu')
model.to(device)


# Training Loop
NUM_EPOCHS = 5
for epoch in range(NUM_EPOCHS):
    model.train()
    total_loss = 0
    for batch in train_loader:
        optimizer.zero_grad()
        input_ids = batch['input_ids'].to(device)
        attention_mask = batch['attention_mask'].to(device)
        labels = batch['label'].to(device)
        outputs = model(input_ids=input_ids, attention_mask=attention_mask, labels=labels)
        loss = outputs.loss
        total_loss += loss.item()
        loss.backward()
        optimizer.step()
    scheduler.step()
    avg_train_loss = total_loss/len(train_loader)
    print(f"Epoch {epoch + 1}, Loss: {avg_train_loss}")

# Validation Loop
model.eval()
correct = 0
total = 0
with torch.no_grad():
    for batch in val_loader:
        input_ids = batch['input_ids'].to(device)
        attention_mask = batch['attention_mask'].to(device)
        labels = batch['label'].to(device)

        output = model(input_ids=input_ids, attention_mask=attention_mask)
        _, predicted = torch.max(output.logits, 1)
        total += labels.size(0)
        correct += (predicted == labels).sum().item()
accuracy = correct / total
print(f"Validation Accuracy:{accuracy:.4f}")

# Save the fine-tuned model and tokenizer
"""
model_save_path = './fine_tuned_bert'
model.save_pretrained(model_save_path)
tokenizer.save_pretrained(model_save_path)

print(f"Model saved to {model_save_path}")
"""