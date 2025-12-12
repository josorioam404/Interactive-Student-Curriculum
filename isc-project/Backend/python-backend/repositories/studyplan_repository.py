from database.db import get_connection
import json


class StudyPlanRepository:

    def get_plans_for_subject(self, code: str):
        with get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    SELECT program_code_sia, suggested_semester,
                           component, is_obligatory, prereq_rules
                    FROM StudyPlan
                    WHERE subject_code = %s
                """, (code,))
                rows = cur.fetchall()

                return [
                    {
                        "program": r[0],
                        "suggested_semester": r[1],
                        "component": r[2],
                        "is_obligatory": r[3],
                        "prereq_rules": r[4]
                    }
                    for r in rows
                ]

    def update_studyplan(self, subject_code, program, semester, component, is_obligatory, prereq_rules):
        with get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    UPDATE StudyPlan
                    SET suggested_semester = %s,
                        component = %s,
                        is_obligatory = %s,
                        prereq_rules = %s
                    WHERE subject_code = %s AND program_code_sia = %s
                """, (
                    semester,
                    component,
                    is_obligatory,
                    json.dumps(prereq_rules),
                    subject_code,
                    program
                ))
            conn.commit()

    def create_studyplan(self, data):
        with get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    INSERT INTO StudyPlan
                    (program_code_sia, subject_code, suggested_semester,
                     component, is_obligatory, prereq_rules)
                    VALUES (%s, %s, %s, %s, %s, %s)
                """, (
                    data["program_code_sia"],
                    data["subject_code"],
                    data.get("suggested_semester"),
                    data["component"],
                    data["is_obligatory"],
                    json.dumps(data.get("prereq_rules"))
                ))
            conn.commit()
