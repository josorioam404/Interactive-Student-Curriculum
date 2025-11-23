from pydantic import BaseModel, Field, validator
from typing import Optional
from enum import Enum

class SubjectStatus(str, Enum):
    NOT_TAKEN = "Not Taken"
    COMPLETED = "Completed"
    PLANNED = "Planned"
    ENROLLED = "Enrolled"

class UpdateProgressRequest(BaseModel):
    subject_code: str = Field(..., min_length=1)
    status: SubjectStatus
    final_grade: Optional[float] = Field(None, ge=0.0, le=5.0)
