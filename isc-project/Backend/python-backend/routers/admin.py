from fastapi import APIRouter

router = APIRouter()

@router.get("/subjects/search")
def search_subjects(query: str):
    """Search subjects by code or name."""
    return {
        "results": [
            {
                "code": "FISG1001",
                "name": "Fundamentos de Física I",
                "credits": 4,
                "prerequisites": []
            }
        ]
    }

@router.get("/subjects/{code}")
def get_subject(code: str):
    """Get detailed information about a specific subject."""
    return {
        "code": code,
        "name": "Fundamentos de Física I",
        "credits": 4,
        "type": "Required",
        "semester": 1,
        "prerequisites": []
    }

@router.put("/subjects/{code}")
def update_subject(code: str, subject: dict):
    """Update subject information."""
    return {
        "success": True,
        "message": f"Subject {code} updated successfully",
        "subject": subject
    }
