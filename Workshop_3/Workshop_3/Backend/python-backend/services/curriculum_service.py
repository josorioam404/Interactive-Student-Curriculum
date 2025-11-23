from database.db import get_connection

def calculate_available_subjects(student_id: int):
    conn = get_connection()
    cur = conn.cursor()

    try:
        # 1. Obtener programa del estudiante
        cur.execute("""
            SELECT selected_program_code_sia 
            FROM "User" 
            WHERE id = %s
        """, (student_id,))
        result = cur.fetchone()
        
        if not result or not result[0]:
            return []

        program_code = result[0]

        # 2. Obtener materias YA aprobadas
        cur.execute("""
            SELECT subject_code 
            FROM UserProgress 
            WHERE user_id = %s AND status = 'Approved'
        """, (student_id,))
        passed_subjects = set(row[0] for row in cur.fetchall())

        # 3. Obtener TODAS las materias del plan de estudios
        # Traemos también las reglas de prerrequisitos (JSONB)
        cur.execute("""
            SELECT sp.subject_code, s.name, s.credits, sp.suggested_semester, sp.component, sp.prereq_rules
            FROM StudyPlan sp
            JOIN Subject s ON s.subject_code = sp.subject_code
            WHERE sp.program_code_sia = %s
        """, (program_code,))
        
        all_subjects = cur.fetchall()
        available = []

        for sub in all_subjects:
            code, name, credits, sem, comp, rules = sub
            
            # Si ya la vio, no es "disponible para inscribir" (aunque podríamos mostrarla como vista)
            if code in passed_subjects:
                continue

            # 4. Verificar Prerrequisitos
            # Si rules es None o lista vacía, no tiene requisitos -> Disponible
            is_unlockable = True
            
            if rules:
                # El JSON puede ser una lista de objetos: [{"subject_code": "123", "type": "Prerrequisito"}]
                # O lógica más compleja. Aquí asumimos lista simple de prerrequisitos obligatorios.
                for rule in rules:
                    if rule.get("type") == "Prerrequisito":
                        req_code = rule.get("subject_code")
                        if req_code and req_code not in passed_subjects:
                            is_unlockable = False
                            break
            
            if is_unlockable:
                available.append({
                    "code": code,
                    "name": name,
                    "credits": credits,
                    "semester": sem,
                    "component": comp,
                    "status": "Available"
                })

        return available

    finally:
        cur.close()
        conn.close()

def get_completed_subjects(student_id: int):
    conn = get_connection()
    cur = conn.cursor()
    try:
        cur.execute("""
            SELECT s.subject_code, s.name, up.final_grade, up.status
            FROM UserProgress up
            JOIN Subject s ON s.subject_code = up.subject_code
            WHERE up.user_id = %s
        """, (student_id,))
        
        rows = cur.fetchall()
        return [
            {"code": r[0], "name": r[1], "grade": float(r[2]) if r[2] else 0, "status": r[3]} 
            for r in rows
        ]
    finally:
        cur.close()
        conn.close()
