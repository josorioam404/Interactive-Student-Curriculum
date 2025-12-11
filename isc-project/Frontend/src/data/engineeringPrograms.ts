export interface ProgramInfo {
    id: string;
    code: string;
    name: string;
    description: string;
    summary: string;
}

export const engineeringPrograms: ProgramInfo[] = [
    {
        id: 'sistemas',
        code: '2A74', // Código SIA Sistemas
        name: 'Ingeniería de Sistemas y Computación',
        description: 'Formación en diseño, desarrollo y gestión de sistemas de información, software y hardware.',
        summary: 'El programa cuenta con 165 créditos académicos, enfocados en desarrollo de software, ciencias de la computación y gestión TI.'
    },
    {
        id: 'industrial',
        code: '2546', // Código SIA Industrial
        name: 'Ingeniería Industrial',
        description: 'Optimización de procesos y sistemas productivos para mejorar la eficiencia y la calidad.',
        summary: 'Enfoque en investigación de operaciones, logística, finanzas y gestión organizacional. Total créditos: 168.'
    },
    {
        id: 'quimica',
        code: '2549', // Código SIA Química
        name: 'Ingeniería Química',
        description: 'Diseño y operación de procesos para transformar materias primas en productos útiles.',
        summary: 'Centrado en termodinámica, fenómenos de transporte y diseño de plantas químicas. Total créditos: 180.'
    },
    {
        id: 'civil',
        code: '2542', // Código SIA Civil
        name: 'Ingeniería Civil',
        description: 'Planificación, diseño, construcción y mantenimiento de infraestructuras.',
        summary: 'Abarca estructuras, geotecnia, vías y transporte, e hidráulica. Total créditos: 180.'
    },
    {
        id: 'agricola',
        code: '2541', // Código SIA Agrícola
        name: 'Ingeniería Agrícola',
        description: 'Aplicación de principios de ingeniería para mejorar la producción y procesamiento agropecuario.',
        summary: 'Combina conocimientos de biología y agricultura con mecánica e hidráulica. Total créditos: 180.'
    },
    {
        id: 'electrica',
        code: '2544', // Código SIA Eléctrica
        name: 'Ingeniería Eléctrica',
        description: 'Diseño y desarrollo de sistemas de energía eléctrica y electrónicos de potencia.',
        summary: 'Estudio profundo de circuitos, conversión de energía y sistemas de potencia. Total créditos: 165.'
    },
    {
        id: 'electronica',
        code: '2548', // Código SIA Electrónica (Corregido)
        name: 'Ingeniería Electrónica',
        description: 'Desarrollo de circuitos y sistemas electrónicos para telecomunicaciones y automatización.',
        summary: 'Énfasis en procesamiento de señales, control, telecomunicaciones y sistemas digitales.'
    },
    {
        id: 'mecatronica',
        code: '2879', // Código SIA Mecatrónica (Aprox)
        name: 'Ingeniería Mecatrónica',
        description: 'Integración de mecánica, electrónica, control y computación para diseñar productos inteligentes.',
        summary: 'Sinergia entre sistemas mecánicos, electrónicos y de control por computador.'
    },
    {
        id: 'mecanica',
        code: '2547', // Código SIA Mecánica
        name: 'Ingeniería Mecánica',
        description: 'Diseño, análisis, fabricación y mantenimiento de sistemas mecánicos.',
        summary: 'Fundamentos sólidos en materiales, termofluidos, diseño de máquinas y manufactura. Total créditos: 180.'
    }
];