export interface GradeRecord {
    semester: string;
    code: string;
    subject: string;
    credits: number;
    grade: number;
    component: 'Fundamentación' | 'Disciplinar' | 'Libre Elección';
}

// Datos simulados de un estudiante avanzado
export const mockAcademicHistory: GradeRecord[] = [
    // 2021-1
    { semester: '2021-1', code: '1000001', subject: 'Cálculo Diferencial', credits: 4, grade: 4.5, component: 'Fundamentación' },
    { semester: '2021-1', code: '2016377', subject: 'Programación Básica', credits: 3, grade: 3.8, component: 'Disciplinar' },
    { semester: '2021-1', code: '1000002', subject: 'Introducción a la Ingeniería', credits: 2, grade: 4.2, component: 'Fundamentación' },
    
    // 2021-2
    { semester: '2021-2', code: '1000003', subject: 'Cálculo Integral', credits: 4, grade: 4.0, component: 'Fundamentación' },
    { semester: '2021-2', code: '2016999', subject: 'Programación Orientada a Objetos', credits: 3, grade: 4.1, component: 'Disciplinar' },
    { semester: '2021-2', code: '1000044', subject: 'Álgebra Lineal', credits: 3, grade: 3.5, component: 'Fundamentación' },

    // 2022-1
    { semester: '2022-1', code: '1000005', subject: 'Cálculo Vectorial', credits: 4, grade: 3.9, component: 'Fundamentación' },
    { semester: '2022-1', code: '2016378', subject: 'Estructuras de Datos', credits: 3, grade: 4.8, component: 'Disciplinar' },
    { semester: '2022-1', code: '2015702', subject: 'Física Mecánica', credits: 4, grade: 3.7, component: 'Fundamentación' },
    
    // 2022-2 (Semestre actual o reciente)
    { semester: '2022-2', code: '2016701', subject: 'Ingeniería de Software I', credits: 3, grade: 4.5, component: 'Disciplinar' },
    { semester: '2022-2', code: '1000052', subject: 'Probabilidad y Estadística', credits: 3, grade: 4.0, component: 'Fundamentación' },
];

// Datos para las barras (Totales del programa vs Completados)
export const mockCreditDistribution = {
    fundamentacion: { total: 60, completed: 38 },
    disciplinar: { total: 80, completed: 12 },
    libre: { total: 20, completed: 6 }
};