import sys
import os
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any

# Add parent directory to path so we can import from pipeline.py
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from pipeline import enrich_product
from google import genai
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="UniHack Product Intelligence API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

INPUT_FILE = "Unihack_ Sample Dataset - Input.csv"

class EnrichRequest(BaseModel):
    row: Dict[str, Any]
    api_key: str = ""

@app.get("/api/data")
def get_data(limit: int = 1000):
    if not os.path.exists(INPUT_FILE):
        raise HTTPException(status_code=404, detail="Data file not found")
    df = pd.read_csv(INPUT_FILE, encoding="utf-8")
    return {"data": df.head(limit).to_dict(orient="records")}

@app.post("/api/enrich")
def enrich(request: EnrichRequest):
    row_series = pd.Series(request.row)
    api_key = request.api_key.strip()
    is_demo = (api_key.lower() == "demo")
    
    # Fallback to .env if not provided in UI and not in demo mode
    if not api_key and not is_demo:
        api_key = os.getenv("GEMINI_API_KEY", "").strip()
        
    if not api_key and not is_demo:
        raise HTTPException(status_code=400, detail="Gemini API Key required")
        
    try:
        client = genai.Client(api_key=api_key) if not is_demo else None
        result = enrich_product(row_series, client, is_demo=is_demo)
        return {"success": True, "result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
