// Define los estados visuales posibles para una asignatura en el mapa curricular
export type SubjectStatus = 'approved' | 'enrolled' | 'planned' | 'pending' | 'error';

// Estructura la información detallada de una asignatura académica
export interface Subject {
  code: string;
  name: string;
  credits: number;
  weekly_hours: number;
  description?: string;

  // Campos opcionales
  theory_hours?: number;
  practice_hours?: number;
  lab_hours?: number;
  professor?: string;
  schedule?: string;
}

// Modela el registro de progreso académico de un usuario para una asignatura específica
export interface UserProgress {
  id?: number;
  user_id?: number;
  subject_code: string;
  final_grade?: number | null;
  status?: string; 
}

// Representa un ítem dentro de la malla curricular
export interface StudyPlanItem {
  id: number;
  program_code_sia: string;
  subject_code: string;
  suggested_semester: number;
  component: string;
  is_obligatory: boolean;
  prereq_rules?: {
    required?: string[];
  };
  subject?: Subject;
  progress?: UserProgress | null;
}

