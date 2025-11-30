export interface ChangeLog {
    id: number;
    date: string;
    user: string;
    action: 'Edición' | 'Creación' | 'Carga Masiva' | 'Eliminación';
    details: string;
}

export const mockChangeHistory: ChangeLog[] = [
    {
        id: 1,
        date: '2025-10-26 14:30',
        user: 'Frank Olmos',
        action: 'Edición',
        details: 'Actualización de créditos para CAPP3005'
    },
    {
        id: 2,
        date: '2025-10-26 10:15',
        user: 'AdminDepto',
        action: 'Creación',
        details: 'Nueva asignatura: INTRO2001 - Introducción a la IA'
    },
    {
        id: 3,
        date: '2025-10-25 17:00',
        user: 'Frank Olmos',
        action: 'Carga Masiva',
        details: 'Malla curricular de Ingeniería de Sistemas (V2023-2)'
    },
    {
        id: 4,
        date: '2025-10-25 09:45',
        user: 'AdminDepto',
        action: 'Eliminación',
        details: 'Eliminación de asignatura antigua: BING1001'
    },
    {
        id: 5,
        date: '2025-10-24 11:20',
        user: 'Frank Olmos',
        action: 'Edición',
        details: 'Modificación de prerrequisitos para REDES4003'
    }
];