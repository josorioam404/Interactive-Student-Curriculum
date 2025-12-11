from pydantic import BaseModel
from typing import List, Optional, Dict, Any


class SubjectProgressResponse(BaseModel):
    status: str
    final_grade: Optional[float]


class SubjectDetailResponse(BaseModel):
    name: str
    credits: int
    weekly_hours: Optional[int]
    description: Optional[str]


class CurriculumItemResponse(BaseModel):
    id: int
    subject_code: str
    suggested_semester: int
    component: str
    is_obligatory: bool
    prereq_rules: Optional[Any]  # Can be dict or list from database
    subject: SubjectDetailResponse
    progress: SubjectProgressResponse


class StudentCurriculumResponse(BaseModel):
    userId: int
    userName: str
    programCode: str
    curriculum: List[CurriculumItemResponse]


class ProgressSummaryResponse(BaseModel):
    userId: int
    completedSubjects: int
    completedCredits: int
    totalProgramCredits: int
    progressPercentage: float
    gpa: float
    papa: float
