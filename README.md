# Business Contract Validation 

This project focuses on validating business contracts by classifying the content within contract clauses and identifying deviations from a given template.

## Installation

### Step 1:

- Download Fine Tuned Bert Model from - [Here!](https://drive.google.com/file/d/1_7TZTpfvDKQvToh3lSMHVFOjRntIm_iJ/view?usp=sharing)

### Step 2:

- Extract the downloaded **`fine_tuned_bert.zip`** in the root folder and ensure that whether the folder is not recursively present more than once.

### Step 3:

-  Ensure your pc has `python version >= 3.8`

### Step 4:

- open your `Terminal` or `Powershell` and run `pip install -r requirements.txt` 

### Step 5:
- To start server run `python app.py` or `flask run`

## Host :
now you can see the website at port [5000](http://localhost:5000/)








    
## Deployment


### Important

- Download Fine Tuned Bert Model from - [Here!](https://drive.google.com/file/d/1_7TZTpfvDKQvToh3lSMHVFOjRntIm_iJ/view?usp=sharing)

- Extract the downloaded **`fine_tuned_bert.zip`** in the root folder and ensure that whether the folder is not recursively present more than once.
---


### Deploy with Docker

To build Image 
```bash
  docker build -t dodocs .
```

To create Container and Run the container

```bash
docker run -d -p 5000:5000 --name do-docs-container do-docs
```


## Authors

- [@Farooq Khan](https://www.github.com/studentofmusk)

