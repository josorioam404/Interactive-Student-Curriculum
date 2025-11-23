from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import health, student, curriculum, admin

app = FastAPI(title="Interactive Curriculum - Python Backend", version="1.0.0")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:8080",
    ],
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

