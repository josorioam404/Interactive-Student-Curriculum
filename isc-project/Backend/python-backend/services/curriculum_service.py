from database.db import get_connection

def calculate_available_subjects(student_id: int):
    conn = get_connection()
    cur = conn.cursor()
    try:
        # 1. Obtener el código del programa del estudiante
        cur.execute('SELECT selected_program_code_sia FROM "User" WHERE id = %s', (student_id,))
        result = cur.fetchone()
        
        if not result or not result:
            return [] # El estudiante no tiene programa asignado
            
        program_code = result

        # 2. Ejecutar la consulta INTELIGENTE usando tus funciones SQL
                
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
                
        available_subjects = cur.fetchall()
        
        # 3. Formatear la respuesta para el Frontend
        results = []
        for row in available_subjects:
            results.append({
                "code": row,
                "name": row[1],
                "credits": row[2],
                "semester": row[3],
                "component": row[4],
                "status": "Available" # Si la base de datos la devolvió, es porque está disponible
            })
            
        return results

    except Exception as e:
        print(f"Error calculando materias disponibles: {e}")
        return []
    finally:
        cur.close()
        conn.close()

def get_completed_subjects(student_id: int):
    """
    Retorna el historial de materias vistas por el estudiante.
    """
    conn = get_connection()
    cur = conn.cursor()
    try:
        cur.execute("""
            SELECT s.subject_code, s.name, up.final_grade, up.status
            FROM UserProgress up
            JOIN Subject s ON s.subject_code = up.subject_code
            WHERE up.user_id = %s
            ORDER BY up.subject_code
        """, (student_id,))
        
        rows = cur.fetchall()
        
        return [
            {
                "code": r, 
                "name": r[1], 
                "grade": float(r[2]) if r[2] is not None else 0.0, 
                "status": r[3]
            }
            for r in rows
        ]
    finally:
        cur.close()
        conn.close()