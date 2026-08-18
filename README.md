# AI-Powered Industrial Product Intelligence

This repository contains an end-to-end prototype for automating the creation, enrichment, and validation of industrial product data, developed for **UniHack**.

The solution transforms fragmented, messy inputs into structured, commerce-ready information by extracting key attributes and generating specialized product descriptions (Invoice, Mobile, Short, Long, and Retail) strictly according to provided guidelines.

## Features
- **Data Parsing**: Handles messy supplier strings and extracts relevant fields.
- **AI Enrichment**: Utilizes Google's Gemini 2.5 Flash to automatically extract constraints, generate canonical fields, and strictly enforce character lengths and casing rules.
- **Structured Output**: Maps the generated data perfectly to the required 250+ column Delivery Format schema.
- **Evaluation Engine**: Scripts to automatically score the generated output against the ground-truth guidelines.
- **Interactive UI**: A Streamlit application built for rapid demo recording and showcasing the pipeline in action.

## Setup Instructions

1. **Clone the repository and set up a virtual environment**
   ```bash
   python -m venv venv
   # On Windows
   .\venv\Scripts\activate
   # On macOS/Linux
   source venv/bin/activate
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure the Environment**
   Rename `.env.example` to `.env` and add your Gemini API Key:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```

## Usage

### Run the Demo Application (Streamlit)
To visualize the pipeline in action and easily record a demo video, run the Streamlit app:
```bash
streamlit run app.py
```
This will open an interactive web dashboard where you can process individual rows and inspect the AI-generated JSON.

### Run the Pipeline (CLI)
To run the automated enrichment pipeline over the CSV datasets directly in the terminal:
```bash
python pipeline.py
```
This script reads from `Unihack_ Sample Dataset - Input.csv` and outputs to `enriched_output.csv`.

### Evaluate Results
To check your generated results against the Delivery Format constraints (like Invoice description character limits):
```bash
python evaluate.py
```

## Structure
- `app.py`: The Streamlit web dashboard.
- `pipeline.py`: The core LLM-based data processing logic.
- `evaluate.py`: Evaluation metrics and validation checks.
- `requirements.txt`: Python package dependencies.
- `.env.example`: Template for environment variables.
