import type { StudyPlanItem } from '../types';

export const mockCurriculum: StudyPlanItem[] = [
  // --- SEMESTRE 1 ---
  {
    id: 1, program_code_sia: "2541", subject_code: "1000001", suggested_semester: 1, component: "fundamentacion", is_obligatory: true,
    subject: { code: "1000001", name: "Cálculo Diferencial", credits: 4, weekly_hours: 4 }
  },
  {
    id: 2, program_code_sia: "2541", subject_code: "2016377", suggested_semester: 1, component: "disciplinar", is_obligatory: true,
    subject: { code: "2016377", name: "Programación Básica", credits: 3, weekly_hours: 4 }
  },
  {
    id: 3, program_code_sia: "2541", subject_code: "1000002", suggested_semester: 1, component: "fundamentacion", is_obligatory: true,
    subject: { code: "1000002", name: "Introducción a la Ingeniería", credits: 2, weekly_hours: 2 }
  },

  // --- SEMESTRE 2 ---
  {
    id: 4, program_code_sia: "2541", subject_code: "1000003", suggested_semester: 2, component: "fundamentacion", is_obligatory: true,
    subject: { code: "1000003", name: "Cálculo Integral", credits: 4, weekly_hours: 4 }
  },
  {
    id: 5, program_code_sia: "2541", subject_code: "2016999", suggested_semester: 2, component: "disciplinar", is_obligatory: true,
    subject: { code: "2016999", name: "Programación Orientada a Objetos", credits: 3, weekly_hours: 4 }
  },
  {
    id: 8, program_code_sia: "2541", subject_code: "1000044", suggested_semester: 2, component: "fundamentacion", is_obligatory: true,
    subject: { code: "1000044", name: "Álgebra Lineal", credits: 3, weekly_hours: 4 }
  },
  
  // --- SEMESTRE 3 ---
  {
    id: 6, program_code_sia: "2541", subject_code: "1000005", suggested_semester: 3, component: "fundamentacion", is_obligatory: true,
    subject: { code: "1000005", name: "Cálculo Vectorial", credits: 4, weekly_hours: 4 }
  },
  {
    id: 7, program_code_sia: "2541", subject_code: "2016378", suggested_semester: 3, component: "disciplinar", is_obligatory: true,
    subject: { code: "2016378", name: "Estructuras de Datos", credits: 3, weekly_hours: 4 }
  },
  {
    id: 9, program_code_sia: "2541", subject_code: "2015702", suggested_semester: 3, component: "fundamentacion", is_obligatory: true,
    subject: { code: "2015702", name: "Física Mecánica", credits: 4, weekly_hours: 4 }
  },

  // --- SEMESTRE 4 (Ejemplo futuro) ---
  {
    id: 10, program_code_sia: "2541", subject_code: "2016701", suggested_semester: 4, component: "disciplinar", is_obligatory: true,
    subject: { code: "2016701", name: "Ingeniería de Software I", credits: 3, weekly_hours: 3 }
  },
];