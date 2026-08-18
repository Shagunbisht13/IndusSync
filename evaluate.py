import pandas as pd
import os

generated_file = "enriched_output.csv"
expected_file = "Unihack_ Expected Output - Delivery Format.csv"

def evaluate_results():
    if not os.path.exists(generated_file):
        print(f"File {generated_file} not found. Run pipeline.py first.")
        return
        
    df_gen = pd.read_csv(generated_file)
    df_exp = pd.read_csv(expected_file)
    
    print(f"Generated shape: {df_gen.shape}")
    print(f"Expected shape: {df_exp.shape}")
    
    # Simple check for Invoice Desc length
    print("\n--- Evaluation Metrics ---")
    
    if 'invoice_desc' in df_gen.columns:
        valid_invoice_desc = df_gen['invoice_desc'].apply(lambda x: len(str(x)) <= 40 and str(x).isupper())
        print(f"Invoice Desc Compliance (<=40 chars & UPPERCASE): {valid_invoice_desc.mean() * 100:.2f}%")
        
    if 'mobile_desc' in df_gen.columns:
        valid_mobile_desc = df_gen['mobile_desc'].apply(lambda x: 60 <= len(str(x)) <= 80)
        print(f"Mobile Desc Compliance (60-80 chars): {valid_mobile_desc.mean() * 100:.2f}%")
        
    print("\nEvaluation complete.")

if __name__ == "__main__":
    evaluate_results()
