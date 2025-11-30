from pydantic import BaseModel
from typing import List
import os

class Settings(BaseModel):
    APP_TITLE: str = "Interactive Curriculum - Python Backend"
    APP_VERSION: str = "1.0.0"
    
    CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://localhost:8080",
        "http://54.89.37.108:5173",  
        os.getenv("FRONTEND_URL", "http://54.89.37.108:5173")  
    ]

settings = Settings()
