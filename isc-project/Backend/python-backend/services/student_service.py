from typing import Dict, Any, Optional
from fastapi import HTTPException
from repositories.student_repository import StudentRepository
from repositories.curriculum_repository import CurriculumRepository
from models.responses import (
    StudentCurriculumResponse, CurriculumItemResponse,
    SubjectDetailResponse, SubjectProgressResponse,
    ProgressSummaryResponse, AvailableCoursesResponse,
    AvailableCourseResponse
)

class StudentService:
    """Service layer for student-related business logic."""

    def __init__(self):
        self.student_repo = StudentRepository()
        self.curriculum_repo = CurriculumRepository()
    
    def get_student_curriculum(self, user_id: int) -> StudentCurriculumResponse:
        """Get complete curriculum for student's program."""
        user_result = self.student_repo.get_user_program(user_id)
        if not user_result or not user_result[0]:
            raise HTTPException(
                status_code=400, 
                detail="User has not selected a program"
            )
        
        program_code, user_name = user_result
        rows = self.student_repo.get_curriculum_with_progress(user_id, program_code)
        
        curriculum_items = []
        for row in rows:
            item = CurriculumItemResponse(
                id=row[0],
                subject_code=row[1],
                suggested_semester=row[2],
                component=row[3],
                is_obligatory=row[4],
                prereq_rules=row[5] if row[5] else None,
                subject=SubjectDetailResponse(
                    name=row[6],
                    credits=row[7],
                    weekly_hours=row[8],
                    description=row[9]
                ),
                progress=SubjectProgressResponse(
                    status=row[10] if row[10] else "Not Taken",
                    final_grade=float(row[11]) if row[11] else None
                )
            )
            curriculum_items.append(item)
        
        return StudentCurriculumResponse(
            userId=user_id,
            userName=user_name,
            programCode=program_code,
            curriculum=curriculum_items
        )
    
    def get_progress_summary(self, user_id: int) -> ProgressSummaryResponse:
        """Get summary statistics for student progress."""
        user_result = self.student_repo.get_user_program(user_id)
        if not user_result or not user_result[0]:
            raise HTTPException(
                status_code=400, 
                detail="User has not selected a program"
            )
        
        program_code = user_result[0]
        total_program_credits = self.curriculum_repo.get_program_total_credits(program_code)
        stats = self.student_repo.get_progress_statistics(user_id)
        
        completed_count = int(stats[0]) if stats and stats[0] else 0
        completed_credits = int(stats[1]) if stats and stats[1] else 0
        gpa = float(stats[2]) if stats and stats[2] else 0.0
        papa = float(stats[3]) if stats and stats[3] else 0.0
        
        progress_percentage = (
            (completed_credits / total_program_credits * 100) 
            if total_program_credits > 0 else 0
        )
        
        return ProgressSummaryResponse(
            userId=user_id,
            completedSubjects=completed_count,
            completedCredits=completed_credits,
            totalProgramCredits=total_program_credits,
            progressPercentage=round(progress_percentage, 1),
            gpa=round(gpa, 2),
            papa=round(papa, 2)
        )
    
    def update_progress(self, user_id: int, subject_code: str, 
                       status: str, final_grade: Optional[float]) -> Dict[str, Any]:
        """Update student progress for a subject."""
        if not self.curriculum_repo.subject_exists(subject_code):
            raise HTTPException(status_code=404, detail="Subject not found")
        
        self.student_repo.update_subject_progress(
            user_id, subject_code, status, final_grade
        )
        
        return {
            "success": True,
            "message": f"Progress updated for {subject_code}",
            "subject_code": subject_code,
            "status": status,
            "final_grade": final_grade
        }
    
    def get_available_courses(self, user_id: int) -> AvailableCoursesResponse:
        """
        Obtiene las materias disponibles delegando la validación compleja
        a la base de datos (FN_Validate_Prerequisites).
        """
        try:
            # 1. Obtener el programa del usuario
            user_result = self.student_repo.get_user_program(user_id)
            
            if not user_result:
                raise HTTPException(
                    status_code=400,
                    detail="User has not selected a program"
                )
            
            # Manejo flexible dependiendo de si el repo devuelve tupla o valor único
            program_code = user_result if isinstance(user_result, tuple) else user_result

            # 2. Llamar al repositorio unificado que usa la lógica SQL
            db_rows = self.curriculum_repo.get_available_subjects_by_rules(
                user_id, program_code
            )

            # 3. Mapear los resultados (Tuplas) al Modelo Pydantic (AvailableCourseResponse)
            # La consulta retorna: (subject_code, name, credits, suggested_semester, component)
            available = []
            for row in db_rows:
                course = AvailableCourseResponse(
                    subject_code=row,       # subject_code
                    name=row[3],               # name
                    credits=row[4],            # credits
                    suggested_semester=row[5], # suggested_semester
                    status="Available"         # Si la DB lo devuelve, está disponible
                )
                available.append(course)

            return AvailableCoursesResponse(
                userId=user_id,
                availableCourses=available,
                count=len(available)
            )

        except Exception as e:
            print(f"Error al obtener materias disponibles: {e}")
            raise HTTPException(status_code=500, detail=str(e))