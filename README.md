<div align="center">
  <br />
  <h1>🚀 IndusSync</h1>
  <p><strong>AI-Powered Industrial Product Intelligence</strong></p>
  <p>Transform fragmented, messy supplier data into structured, commerce-ready information.</p>
  <br />
</div>

## 📖 Overview

**IndusSync** is an end-to-end prototype designed to automate the creation, enrichment, and validation of industrial product data. Developed for **UniHack**, it acts as a bridge between raw supplier spreadsheets and production-ready PIM (Product Information Management) systems.

By leveraging Google's Gemini 2.5 Flash, IndusSync parses complex strings, automatically extracts exact specifications, and enforces strict validation rules (like character limits and casing for invoice systems) to map perfectly to a 250+ column Delivery Format schema.

---

## ✨ Key Features

- **🧠 AI Enrichment Studio**: Utilizes LLMs to automatically parse constraints, generate canonical fields, and strictly enforce character lengths and casing rules.
- **📊 Interactive Data Health Dashboard**: A stunning, premium React-based frontend providing a bird's-eye view of catalog health, errors, and enrichment progress.
- **🔄 Automated Pipeline**: Command-line tools for batch-processing massive CSV datasets.
- **📏 Evaluation Engine**: Built-in validation scripts that score the generated output against ground-truth guidelines.
- **📂 AI Category Organizer**: Intelligently maps vendor-specific folders into your master store taxonomy.

---

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Lucide Icons, Custom CSS (Glassmorphism UI)
- **Backend/API:** Python, FastAPI
- **AI Processing:** Google GenAI SDK (Gemini)
- **Prototyping:** Streamlit (Alternative lightweight dashboard)

---

## 🚀 Getting Started

### 1. Prerequisites & Environment Setup

Clone the repository and set up a virtual environment for the backend services:

```bash
python -m venv venv
# On Windows
.\venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate
```

Install the required Python dependencies:
```bash
pip install -r requirements.txt
```

Set up your environment variables:
Rename `.env.example` to `.env` and add your Gemini API Key:
```env
GEMINI_API_KEY=your_actual_api_key_here
```

### 2. Running the Premium Web Dashboard (React + FastAPI)

IndusSync features a beautiful React frontend backed by a FastAPI server.

**Start the Backend API:**
```bash
python backend/main.py
```
*(Runs on `http://localhost:8000`)*

**Start the Frontend:**
Open a new terminal window, navigate to the `frontend` folder, and start the development server:
```bash
cd frontend
npm install
npm run dev
```
*(Runs on `http://localhost:5173`)*

### 3. Alternative: Running the Streamlit App

If you prefer the lightweight Streamlit dashboard for rapid prototyping:
```bash
streamlit run app.py
```

### 4. Running the CLI Pipeline & Evaluator

To run the automated enrichment pipeline over the CSV datasets directly in the terminal without a UI:
```bash
python pipeline.py
```
*Outputs to `enriched_output.csv`.*

To evaluate the generated results against the strict Delivery Format constraints:
```bash
python evaluate.py
```

---

## 📁 Repository Structure

- `frontend/` - The React/Vite premium web application UI.
- `backend/` - The FastAPI server exposing the enrichment endpoints.
- `app.py` - The Streamlit interactive dashboard.
- `pipeline.py` - The core LLM-based data processing logic.
- `evaluate.py` - Evaluation metrics and validation checks.
- `IndusSync_Presentation.md` - Pitch deck / presentation outline for UniHack.
