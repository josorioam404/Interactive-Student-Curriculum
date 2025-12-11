from fastapi import APIRouter, Depends, HTTPException
from typing import Optional
from dependencies.auth import get_current_user_id
from services.student_service import StudentService
from models.responses import StudentCurriculumResponse, ProgressSummaryResponse

router = APIRouter()
student_service = StudentService()


@router.get("/curriculum", response_model=StudentCurriculumResponse)
def get_student_curriculum(user_id: int = Depends(get_current_user_id)):
    """Get complete curriculum for the student's selected program."""
    return student_service.get_student_curriculum(user_id)


@router.get("/progress-summary", response_model=ProgressSummaryResponse)
def get_progress_summary(user_id: int = Depends(get_current_user_id)):
    """Get summary statistics for student progress."""
    return student_service.get_progress_summary(user_id)


@router.post("/progress")
def update_subject_progress(
    subject_code: str,
    status: str,
    final_grade: Optional[float] = None,
    user_id: int = Depends(get_current_user_id),
):
    """Update student progress for a subject."""
    # Validate status
    valid_statuses = ["Not Taken", "Completed", "Planned", "Enrolled"]
    if status not in valid_statuses:
        raise HTTPException(
            status_code=400, detail=f"Invalid status. Must be one of: {valid_statuses}"
        )

    # Validate grade if provided
    if final_grade is not None:
        if not (0.0 <= final_grade <= 5.0):
            raise HTTPException(
                status_code=400, detail="Grade must be between 0.0 and 5.0"
            )

    return student_service.update_progress(
        user_id=user_id,
        subject_code=subject_code,
        status=status,
        final_grade=final_grade,
    )
