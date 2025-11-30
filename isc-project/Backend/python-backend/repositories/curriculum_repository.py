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
