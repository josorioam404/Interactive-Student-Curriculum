from contextlib import contextmanager
from database.db import get_connection

class BaseRepository:
    """Base repository with database connection management."""
    
    @contextmanager
    def get_db(self):
        """Context manager for database connections."""
        conn = get_connection()
        try:
            yield conn
        finally:
            conn.close()
    
    @contextmanager
    def get_cursor(self):
        """Context manager for database cursor."""
        conn = get_connection()
        cursor = conn.cursor()
        try:
            yield cursor, conn
        finally:
            cursor.close()
            conn.close()
