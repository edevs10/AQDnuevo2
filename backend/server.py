from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class UserSession(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    birth_year: int
    consent_given: bool
    answers: Dict[str, Any] = Field(default_factory=dict)
    result: Optional[str] = None
    flow_path: Optional[str] = None
    completed: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class UserSessionCreate(BaseModel):
    birth_year: int
    consent_given: bool

class UserSessionUpdate(BaseModel):
    answers: Optional[Dict[str, Any]] = None
    result: Optional[str] = None
    flow_path: Optional[str] = None
    completed: Optional[bool] = None

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# User session endpoints
@api_router.post("/user-session", response_model=UserSession)
async def create_user_session(input: UserSessionCreate):
    session_dict = input.dict()
    session_obj = UserSession(**session_dict)
    await db.user_sessions.insert_one(session_obj.dict())
    return session_obj

@api_router.put("/user-session/{session_id}", response_model=UserSession)
async def update_user_session(session_id: str, update_data: UserSessionUpdate):
    update_dict = {k: v for k, v in update_data.dict().items() if v is not None}
    update_dict['updated_at'] = datetime.utcnow()
    
    result = await db.user_sessions.find_one_and_update(
        {"id": session_id},
        {"$set": update_dict},
        return_document=True
    )
    
    if result:
        return UserSession(**result)
    else:
        raise HTTPException(status_code=404, detail="Session not found")

@api_router.get("/user-session/{session_id}", response_model=UserSession)
async def get_user_session(session_id: str):
    session = await db.user_sessions.find_one({"id": session_id})
    if session:
        return UserSession(**session)
    else:
        raise HTTPException(status_code=404, detail="Session not found")

@api_router.get("/analytics/sessions")
async def get_sessions_analytics():
    """Endpoint para obtener datos analíticos de las sesiones (para fines comerciales)"""
    total_sessions = await db.user_sessions.count_documents({})
    completed_sessions = await db.user_sessions.count_documents({"completed": True})
    
    # Agrupar por año de nacimiento (de forma anónima)
    birth_year_pipeline = [
        {"$group": {"_id": "$birth_year", "count": {"$sum": 1}}},
        {"$sort": {"_id": 1}}
    ]
    birth_year_stats = await db.user_sessions.aggregate(birth_year_pipeline).to_list(100)
    
    # Agrupar por resultados
    result_pipeline = [
        {"$group": {"_id": "$result", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}}
    ]
    result_stats = await db.user_sessions.aggregate(result_pipeline).to_list(100)
    
    return {
        "total_sessions": total_sessions,
        "completed_sessions": completed_sessions,
        "completion_rate": completed_sessions / total_sessions if total_sessions > 0 else 0,
        "birth_year_distribution": birth_year_stats,
        "result_distribution": result_stats
    }

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', 'http://localhost:3000').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
