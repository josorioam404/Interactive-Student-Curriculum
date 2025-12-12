from typing import Optional, Dict, Any, List
from fastapi import HTTPException
from repositories.curriculum_repository import CurriculumRepository
from repositories.subject_repository import SubjectRepository
from repositories.studyplan_repository import StudyPlanRepository


class AdminService:

    def __init__(self):
        self.subject_repo = SubjectRepository()
        self.studyplan_repo = StudyPlanRepository()
        self.curriculum_repo = CurriculumRepository()

    # -------------------------------------------
    # SEARCH SUBJECTS
    # -------------------------------------------
    def search_subjects(self, query: str):
        results = self.subject_repo.search_subjects(query)
        return {"results": results}

    # -------------------------------------------
    # GET SUBJECT DETAIL
    # -------------------------------------------
    def get_subject(self, code: str):
        subject = self.subject_repo.get_subject(code)
        if not subject:
            raise HTTPException(404, f"Subject {code} not found")

        plan_rows = self.studyplan_repo.get_plans_for_subject(code)

        return {
            "subject": subject,
            "studyPlans": plan_rows
        }

    # -------------------------------------------
    # UPDATE SUBJECT + STUDYPLAN
    # -------------------------------------------
    def update_subject(self, code: str, data: Dict[str, Any]):

        # -------- 1. Validar que exista --------
        if not self.subject_repo.subject_exists(code):
            raise HTTPException(404, f"Subject {code} not found")

        # -------- 2. Actualizar tabla Subject --------
        self.subject_repo.update_subject(
            subject_code=code,
            name=data.get("name"),
            credits=data.get("credits"),
            weekly_hours=data.get("weekly_hours"),
            description=data.get("description")
        )

        # -------- 3. Actualizar StudyPlan --------
        if "program_code_sia" in data:
            self.studyplan_repo.update_studyplan(
                subject_code=code,
                program=data["program_code_sia"],
                semester=data.get("suggested_semester"),
                component=data.get("component"),
                is_obligatory=data.get("is_obligatory"),
                prereq_rules=data.get("prereq_rules")
            )

        return {
            "success": True,
            "message": f"Subject {code} updated successfully"
        }

    # -------------------------------------------
    # PROCESS FILE UPLOAD (JSON or CSV)
    # -------------------------------------------
    def process_bulk_update(self, records: List[Dict[str, Any]]):
        created = 0
        updated = 0
        failed = 0

        for row in records:
            try:
                code = row["subject_code"]

                if self.subject_repo.subject_exists(code):
                    self.update_subject(code, row)
                    updated += 1
                else:
                    self.subject_repo.create_subject(row)
                    self.studyplan_repo.create_studyplan(row)
                    created += 1

            except Exception as e:
                print("Failed record:", row, "Error:", str(e))
                failed += 1

        return {
            "processed": len(records),
            "created": created,
            "updated": updated,
            "failed": failed
        }
