from repositories.base import BaseRepository
from typing import Optional

class CurriculumRepository(BaseRepository):
    """Repository for curriculum-related database operations."""
    
    def get_program_total_credits(self, program_code: str) -> int:
        """Get total credits for a program."""
        with self.get_cursor() as (cursor, conn):
            cursor.execute("""
                SELECT total_credits 
                FROM program 
                WHERE program_code_sia = %s
            """, (program_code,))
            result = cursor.fetchone()
            return result[0] if result else 180
    
    def subject_exists(self, subject_code: str) -> bool:
        """Check if a subject exists."""
        with self.get_cursor() as (cursor, conn):
            cursor.execute("""
                SELECT subject_code 
                FROM subject 
                WHERE subject_code = %s
            """, (subject_code,))
            return cursor.fetchone() is not None
    def get_available_subjects_by_rules(self, student_id: int, program_code: str):
        """
        Obtiene las materias disponibles validando prerrequisitos directamente
        en la base de datos mediante la función SQL FN_Validate_Prerequisites.
        """
        conn = get_connection()
        try:
            cur = conn.cursor()
            query = """
            SELECT 
                s.subject_code,
                s.name,
                s.credits,
                sp.suggested_semester,
                sp.component
            FROM StudyPlan sp
            JOIN Subject s ON s.subject_code = sp.subject_code
            LEFT JOIN UserProgress up ON up.subject_code = sp.subject_code 
                AND up.user_id = %s 
                AND up.final_grade >= 3.0
            WHERE sp.program_code_sia = %s
                AND up.subject_code IS NULL
                AND FN_Validate_Prerequisites(%s, sp.program_code_sia, sp.subject_code) = TRUE
            ORDER BY sp.suggested_semester, s.subject_code;
            """
            cur.execute(query, (student_id, program_code, student_id))
            return cur.fetchall()
        finally:
            cur.close()
            conn.close()
