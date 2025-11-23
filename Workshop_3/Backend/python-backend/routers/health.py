from fastapi import APIRouter
from database.db import get_connection

router = APIRouter()

@router.get("/health")
def health_check():
    """Health check endpoint for monitoring."""
    try:
        conn = get_connection()
        conn.close()
        db_status = "connected"
    except Exception as e:
        db_status = f"error: {str(e)}"
    
    return {
        "status": "healthy",
        "database": db_status
    }
