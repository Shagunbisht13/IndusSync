import pandas as pd
import numpy as np
import os
import json
from dotenv import load_dotenv
from pydantic import BaseModel, Field
from typing import Optional, List
from google import genai
from google.genai import types

load_dotenv()

# Define file paths
input_file = "Unihack_ Sample Dataset - Input.csv"
output_file = "Unihack_ Expected Output - Delivery Format.csv"
results_file = "enriched_output.csv"

# Pydantic schema for structured output
class ProductEnrichment(BaseModel):
    # Core Fields
    manufacture_name: str = Field(description="Cleaned Manufacturer Name")
    brand_name: str = Field(description="Cleaned Brand Name")
    classpath: str = Field(description="Category path (e.g. Appliances & Consumer Electronics>Kitchen Appliances>Built-In Dishwashers)")
    
    # Descriptions
    invoice_desc: str = Field(description="Invoice Description (≤40 char, ALL CAPS, e.g., DISHWASHER LEG 5 SST 120V 15A 50-1/4IN)")
    mobile_desc: str = Field(description="Mobile Description (60–80 char, e.g., Whirlpool, Dishwasher, Eco Series, WDTS7024RZ)")
    short_desc: str = Field(description="Product Title / Short Desc (Brand + Series + MPN + Item Type + key attributes)")
    long_desc: str = Field(description="Long Description with all specs")
    retail_desc: str = Field(description="Retail Description")
    marketing_desc: str = Field(description="Marketing Description (promotional copy)")
    
    # Key Attributes
    attr_1_label: str = Field(description="Attribute 1 Label (e.g., Voltage Rating)")
    attr_1_value: str = Field(description="Attribute 1 Value (e.g., 120)")
    attr_1_uom: Optional[str] = Field(description="Attribute 1 UOM (e.g., V)")
    
    attr_2_label: str = Field(description="Attribute 2 Label")
    attr_2_value: str = Field(description="Attribute 2 Value")
    attr_2_uom: Optional[str] = Field(description="Attribute 2 UOM")
    
    attr_3_label: str = Field(description="Attribute 3 Label")
    attr_3_value: str = Field(description="Attribute 3 Value")
    attr_3_uom: Optional[str] = Field(description="Attribute 3 UOM")

def enrich_product(row, client, is_demo=False):
    if is_demo:
        import time
        time.sleep(1.5)
        return {
            "manufacture_name": "Whirlpool Corporation",
            "brand_name": "Whirlpool",
            "classpath": "Appliances & Consumer Electronics>Kitchen Appliances>Built-In Dishwashers",
            "invoice_desc": "DISHWASHER BLTLN SST SST 120V 10A 41DBA",
            "mobile_desc": "Whirlpool, Dishwasher, Eco Series, WDTS7024RZ",
            "short_desc": "Whirlpool Eco Series WDTS7024RZ Dishwasher, Built-in Mounting, Stainless Steel",
            "long_desc": "Whirlpool Dishwasher, Eco Series, 120 V, 10 A, Built-in Mounting, 33-7/16 in H x 23-7/8 in W x 22-5/8 in D...",
            "retail_desc": "Eco Series Dishwasher, Built-in Mounting, Stainless Steel",
            "marketing_desc": "Load more and run less with our quietest and largest capacity dishwasher.",
            "attr_1_label": "Voltage Rating",
            "attr_1_value": "120",
            "attr_1_uom": "V",
            "attr_2_label": "Amperage Rating",
            "attr_2_value": "10",
            "attr_2_uom": "A",
            "attr_3_label": "Sound Level",
            "attr_3_value": "41",
            "attr_3_uom": "dBA"
        }
        
    prompt = f"""
    You are an expert product data enrichment assistant for industrial distributors.
    Given the following raw product data, generate the structured output following Unilog guidelines.
    
    Input Data:
    - Manufacturer Part Number (Mfg_Part_Num): {row.get('Mfg_Part_Num', '')}
    - Part Description (Part_Desc): {row.get('Part_Desc', '')}
    - E1 Brand: {row.get('E1_Brand', '')}
    - Unilog Brand: {row.get('Unilog_Brand', '')}
    - DIB Brand: {row.get('DIB_Brand', '')}
    - Part Manufacturer: {row.get('Part_Manuf', '')}
    
    Note: Treat "-- Unbranded --", "-- No Unilog Brand --" and "-- No DIB Brand --" as empty.
    
    Generate the normalized manufacturer name, descriptions of various lengths and casings, and extract up to 3 key attributes.
    """
    
    response = client.models.generate_content(
        model='gemini-3.6-flash',
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=ProductEnrichment,
            temperature=0.1
        ),
    )
    
    return json.loads(response.text)

def run_pipeline(limit=5):
    if not os.path.exists(input_file):
        print(f"File {input_file} not found.")
        return
        
    df_in = pd.read_csv(input_file, encoding='utf-8')
    
    # Check for API key
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        print("GEMINI_API_KEY not found in environment. Please add it to a .env file.")
        return
        
    client = genai.Client()
    
    results = []
    
    # Process only the first few items for the prototype
    for idx, row in df_in.head(limit).iterrows():
        print(f"Processing item {idx+1}/{limit}: {row.get('Mfg_Part_Num')}...")
        try:
            enriched_data = enrich_product(row, client)
            # Add original data
            enriched_data['Original_MPN'] = row.get('Mfg_Part_Num')
            results.append(enriched_data)
        except Exception as e:
            print(f"Error processing item {idx}: {e}")
            
    df_results = pd.DataFrame(results)
    df_results.to_csv(results_file, index=False)
    print(f"\nPipeline complete. Processed {len(results)} items.")
    print(f"Results saved to {results_file}")

if __name__ == "__main__":
    run_pipeline(limit=3)
