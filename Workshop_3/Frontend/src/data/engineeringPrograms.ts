export interface ProgramInfo {
    id: string;
    name: string;
    description: string;
    summary: string; // Dummy data para el resumen inferior
}

export const engineeringPrograms: ProgramInfo[] = [
    {
        id: 'sistemas',
        name: 'Ingeniería de Sistemas y Computación',
        description: 'Formación en diseño, desarrollo y gestión de sistemas de información, software y hardware.',
        summary: 'El programa cuenta con 160 créditos académicos, enfocados en desarrollo de software, ciencias de la computación y gestión TI.'
    },
    {
        id: 'industrial',
        name: 'Ingeniería Industrial',
        description: 'Optimización de procesos y sistemas productivos para mejorar la eficiencia y la calidad.',
        summary: 'Enfoque en investigación de operaciones, logística, finanzas y gestión organizacional.'
    },
    {
        id: 'quimica',
        name: 'Ingeniería Química',
        description: 'Diseño y operación de procesos para transformar materias primas en productos útiles.',
        summary: 'Centrado en termodinámica, fenómenos de transporte y diseño de plantas químicas.'
    },
    {
        id: 'civil',
        name: 'Ingeniería Civil',
        description: 'Planificación, diseño, construcción y mantenimiento de infraestructuras.',
        summary: 'Abarca estructuras, geotecnia, vías y transporte, e hidráulica.'
    },
    {
        id: 'agricola',
        name: 'Ingeniería Agrícola',
        description: 'Aplicación de principios de ingeniería para mejorar la producción y procesamiento agropecuario.',
        summary: 'Combina conocimientos de biología y agricultura con mecánica e hidráulica.'
    },
    {
        id: 'electrica',
        name: 'Ingeniería Eléctrica',
        description: 'Diseño y desarrollo de sistemas de energía eléctrica y electrónicos de potencia.',
        summary: 'Estudio profundo de circuitos, conversión de energía y sistemas de potencia.'
    },
    {
        id: 'electronica',
        name: 'Ingeniería Electrónica',
        description: 'Desarrollo de circuitos y sistemas electrónicos para telecomunicaciones y automatización.',
        summary: 'Énfasis en procesamiento de señales, control, telecomunicaciones y sistemas digitales.'
    },
    {
        id: 'mecatronica',
        name: 'Ingeniería Mecatrónica',
        description: 'Integración de mecánica, electrónica, control y computación para diseñar productos inteligentes.',
        summary: 'Sinergia entre sistemas mecánicos, electrónicos y de control por computador.'
    },
    {
        id: 'mecanica',
        name: 'Ingeniería Mecánica',
        description: 'Diseño, análisis, fabricación y mantenimiento de sistemas mecánicos.',
        summary: 'Fundamentos sólidos en materiales, termofluidos, diseño de máquinas y manufactura.'
    }
];