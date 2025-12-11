from typing import Optional, Tuple, List
from repositories.base import BaseRepository


class StudentRepository(BaseRepository):
    """Repository for student-related database operations."""

    def get_user_program(self, user_id: int) -> Optional[Tuple[str, str]]:
        """Get user's selected program and name."""
        with self.get_cursor() as (cursor, conn):
            cursor.execute(
                """
                SELECT selected_program_code_sia, full_name 
                FROM "User" 
                WHERE id = %s
            """,
                (user_id,),
            )
            return cursor.fetchone()

    def get_curriculum_with_progress(
        self, user_id: int, program_code: str
    ) -> List[Tuple]:
        """Get complete curriculum with user progress."""
        with self.get_cursor() as (cursor, conn):
            cursor.execute(
                """
                SELECT 
                    sp.id,
                    sp.subject_code,
                    sp.suggested_semester,
                    sp.component,
                    sp.is_obligatory,
                    sp.prereq_rules,
                    s.name as subject_name,
                    s.credits,
                    s.weekly_hours,
                    s.description,
                    up.status,
                    up.final_grade
                FROM studyplan sp
                JOIN subject s ON sp.subject_code = s.subject_code
                LEFT JOIN userprogress up ON up.subject_code = sp.subject_code 
                    AND up.user_id = %s
                WHERE sp.program_code_sia = %s
                ORDER BY sp.suggested_semester, sp.component, s.name
            """,
                (user_id, program_code),
            )
            return cursor.fetchall()

    def get_completed_subjects(self, user_id: int) -> set:
        """Get set of completed subject codes for a user."""
        with self.get_cursor() as (cursor, conn):
            cursor.execute(
                """
                SELECT subject_code 
                FROM userprogress 
                WHERE user_id = %s AND status = 'Completed'
            """,
                (user_id,),
            )
            return set(row[0] for row in cursor.fetchall())

    def get_progress_statistics(self, user_id: int) -> Optional[Tuple]:
        """Get student progress statistics."""
        with self.get_cursor() as (cursor, conn):
            cursor.execute(
                """
                SELECT 
                    COUNT(*) as completed_count,
                    SUM(s.credits) as completed_credits,
                    AVG(up.final_grade) as gpa,
                    SUM(up.final_grade * s.credits) / NULLIF(SUM(s.credits), 0) as papa
                FROM userprogress up
                JOIN subject s ON up.subject_code = s.subject_code
                WHERE up.user_id = %s 
                AND up.status = 'Completed'
                AND up.final_grade IS NOT NULL
            """,
                (user_id,),
            )
            return cursor.fetchone()

    def update_subject_progress(
        self, user_id: int, subject_code: str, status: str, final_grade: Optional[float]
    ) -> None:
        """Insert or update student progress for a subject."""
        with self.get_cursor() as (cursor, conn):
            cursor.execute(
                """
                INSERT INTO userprogress (user_id, subject_code, status, final_grade)
                VALUES (%s, %s, %s, %s)
                ON CONFLICT (user_id, subject_code) 
                DO UPDATE SET 
                    status = EXCLUDED.status,
                    final_grade = EXCLUDED.final_grade
            """,
                (user_id, subject_code, status, final_grade),
            )
            conn.commit()

    def get_program_subjects_with_prereqs(
        self, user_id: int, program_code: str
    ) -> List[Tuple]:
        """Get all subjects in program with prerequisites and current status."""
        with self.get_cursor() as (cursor, conn):
            cursor.execute(
                """
                SELECT 
                    sp.subject_code,
                    sp.prereq_rules,
                    s.name,
                    s.credits,
                    sp.suggested_semester,
                    up.status
                FROM studyplan sp
                JOIN subject s ON sp.subject_code = s.subject_code
                LEFT JOIN userprogress up ON up.subject_code = sp.subject_code 
                    AND up.user_id = %s
                WHERE sp.program_code_sia = %s
            """,
                (user_id, program_code),
            )
            return cursor.fetchall()

    def get_subject_prerequisites(self, program_code: str, subject_code: str) -> any:
        """Get prerequisite rules for a specific subject in a program."""
        with self.get_cursor() as (cursor, conn):
            cursor.execute(
                """
                SELECT prereq_rules
                FROM studyplan
                WHERE program_code_sia = %s AND subject_code = %s
            """,
                (program_code, subject_code),
            )
            result = cursor.fetchone()
            # Extract the JSONB data from the tuple
            return result[0] if result else None
