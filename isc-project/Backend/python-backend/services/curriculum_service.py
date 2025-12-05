from repositories.curriculum_repository import CurriculumRepository
from repositories.student_repository import StudentRepository

class CurriculumService:
    def __init__(self):
        self.curriculum_repo = CurriculumRepository()
        self.student_repo = StudentRepository()

    def calculate_available_subjects(self, student_id: int):
        try:
            # 1. Obtener programa (Reutilizando StudentRepository)
            user_program = self.student_repo.get_user_program(student_id)
            if not user_program:
                return [] 
            
            # Asumiendo que get_user_program retorna una tupla o valor directo
            # Ajusta según si retorna (code, name) o solo code
            program_code = user_program if isinstance(user_program, tuple) else user_program

            # 2. Llamar al repositorio (Aquí ocurre la magia SQL)
            # Ya no hay "conn = get_connection()" aquí
            available_subjects = self.curriculum_repo.get_available_subjects_by_rules(
                student_id, program_code
            )

            # 3. Formatear respuesta (Mapeo de Tupla a Diccionario)
            results = []
            for row in available_subjects:
                results.append({
                    "code": row,
                    "name": row[3],
                    "credits": row[4],
                    "semester": row[5],
                    "component": row[6],
                    "status": "Available"
                })
            
            return results

        except Exception as e:
            print(f"Error en servicio: {e}")
            return []