from typing import Optional, Any
from pydantic import BaseModel

class UpdateSubjectRequest(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    credits: Optional[int] = None
    weekly_hours: Optional[int] = None


class UpdateStudyPlanRequest(BaseModel):
    suggested_semester: Optional[int] = None
    component: Optional[str] = None
    is_obligatory: Optional[bool] = None
    prereq_rules: Optional[Any] = None  # JSONB
