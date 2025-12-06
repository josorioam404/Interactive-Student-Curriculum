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
        """
        Get complete curriculum for student's program,
        filtering subjects based on prerequisite fulfillment.
        """

        user_result = self.student_repo.get_user_program(user_id)
        if not user_result or not user_result[0]:
            raise HTTPException(
                status_code=400,
                detail="User has not selected a program"
            )

        program_code, user_name = user_result

        # Obtener materias del plan con progreso
        rows = self.student_repo.get_curriculum_with_progress(user_id, program_code)

        # Obtener materias ya completadas
        completed_subjects = self.student_repo.get_completed_subjects(user_id)

        curriculum_items = []

        for row in rows:
            subject_code = row[1]
            prereq_rules = row[5]

            # 🔥 Nuevo chequeo robusto (AND / OR obligatorio)
            allowed = self._check_prerequisites(prereq_rules, completed_subjects)

            if not allowed:
                # ❌ materia bloqueada: no se incluye
                continue

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
        """Get courses available for enrollment based on prerequisites."""
        user_result = self.student_repo.get_user_program(user_id)
        if not user_result or not user_result[0]:
            raise HTTPException(
                status_code=400, 
                detail="User has not selected a program"
            )
        
        program_code = user_result[0]
        completed_subjects = self.student_repo.get_completed_subjects(user_id)
        all_subjects = self.student_repo.get_program_subjects_with_prereqs(
            user_id, program_code
        )
        
        available = []
        
        for row in all_subjects:
            subject_code, prereq_rules, name, credits, semester, status = row
            
            if status in ["Completed", "Enrolled"]:
                continue
            
            prerequisites_met = self._check_prerequisites(
                prereq_rules, completed_subjects
            )
            
            if prerequisites_met:
                available.append(AvailableCourseResponse(
                    subject_code=subject_code,
                    name=name,
                    credits=credits,
                    suggested_semester=semester,
                    status=status if status else "Not Taken"
                ))
        
        return AvailableCoursesResponse(
            userId=user_id,
            availableCourses=available,
            count=len(available)
        )
    
    def _check_prerequisites(self, prereq_rules: Any, completed_subjects: set) -> bool:
        """
        Correct prerequisite evaluator:
        - If any rule has condition=Alternativa → treat full group as OR logic
        - Otherwise treat as AND logic
        """

        if not prereq_rules:
            return True

        # normalize dict rules
        if isinstance(prereq_rules, dict):
            prereq_rules = prereq_rules.get("required", [])

        # Extract codes
        prereq_codes = []
        has_alternative = False

        for rule in prereq_rules:
            if not isinstance(rule, dict):
                continue

            code = rule.get("subject_code")
            if not code:
                continue

            prereq_codes.append(code)

            cond = rule.get("condition") or rule.get("type")

            # detect if any rule belongs to an alternative group
            if cond and cond.lower() == "alternativa":
                has_alternative = True

        # ⚡ CASE 1: alternative group → OR logic
        if has_alternative:
            return any(code in completed_subjects for code in prereq_codes)

        # ⚡ CASE 2: normal group → AND logic
        return all(code in completed_subjects for code in prereq_codes)
