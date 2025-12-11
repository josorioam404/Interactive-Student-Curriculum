from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from dependencies.auth import get_current_user_id
from services.curriculum_service import calculate_available_subjects
from utils.file_processors import process_curriculum_file

router = APIRouter()


@router.post("/upload")
async def upload_curriculum(file: UploadFile = File(...)):
    """Process curriculum file upload from Java backend."""
    return await process_curriculum_file(file)
