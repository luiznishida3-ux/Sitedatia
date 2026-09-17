from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel
from typing import Optional
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")


class Lead(BaseModel):
    name: str
    phone: str
    area: Optional[str] = None
    message: Optional[str] = None


@api_router.get("/")
async def root():
    return {"message": "Nishida Advocacia API"}


@api_router.get("/site")
async def get_site():
    doc = await db.site_data.find_one({"key": "place"}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Dados do site ainda não coletados")
    doc.pop("key", None)
    doc["social"] = {
        "facebook": os.environ.get("SOCIAL_FACEBOOK", ""),
        "instagram": os.environ.get("SOCIAL_INSTAGRAM", ""),
    }
    return doc


@api_router.post("/leads")
async def create_lead(lead: Lead):
    doc = lead.model_dump()
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    await db.leads.insert_one(doc)
    return {"ok": True}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
