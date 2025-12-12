from typing import Optional, List, Dict, Any
import json
from database.db import get_connection



class AdminRepository:

    def search_subjects(self, query: str) -> List[Dict[str, Any]]:
        """Search subjects by code or name."""
        conn = get_connection()
        cur = conn.cursor()

        cur.execute("""
            SELECT subject_code, name, credits
            FROM Subject
            WHERE subject_code ILIKE %s OR name ILIKE %s
            ORDER BY subject_code
            LIMIT 30
        """, (f"%{query}%", f"%{query}%"))

        rows = cur.fetchall()
        cur.close()
        conn.close()

        return [
            {"subject_code": r[0], "name": r[1], "credits": r[2]}
            for r in rows
        ]

    def get_subject_details(self, subject_code: str, program_code: str) -> Optional[Dict[str, Any]]:
        """Return subject info + its prereq rules for a specific program."""
        conn = get_connection()
        cur = conn.cursor()

        cur.execute("""
            SELECT s.subject_code, s.name, s.credits,
                   sp.prereq_rules
            FROM Subject s
            LEFT JOIN StudyPlan sp 
                ON sp.subject_code = s.subject_code
                AND sp.program_code_sia = %s
            WHERE s.subject_code = %s
        """, (program_code, subject_code))

        row = cur.fetchone()
        cur.close()
        conn.close()

        if not row:
            return None

        return {
            "subject_code": row[0],
            "name": row[1],
            "credits": row[2],
            "prereq_rules": row[3]
        }

    def update_subject(self, subject_code: str, name: str, credits: int):
        """Update Subject table data."""
        conn = get_connection()
        cur = conn.cursor()

        cur.execute("""
            UPDATE Subject
            SET name = %s,
                credits = %s
            WHERE subject_code = %s
        """, (name, credits, subject_code))

        conn.commit()
        cur.close()
        conn.close()
    def update_studyplan_prereqs(self, subject_code: str, program_code: str, prereq_rules):
        """Update prereq_rules (JSONB) for a specific subject in a specific program."""
        with get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    UPDATE StudyPlan
                    SET prereq_rules = %s
                    WHERE subject_code = %s
                    AND program_code_sia = %s
                """, (json.dumps(prereq_rules), subject_code, program_code))

            conn.commit()
