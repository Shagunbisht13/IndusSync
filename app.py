import streamlit as st
import pandas as pd
import os
from pipeline import enrich_product, ProductEnrichment
from google import genai

st.set_page_config(page_title="IndusSync", layout="wide")

st.title("IndusSync: AI-Powered Industrial Product Intelligence")
st.markdown("Transform fragmented product inputs into structured, commerce-ready information.")

# Sidebar for config
st.sidebar.header("Configuration")
api_key = st.sidebar.text_input("Gemini API Key", type="password")

input_file = "Unihack_ Sample Dataset - Input.csv"

@st.cache_data
def load_data():
    if os.path.exists(input_file):
        return pd.read_csv(input_file, encoding='utf-8')
    return pd.DataFrame()

df = load_data()

if df.empty:
    st.warning(f"Could not load {input_file}. Please ensure it is in the same directory.")
else:
    st.subheader("1. Input Data Explorer")
    st.dataframe(df.head(50))
    
    st.subheader("2. Enrichment Pipeline")
    
    # Select a row to process
    row_idx = st.number_input("Select row index to process", min_value=0, max_value=len(df)-1, value=0)
    selected_row = df.iloc[row_idx]
    
    st.write("Selected Input:")
    st.json(selected_row.to_dict())
    
    if st.button("Run Enrichment"):
        is_demo = (api_key.lower() == "demo")
        if not api_key and not is_demo:
            st.error("Please enter your Gemini API Key in the sidebar.")
        else:
            with st.spinner("Enriching product using Gemini..."):
                try:
                    # Setup client
                    client = genai.Client(api_key=api_key) if not is_demo else None
                    
                    # Run logic
                    result = enrich_product(selected_row, client, is_demo=is_demo)
                    
                    st.success("Enrichment Complete!")
                    
                    col1, col2 = st.columns(2)
                    
                    with col1:
                        st.markdown("### Generated Descriptions")
                        st.text_input("Product Title", value=result.get("short_desc", ""))
                        st.text_area("Long Description", value=result.get("long_desc", ""), height=100)
                        st.text_input("Mobile Description", value=result.get("mobile_desc", ""))
                        st.text_input("Invoice Description", value=result.get("invoice_desc", ""))
                        st.text_input("Retail Description", value=result.get("retail_desc", ""))
                        
                    with col2:
                        st.markdown("### Extracted Attributes & Specs")
                        st.text_input("Manufacturer", value=result.get("manufacture_name", ""))
                        st.text_input("Brand", value=result.get("brand_name", ""))
                        st.text_input("Classpath", value=result.get("classpath", ""))
                        
                        st.markdown("#### Key Attributes")
                        for i in range(1, 4):
                            lbl = result.get(f"attr_{i}_label")
                            val = result.get(f"attr_{i}_value")
                            uom = result.get(f"attr_{i}_uom")
                            if lbl and val:
                                uom_str = f" {uom}" if uom else ""
                                st.write(f"- **{lbl}**: {val}{uom_str}")
                                
                    st.markdown("### Full JSON Output")
                    st.json(result)
                    
                except Exception as e:
                    st.error(f"Error during enrichment: {e}")
