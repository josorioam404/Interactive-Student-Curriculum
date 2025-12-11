// src/types/index.ts

export type SubjectStatus = 'approved' | 'enrolled' | 'planned' | 'pending' | 'error';

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
  
  // --- AGREGAMOS ESTA LÍNEA PARA CORREGIR EL ERROR ---
  component_type?: string; 
}

export interface UserProgress {
  id?: number;
  user_id?: number;
  subject_code: string;
  final_grade?: number | null;
  status?: string; 
}

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