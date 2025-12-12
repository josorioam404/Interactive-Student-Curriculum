from database.db import get_connection


class SubjectRepository:

    def search_subjects(self, query: str):
        with get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    SELECT subject_code, name, credits
                    FROM Subject
                    WHERE subject_code ILIKE %s OR name ILIKE %s
                """, (f"%{query}%", f"%{query}%"))
                rows = cur.fetchall()
                return [
                    {"code": r[0], "name": r[1], "credits": r[2]}
                    for r in rows
                ]

    def get_subject(self, code: str):
        with get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    SELECT subject_code, name, credits, weekly_hours, description
                    FROM Subject
                    WHERE subject_code = %s
                """, (code,))
                row = cur.fetchone()
                if not row:
                    return None
                return {
                    "code": row[0],
                    "name": row[1],
                    "credits": row[2],
                    "weekly_hours": row[3],
                    "description": row[4]
                }

    def subject_exists(self, code: str) -> bool:
        with get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT 1 FROM Subject WHERE subject_code = %s", (code,))
                return cur.fetchone() is not None

    def update_subject(self, subject_code, name, credits, weekly_hours, description):
        with get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    UPDATE Subject
                    SET name = %s, credits = %s, weekly_hours = %s, description = %s
                    WHERE subject_code = %s
                """, (name, credits, weekly_hours, description, subject_code))
            conn.commit()

    def create_subject(self, data):
        with get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    INSERT INTO Subject (subject_code, name, credits, weekly_hours, description)
                    VALUES (%s, %s, %s, %s, %s)
                """, (
                    data["subject_code"],
                    data["name"],
                    data["credits"],
                    data.get("weekly_hours"),
                    data.get("description")
                ))
            conn.commit()
