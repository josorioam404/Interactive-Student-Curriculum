from typing import Dict, Any, Optional
from fastapi import HTTPException
from repositories.student_repository import StudentRepository
from repositories.curriculum_repository import CurriculumRepository
from models.responses import (
    StudentCurriculumResponse,
    CurriculumItemResponse,
    SubjectDetailResponse,
    SubjectProgressResponse,
    ProgressSummaryResponse,
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
                status_code=400, detail="User has not selected a program"
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
                    name=row[6], credits=row[7], weekly_hours=row[8], description=row[9]
                ),
                progress=SubjectProgressResponse(
                    status=row[10] if row[10] else "Not Taken",
                    final_grade=float(row[11]) if row[11] else None,
                ),
            )
            curriculum_items.append(item)

        return StudentCurriculumResponse(
            userId=user_id,
            userName=user_name,
            programCode=program_code,
            curriculum=curriculum_items,
        )

    def get_progress_summary(self, user_id: int) -> ProgressSummaryResponse:
        """Get summary statistics for student progress."""
        user_result = self.student_repo.get_user_program(user_id)
        if not user_result or not user_result[0]:
            raise HTTPException(
                status_code=400, detail="User has not selected a program"
            )

        program_code = user_result[0]
        total_program_credits = self.curriculum_repo.get_program_total_credits(
            program_code
        )
        stats = self.student_repo.get_progress_statistics(user_id)

        completed_count = int(stats[0]) if stats and stats[0] else 0
        completed_credits = int(stats[1]) if stats and stats[1] else 0
        gpa = float(stats[2]) if stats and stats[2] else 0.0
        papa = float(stats[3]) if stats and stats[3] else 0.0

        progress_percentage = (
            (completed_credits / total_program_credits * 100)
            if total_program_credits > 0
            else 0
        )

        return ProgressSummaryResponse(
            userId=user_id,
            completedSubjects=completed_count,
            completedCredits=completed_credits,
            totalProgramCredits=total_program_credits,
            progressPercentage=round(progress_percentage, 1),
            gpa=round(gpa, 2),
            papa=round(papa, 2),
        )

    def update_progress(
        self, user_id: int, subject_code: str, status: str, final_grade: Optional[float]
    ) -> Dict[str, Any]:
        """Update student progress for a subject."""
        if not self.curriculum_repo.subject_exists(subject_code):
            raise HTTPException(status_code=404, detail="Subject not found")

        # Validate prerequisites if marking as Completed
        if status == "Completed":
            # Get user's program to fetch prerequisites
            user_program_data = self.student_repo.get_user_program(user_id)
            if not user_program_data:
                raise HTTPException(
                    status_code=400,
                    detail="User program not found. Cannot validate prerequisites.",
                )

            # Extract program code from tuple (program_code, full_name)
            user_program = user_program_data[0]

            # Get completed subjects
            completed_subjects = self.student_repo.get_completed_subjects(user_id)

            # Get prerequisites for this subject
            prereq_rules = self.student_repo.get_subject_prerequisites(
                user_program, subject_code
            )

            # Debug logging
            print(f"DEBUG: Checking prerequisites for {subject_code}")
            print(f"DEBUG: Program: {user_program}")
            print(f"DEBUG: Prereq rules: {prereq_rules}")
            print(f"DEBUG: Completed subjects: {completed_subjects}")

            # Check if prerequisites are met
            prereqs_met, missing = self._check_prerequisites(
                prereq_rules, completed_subjects
            )

            print(f"DEBUG: Prerequisites met: {prereqs_met}, Missing: {missing}")

            if not prereqs_met:
                raise HTTPException(
                    status_code=400,
                    detail=f"Cannot mark as completed. Missing prerequisites: {', '.join(missing)}",
                )

        self.student_repo.update_subject_progress(
            user_id, subject_code, status, final_grade
        )
        return {
            "success": True,
            "message": f"Progress updated for {subject_code}",
            "subject_code": subject_code,
            "status": status,
            "final_grade": final_grade,
        }

    def _check_prerequisites(
        self, prereq_rules: Any, completed_subjects: set
    ) -> tuple[bool, list[str]]:
        """
        Check if prerequisites are met and return missing prerequisites.
        Returns: (prerequisites_met: bool, missing_prerequisites: List[str])

        Logic for alternatives:
        - If ANY prerequisite has "condition": "Alternativa", then ALL prerequisites
        in that list are alternatives (at least ONE must be completed)
        - If NO prerequisite has "condition": "Alternativa", then ALL are required
        """
        if not prereq_rules:
            return True, []

        missing = []

        # Handle dict format: {"required": ["CODE1", "CODE2"]}
        if isinstance(prereq_rules, dict):
            prereqs = prereq_rules.get("required", [])
            for prereq in prereqs:
                if prereq not in completed_subjects:
                    missing.append(prereq)
            return len(missing) == 0, missing

        # Handle list format with conditions
        if isinstance(prereq_rules, list):
            # Check if ANY prerequisite has "Alternativa" condition
            has_alternatives = any(
                isinstance(rule, dict) and rule.get("condition") == "Alternativa"
                for rule in prereq_rules
            )

            # Extract all prerequisite codes
            all_prereqs = []
            for rule in prereq_rules:
                if isinstance(rule, dict):
                    rule_type = rule.get("type")
                    req_code = rule.get("subject_code")
                    if rule_type == "Prerrequisito" and req_code:
                        all_prereqs.append(req_code)

            if has_alternatives:
                # If alternatives exist, at least ONE must be completed
                if not any(prereq in completed_subjects for prereq in all_prereqs):
                    # None are completed
                    missing.append(f"({' OR '.join(all_prereqs)})")
            else:
                # No alternatives, ALL must be completed
                for prereq in all_prereqs:
                    if prereq not in completed_subjects:
                        missing.append(prereq)

            return len(missing) == 0, missing

        return True, []
