from database.db import get_connection

class AdminRepository:

    def update_subject(self, subject_code: str, fields: dict):
        """Update Subject table."""
        if not fields:
            return

        set_parts = []
        values = []

        for key, value in fields.items():
            set_parts.append(f"{key} = %s")
            values.append(value)

        query = f"""
            UPDATE Subject
            SET {', '.join(set_parts)}
            WHERE subject_code = %s
        """

        values.append(subject_code)

        conn = get_connection()
        cur = conn.cursor()
        cur.execute(query, tuple(values))
        conn.commit()
        cur.close()


    def update_study_plan(self, program_code: str, subject_code: str, fields: dict):
        """Update StudyPlan table."""
        if not fields:
            return

        set_parts = []
        values = []

        for key, value in fields.items():
            set_parts.append(f"{key} = %s")
            values.append(value)

        query = f"""
            UPDATE StudyPlan
            SET {', '.join(set_parts)}
            WHERE program_code_sia = %s
              AND subject_code = %s
        """

        values.extend([program_code, subject_code])

        conn = get_connection()
        cur = conn.cursor()
        cur.execute(query, tuple(values))
        conn.commit()
        cur.close()
