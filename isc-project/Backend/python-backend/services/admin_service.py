from fastapi import HTTPException
from typing import Any, Dict
from repositories.admin_repository import AdminRepository


class AdminService:

    def __init__(self):
        self.repo = AdminRepository()

    def search_subjects(self, query: str):
        return self.repo.search_subjects(query)

    def get_subject(self, subject_code: str, program_code: str):
        subject = self.repo.get_subject_details(subject_code, program_code)

        if not subject:
            raise HTTPException(status_code=404, detail="Subject not found")

        return subject

    def update_subject(self, program_code: str, subject_code: str, payload: Dict[str, Any]):
        name = payload.get("name")
        credits = payload.get("credits")
        prereq_rules = payload.get("prereq_rules")

        if not name or not credits:
            raise HTTPException(status_code=400, detail="Missing fields")

        # 1️ Update Subject table
        self.repo.update_subject(subject_code, name, credits)

        # 2️ Update prereqs only for THIS STUDY PLAN
        self.repo.update_studyplan_prereqs(subject_code, program_code, prereq_rules)

        return {
            "success": True,
            "message": f"Subject {subject_code} updated in program {program_code}",
            "subject_code": subject_code
        }
