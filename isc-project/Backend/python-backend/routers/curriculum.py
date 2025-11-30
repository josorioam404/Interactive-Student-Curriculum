from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from dependencies.auth import get_current_user_id
from services.curriculum_service import calculate_available_subjects
from utils.file_processors import process_curriculum_file

router = APIRouter()

@router.get("/available-subjects")
def get_available_subjects(user_id: int = Depends(get_current_user_id)):
    """Get available subjects for a student based on their progress."""
    subjects = calculate_available_subjects(user_id)
    return {"userId": user_id, "data": subjects}

@router.post("/upload")
async def upload_curriculum(file: UploadFile = File(...)):
    """Process curriculum file upload from Java backend."""
    return await process_curriculum_file(file)
