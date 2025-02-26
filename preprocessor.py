
import pandas as pd
import re
from spellchecker import SpellChecker

df = pd.read_csv("healthcare_dataset.csv")

spell = SpellChecker()


def clean_text(text):
    if pd.isnull(text):  
        return ""
    
    text = text.lower() 
    text = re.sub(r'[^a-z\s]', '', text)  
    text = re.sub(r'\s+', ' ', text).strip()  
    corrected_text = " ".join([spell.correction(word) or word for word in text.split()])  
    return corrected_text


if "Medical Condition" in df.columns:
    df["Medical Condition"] = df["Medical Condition"].apply(clean_text)
else:
    print("Column 'Medical Condition' not found. Available columns:", df.columns)


df.to_csv("cleaned_healthcare_dataset.csv", index=False)
print("Preprocessing completed. Cleaned dataset saved as 'cleaned_healthcare_dataset.csv'.")
