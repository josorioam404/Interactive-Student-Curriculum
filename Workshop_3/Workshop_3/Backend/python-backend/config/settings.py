from pydantic import BaseModel
from typing import List

class Settings(BaseModel):
    APP_TITLE: str = "Interactive Curriculum - Python Backend"
    APP_VERSION: str = "1.0.0"
    
    CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://localhost:8080",
    ]

settings = Settings()
