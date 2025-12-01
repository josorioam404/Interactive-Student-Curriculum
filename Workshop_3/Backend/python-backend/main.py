from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import health, student, curriculum, admin
import os

app = FastAPI(title="Interactive Curriculum - Python Backend", version="1.0.0")

# CORS Configuration - supports both development and production
origins = [
    "http://localhost:5173",           # Local development frontend
    "http://localhost:8080",           # Local development Java backend
    "http://54.89.37.108:5173",        # Production EC2 frontend
    os.getenv("FRONTEND_URL", "http://54.89.37.108:5173")  # Override via env var
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(health.router, tags=["Health"])
app.include_router(student.router, prefix="/api/student", tags=["Student"])
app.include_router(curriculum.router, prefix="/api/curriculum", tags=["Curriculum"])
app.include_router(admin.router, prefix="/api", tags=["Admin"])

@app.get("/")
def read_root():
    return {
        "message": "Python Backend is running!",
        "service": "Interactive Student Curriculum API",
        "version": "1.0.0"
    }

