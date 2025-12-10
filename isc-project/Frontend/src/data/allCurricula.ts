import type { StudyPlanItem } from '../types';

// Función auxiliar para crear materias rápidamente
const create = (
  id: number, 
  progCode: string, 
  sem: number, 
  code: string, 
  name: string, 
  credits: number, 
  comp: string = 'Disciplinar'
): StudyPlanItem => ({
  id,
  program_code_sia: progCode,
  subject_code: code,
  suggested_semester: sem,
  component: comp,
  is_obligatory: true,
  subject: { code, name, credits, weekly_hours: credits }, // Estimado horas = créditos
  progress: { subject_code: code, status: 'Pending' }
});

export const allCurricula: Record<string, StudyPlanItem[]> = {
  
  // =======================================================
  // 2A74: INGENIERÍA DE SISTEMAS Y COMPUTACIÓN
  // Fuente: MallaCurricular-IngenieríaSistemas.pdf
  // =======================================================
  '2A74': [
    // Sem 1
    create(301, '2A74', 1, '1000004', 'Cálculo Diferencial', 4, 'Fundamentación'),
    create(302, '2A74', 1, '2016377', 'Programación Básica', 3, 'Disciplinar'),
    create(303, '2A74', 1, '1000001', 'Introducción a la Ingeniería', 2, 'Disciplinar'),
    // Sem 2
    create(304, '2A74', 2, '1000005', 'Cálculo Integral', 4, 'Fundamentación'),
    create(305, '2A74', 2, '2016375', 'Programación Orientada a Objetos', 3, 'Disciplinar'),
    create(306, '2A74', 2, '1000003', 'Álgebra Lineal', 4, 'Fundamentación'),
    // Sem 3
    create(307, '2A74', 3, '1000006', 'Cálculo en Varias Variables', 4, 'Fundamentación'),
    create(308, '2A74', 3, '2016378', 'Estructuras de Datos', 3, 'Disciplinar'),
    create(309, '2A74', 3, '1000019', 'Fundamentos de Mecánica', 4, 'Fundamentación'),
    create(310, '2A74', 3, '1000017', 'Fundamentos de Electricidad y Magnetismo', 4, 'Fundamentación'),
    // Sem 4
    create(311, '2A74', 4, '1000013', 'Probabilidad y Estadística', 3, 'Fundamentación'),
    create(312, '2A74', 4, '2015703', 'Ingeniería Económica', 3, 'Fundamentación'),
    create(313, '2A74', 4, '2025966', 'Matemáticas Discretas I', 3, 'Disciplinar'),
    // Sem 5
    create(314, '2A74', 5, '2025970', 'Modelos y Simulación', 3, 'Disciplinar'),
    create(315, '2A74', 5, '2015702', 'Gerencia de Proyectos', 3, 'Fundamentación'),
    create(316, '2A74', 5, '2025967', 'Matemáticas Discretas II', 4, 'Disciplinar'),
    create(317, '2A74', 5, '2016701', 'Ingeniería de Software I', 3, 'Disciplinar'),
    create(318, '2A74', 5, '2015174', 'Intro. a la Teoría de la Computación', 3, 'Disciplinar'),
    // Sem 6
    create(319, '2A74', 6, '2025971', 'Optimización', 3, 'Disciplinar'),
    create(320, '2A74', 6, '2025982', 'Sistemas de Información', 3, 'Disciplinar'),
    create(321, '2A74', 6, '2015970', 'Métodos Numéricos', 3, 'Fundamentación'),
    create(322, '2A74', 6, '2016702', 'Ingeniería de Software II', 3, 'Disciplinar'),
    create(323, '2A74', 6, '2016696', 'Algoritmos', 3, 'Disciplinar'),
    create(324, '2A74', 6, '2016707', 'Sistemas Operativos', 3, 'Disciplinar'),
    // Sem 7
    create(325, '2A74', 7, '2016716', 'Arquitectura de Software', 3, 'Disciplinar'),
    create(326, '2A74', 7, '2025960', 'Infraestructura y Gobierno de TIC', 3, 'Disciplinar'),
    create(327, '2A74', 7, '2019772', 'Lenguajes de Programación', 3, 'Disciplinar'),
    create(328, '2A74', 7, '2025965', 'Intro. a Sistemas Inteligentes', 3, 'Disciplinar'),
    // Sem 8
    create(329, '2A74', 8, '2025964', 'Computación Paralela y Distribuida', 3, 'Disciplinar'),
    create(330, '2A74', 8, '2025963', 'Computación Visual', 3, 'Disciplinar'),
    create(331, '2A74', 8, '2024045', 'Taller de Proyectos Interdisciplinarios', 3, 'Disciplinar'),
    // Sem 10
    create(332, '2A74', 10, '2015289', 'Trabajo de Grado', 6, 'Disciplinar'),
  ],

  // =======================================================
  // 2546: INGENIERÍA INDUSTRIAL
  // Fuente: MallaCurricular-IngenieríaIndustrial.pdf
  // =======================================================
  '2546': [
    create(501, '2546', 1, '1000004', 'Cálculo Diferencial', 4, 'Fundamentación'),
    create(502, '2546', 1, '2015811', 'Sociología Especial', 3, 'Fundamentación'),
    create(503, '2546', 1, '2026805', 'Introducción a la Ing. Industrial', 3, 'Disciplinar'),
    create(504, '2546', 1, '2015734', 'Programación de Computadores', 3, 'Disciplinar'),
    
    create(505, '2546', 2, '1000005', 'Cálculo Integral', 4, 'Fundamentación'),
    create(506, '2546', 2, '1000003', 'Álgebra Lineal', 4, 'Fundamentación'),
    create(507, '2546', 2, '2016615', 'Taller de Invención y Creatividad', 3, 'Disciplinar'),
    create(508, '2546', 2, '2016375', 'Prog. Orientada a Objetos', 3, 'Disciplinar'),

    create(509, '2546', 3, '1000006', 'Cálculo en Varias Variables', 4, 'Fundamentación'),
    create(510, '2546', 3, '1000019', 'Fundamentos de Mecánica', 4, 'Fundamentación'),
    create(511, '2546', 3, '2016592', 'Economía General', 3, 'Fundamentación'),
    create(512, '2546', 3, '2026488', 'Taller Herramientas Ing. Ind.', 3, 'Disciplinar'),

    create(513, '2546', 4, '1000007', 'Ecuaciones Diferenciales', 4, 'Fundamentación'),
    create(514, '2546', 4, '1000017', 'Fundamentos Electricidad', 4, 'Fundamentación'),
    create(515, '2546', 4, '2016610', 'Sistemas de Costos', 4, 'Disciplinar'),
    create(516, '2546', 4, '2027877', 'Probabilidad Fundamental', 4, 'Disciplinar'),

    create(517, '2546', 5, '2025970', 'Modelos y Simulación', 3, 'Disciplinar'),
    create(518, '2546', 5, '2025971', 'Optimización', 3, 'Disciplinar'),
    create(519, '2546', 5, '2025986', 'Ingeniería Económica', 3, 'Fundamentación'),
    create(520, '2546', 5, '2016619', 'Taller Procesos Químicos', 3, 'Disciplinar'),
    create(521, '2546', 5, '2016618', 'Taller Proc. Metalmecánicos', 3, 'Disciplinar'),
    create(522, '2546', 5, '2027878', 'Inferencia Estadística', 4, 'Disciplinar'),

    create(523, '2546', 6, '2025987', 'Modelos Estocásticos', 3, 'Disciplinar'),
    create(524, '2546', 6, '2015702', 'Gerencia de Proyectos', 3, 'Disciplinar'),
    create(525, '2546', 6, '2016741', 'Finanzas', 3, 'Disciplinar'),
    create(526, '2546', 6, '2016613', 'Taller de Ergonomía', 4, 'Disciplinar'),
    create(527, '2546', 6, '2016589', 'Control y Gestión de Calidad', 3, 'Disciplinar'),

    create(528, '2546', 7, '2025988', 'Taller de Simulación', 3, 'Disciplinar'),
    create(529, '2546', 7, '2016609', 'Seguridad Industrial', 3, 'Disciplinar'),
    create(530, '2546', 7, '2016614', 'Ingeniería de la Producción', 4, 'Disciplinar'),
    create(531, '2546', 7, '2016616', 'Metodología Investigación', 3, 'Disciplinar'),

    create(532, '2546', 8, '2016605', 'Logística', 3, 'Disciplinar'),
    create(533, '2546', 8, '2016600', 'Gestión Tecnológica', 3, 'Disciplinar'),
    create(534, '2546', 8, '2016612', 'Diseño de Plantas', 4, 'Disciplinar'),
    create(535, '2546', 10, '2015289', 'Trabajo de Grado', 6, 'Disciplinar'),
  ],

  // =======================================================
  // 2542: INGENIERÍA CIVIL
  // Fuente: MallaCurricular-IngenieríaCivil.pdf
  // =======================================================
  '2542': [
    create(201, '2542', 1, '1000001', 'Matemática Básica', 4, 'Nivelación'),
    create(202, '2542', 1, '1000004', 'Cálculo Diferencial', 4, 'Fundamentación'),
    create(203, '2542', 1, '1000024', 'Principios de Química', 3, 'Fundamentación'),
    create(204, '2542', 1, '2015711', 'Dibujo Básico', 3, 'Disciplinar'),
    create(205, '2542', 1, '2026186', 'Introducción a la Ing. Civil', 3, 'Disciplinar'),

    create(206, '2542', 2, '1000003', 'Álgebra Lineal', 4, 'Fundamentación'),
    create(207, '2542', 2, '1000005', 'Cálculo Integral', 4, 'Fundamentación'),
    create(208, '2542', 2, '1000019', 'Fundamentos de Mecánica', 4, 'Fundamentación'),

    create(209, '2542', 3, '1000006', 'Cálculo en Varias Variables', 4, 'Fundamentación'),
    create(210, '2542', 3, '2026134', 'Estática', 3, 'Disciplinar'),
    create(211, '2542', 3, '2015958', 'Geomática Básica', 4, 'Disciplinar'),
    create(212, '2542', 3, '2015703', 'Ingeniería Económica', 3, 'Fundamentación'),

    create(213, '2542', 4, '1000007', 'Ecuaciones Diferenciales', 4, 'Fundamentación'),
    create(214, '2542', 4, '1000013', 'Probabilidad y Estadística', 3, 'Fundamentación'),
    create(215, '2542', 4, '2015948', 'Dinámica', 3, 'Disciplinar'),
    create(216, '2542', 4, '2015956', 'Geología', 3, 'Disciplinar'),
    create(217, '2542', 4, '2015957', 'Geomática Aplicada', 4, 'Disciplinar'),

    create(218, '2542', 5, '2015966', 'Mecánica de Fluidos', 4, 'Disciplinar'),
    create(219, '2542', 5, '2015968', 'Mecánica de Sólidos', 4, 'Disciplinar'),
    create(220, '2542', 5, '2015965', 'Materiales para Construcción', 3, 'Disciplinar'),

    create(221, '2542', 6, '2015961', 'Hidráulica Básica', 4, 'Disciplinar'),
    create(222, '2542', 6, '2015978', 'Hidrología', 3, 'Disciplinar'),
    create(223, '2542', 6, '2015941', 'Análisis Estructural Básico', 3, 'Disciplinar'),
    create(224, '2542', 6, '2015969', 'Mecánica de Suelos', 3, 'Disciplinar'),
    create(225, '2542', 6, '2026138', 'Ingeniería de Transporte', 3, 'Disciplinar'),

    create(226, '2542', 7, '2015954', 'Estructuras Hidráulicas', 3, 'Disciplinar'),
    create(227, '2542', 7, '2015938', 'Acueductos', 3, 'Disciplinar'),
    create(228, '2542', 7, '2015940', 'Análisis Estructural Aplicado', 3, 'Disciplinar'),
    create(229, '2542', 7, '2015959', 'Geotecnia', 3, 'Disciplinar'),
    create(230, '2542', 7, '2015963', 'Ingeniería de Tránsito', 3, 'Disciplinar'),

    create(231, '2542', 8, '2015950', 'Diseño Estructural', 3, 'Disciplinar'),
    create(232, '2542', 8, '2015971', 'Pavimentos', 3, 'Disciplinar'),
    create(233, '2542', 8, '2015949', 'Diseño Geométrico de Vías', 3, 'Disciplinar'),
    create(234, '2542', 9, '2015955', 'Fundamentos de Construcción', 3, 'Disciplinar'),
    create(235, '2542', 10, '2015289', 'Trabajo de Grado', 6, 'Disciplinar'),
  ],

  // =======================================================
  // 2549: INGENIERÍA QUÍMICA
  // Fuente: MallaCurricular-IngenieríaQuímica.pdf
  // =======================================================
  '2549': [
    create(701, '2549', 1, '1000024', 'Principios de Química', 3, 'Fundamentación'),
    create(702, '2549', 1, '1000025', 'Lab. Técnicas Básicas', 3, 'Fundamentación'),
    create(703, '2549', 1, '1000004', 'Cálculo Diferencial', 4, 'Fundamentación'),
    create(704, '2549', 1, '2015718', 'Intro. a la Ing. Química', 3, 'Disciplinar'),

    create(705, '2549', 2, '1000026', 'Principios Análisis Químico', 3, 'Fundamentación'),
    create(706, '2549', 2, '1000003', 'Álgebra Lineal', 4, 'Fundamentación'),
    create(707, '2549', 2, '1000005', 'Cálculo Integral', 4, 'Fundamentación'),
    create(708, '2549', 2, '2015708', 'Balance de Materia', 3, 'Disciplinar'),

    create(709, '2549', 3, '1000027', 'Lab. Análisis Químico', 3, 'Fundamentación'),
    create(710, '2549', 3, '1000025', 'Biología Molecular', 3, 'Fundamentación'),
    create(711, '2549', 3, '1000006', 'Cálculo en Varias Var.', 4, 'Fundamentación'),
    create(712, '2549', 3, '1000017', 'Fundamentos Electricidad', 4, 'Fundamentación'),
    create(713, '2549', 3, '2015741', 'Termodinámica', 3, 'Disciplinar'),

    create(714, '2549', 4, '1000028', 'Principios Quím. Inorgánica', 3, 'Fundamentación'),
    create(715, '2549', 4, '1000013', 'Probabilidad y Estadística', 3, 'Fundamentación'),
    create(716, '2549', 4, '1000007', 'Ecuaciones Diferenciales', 4, 'Fundamentación'),
    create(717, '2549', 4, '2015714', 'Fluidos', 3, 'Disciplinar'),
    create(718, '2549', 4, '2015740', 'Termodinámica Química', 3, 'Disciplinar'),

    create(719, '2549', 5, '1000030', 'Principios Quím. Orgánica', 3, 'Fundamentación'),
    create(720, '2549', 5, '2015970', 'Métodos Numéricos', 3, 'Disciplinar'),
    create(721, '2549', 5, '2015743', 'Transferencia de Calor', 4, 'Disciplinar'),
    create(722, '2549', 5, '2015276', 'Manejo de Sólidos', 3, 'Disciplinar'),
    create(723, '2549', 5, '2015707', 'Balance de Energía y Eq.', 3, 'Disciplinar'),

    create(724, '2549', 6, '1000010', 'Lab. Química Orgánica', 2, 'Fundamentación'),
    create(725, '2549', 6, '2015703', 'Ingeniería Económica', 3, 'Fundamentación'),
    create(726, '2549', 6, '2015744', 'Transferencia de Masa', 3, 'Disciplinar'),
    create(727, '2549', 6, '2015721', 'Lab. Propiedades Termo.', 3, 'Disciplinar'),
    create(728, '2549', 6, '2015716', 'Ing. de Reacciones', 3, 'Disciplinar'),

    create(729, '2549', 7, '2015702', 'Gerencia de Proyectos', 3, 'Disciplinar'),
    create(730, '2549', 7, '2015731', 'Operaciones de Separación', 3, 'Disciplinar'),
    create(731, '2549', 7, '2015719', 'Lab. Fluidos y Sólidos', 3, 'Disciplinar'),
    create(732, '2549', 7, '2015713', 'Diseño Proc. Químicos', 3, 'Disciplinar'),

    create(733, '2549', 8, '2015710', 'Control de Procesos', 3, 'Disciplinar'),
    create(734, '2549', 8, '2015720', 'Lab. Operaciones', 3, 'Disciplinar'),
    create(735, '2549', 9, '2015737', 'Taller Proyectos', 3, 'Disciplinar'),
    create(736, '2549', 9, '2015712', 'Diseño Plantas y Equipos', 3, 'Disciplinar'),
    create(737, '2549', 10, '2015289', 'Trabajo de Grado', 6, 'Disciplinar'),
  ],

  // =======================================================
  // 2541: INGENIERÍA AGRÍCOLA
  // Fuente: MallaCurricular-IngenieríaAgricola.pdf
  // =======================================================
  '2541': [
    create(101, '2541', 1, '2016635', 'Intro. a la Ing. Agrícola', 2, 'Disciplinar'),
    create(102, '2541', 1, '1000004', 'Cálculo Diferencial', 4, 'Fundamentación'),
    create(103, '2541', 1, '1000024', 'Principios de Química', 3, 'Fundamentación'),
    create(104, '2541', 1, '1000009', 'Biología General', 3, 'Fundamentación'),
    create(105, '2541', 1, '2015711', 'Dibujo Básico', 3, 'Disciplinar'),

    create(106, '2541', 2, '1000003', 'Álgebra Lineal', 4, 'Fundamentación'),
    create(107, '2541', 2, '1000005', 'Cálculo Integral', 4, 'Fundamentación'),
    create(108, '2541', 2, '1000019', 'Fundamentos de Mecánica', 4, 'Fundamentación'),
    create(109, '2541', 2, '2015734', 'Programación Computadores', 3, 'Disciplinar'),

    create(110, '2541', 3, '1000006', 'Cálculo Varias Variables', 4, 'Fundamentación'),
    create(111, '2541', 3, '1000013', 'Probabilidad y Estadística', 3, 'Fundamentación'),
    create(112, '2541', 3, '2026134', 'Estática', 3, 'Disciplinar'),
    create(113, '2541', 3, '2015958', 'Geomática Básica', 4, 'Disciplinar'),

    create(114, '2541', 4, '1000007', 'Ecuaciones Diferenciales', 4, 'Fundamentación'),
    create(115, '2541', 4, '2017538', 'Fisiología Vegetal', 4, 'Disciplinar'),
    create(116, '2541', 4, '2016632', 'Suelos Agrícolas', 3, 'Disciplinar'),
    create(117, '2541', 4, '2015703', 'Ingeniería Económica', 3, 'Fundamentación'),

    create(118, '2541', 5, '2015966', 'Mecánica de Fluidos', 4, 'Disciplinar'),
    create(119, '2541', 5, '2015968', 'Mecánica de Sólidos', 4, 'Disciplinar'),
    create(120, '2541', 5, '2015741', 'Termodinámica', 3, 'Disciplinar'),

    create(121, '2541', 6, '2015961', 'Hidráulica Básica', 4, 'Disciplinar'),
    create(122, '2541', 6, '2015969', 'Mecánica de Suelos', 3, 'Disciplinar'),
    create(123, '2541', 6, '2015941', 'Análisis Estructural', 3, 'Disciplinar'),
    create(124, '2541', 6, '2016631', 'Elementos de Máquinas', 3, 'Disciplinar'),
    create(125, '2541', 6, '2016643', 'Transferencia Calor y Masa', 3, 'Disciplinar'),

    create(126, '2541', 7, '2016628', 'Ingeniería de Riegos', 3, 'Disciplinar'),
    create(127, '2541', 7, '2015978', 'Hidrología', 3, 'Disciplinar'),
    create(128, '2541', 7, '2016627', 'Diseño Estructuras Concreto', 3, 'Disciplinar'),
    create(129, '2541', 7, '2016633', 'Fuentes de Potencia', 3, 'Disciplinar'),

    create(130, '2541', 8, '2016625', 'Diseño Sistemas Riego', 3, 'Disciplinar'),
    create(131, '2541', 8, '2016629', 'Drenaje de Tierras', 3, 'Disciplinar'),
    create(132, '2541', 8, '2016636', 'Máquinas Agrícolas', 3, 'Disciplinar'),
    create(133, '2541', 8, '2015702', 'Gerencia de Proyectos', 3, 'Disciplinar'),

    create(134, '2541', 9, '2016630', 'Electrotecnia', 3, 'Disciplinar'),
    create(135, '2541', 9, '2024045', 'Taller Proyectos', 3, 'Disciplinar'),
    create(136, '2541', 10, '2016626', 'Control en Biosistemas', 3, 'Disciplinar'),
    create(137, '2541', 10, '2015289', 'Trabajo de Grado', 6, 'Disciplinar'),
  ],

  // =======================================================
  // 2544: INGENIERÍA ELÉCTRICA
  // Fuente: MallaCurricular-IngenieriaElectrica.pdf
  // =======================================================
  '2544': [
    create(401, '2544', 1, '1000004', 'Cálculo Diferencial', 4, 'Fundamentación'),
    create(402, '2544', 1, '2016854', 'Intro. Ing. Eléctrica', 2, 'Disciplinar'),
    create(403, '2544', 1, '2015734', 'Programación Computadores', 3, 'Disciplinar'),
    create(404, '2544', 1, '2010862', 'Taller Ing. Eléctrica', 1, 'Disciplinar'),

    create(405, '2544', 2, '1000005', 'Cálculo Integral', 4, 'Fundamentación'),
    create(406, '2544', 2, '1000003', 'Álgebra Lineal', 4, 'Fundamentación'),
    create(407, '2544', 2, '1000019', 'Fundamentos de Mecánica', 4, 'Fundamentación'),

    create(408, '2544', 3, '1000006', 'Cálculo Varias Variables', 4, 'Fundamentación'),
    create(409, '2544', 3, '1000007', 'Ecuaciones Diferenciales', 4, 'Fundamentación'),
    create(410, '2544', 3, '1000017', 'Fundamentos Electricidad', 4, 'Fundamentación'),
    create(411, '2544', 3, '1000041', 'Intro. Ciencia Materiales', 3, 'Fundamentación'),
    create(412, '2544', 3, '2016488', 'Circuitos Eléctricos I', 4, 'Disciplinar'),

    create(413, '2544', 4, '2015150', 'Variable Compleja', 3, 'Fundamentación'),
    create(414, '2544', 4, '1000021', 'Fund. Mecánica y Termo', 4, 'Fundamentación'),
    create(415, '2544', 4, '2016487', 'Campos Electromagnéticos', 3, 'Disciplinar'),
    create(416, '2544', 4, '2016495', 'Electrónica Análoga I', 4, 'Disciplinar'),

    create(417, '2544', 5, '1000013', 'Probabilidad y Estadística', 3, 'Fundamentación'),
    create(418, '2544', 5, '2016506', 'Señales y Sistemas I', 3, 'Disciplinar'),
    create(419, '2544', 5, '1000020', 'Fund. Oscilaciones y Ondas', 4, 'Fundamentación'),
    create(420, '2544', 5, '2016490', 'Circuitos Eléctricos II', 4, 'Disciplinar'),
    create(421, '2544', 5, '2016498', 'Electrónica Digital I', 4, 'Disciplinar'),

    create(422, '2544', 6, '2016507', 'Señales y Sistemas II', 3, 'Disciplinar'),
    create(423, '2544', 6, '2016494', 'Conversión Electromagnética', 4, 'Disciplinar'),
    create(424, '2544', 6, '2016603', 'Trasmisión y Distribución', 3, 'Disciplinar'),
    create(425, '2544', 6, '2016845', 'Mecánica para Ingeniería', 3, 'Disciplinar'),

    create(426, '2544', 7, '2015703', 'Ingeniería Económica', 3, 'Fundamentación'),
    create(427, '2544', 7, '2016483', 'Control', 4, 'Disciplinar'),
    create(428, '2544', 7, '2016861', 'Intro. Sist. Energía Eléc.', 4, 'Disciplinar'),
    create(429, '2544', 7, '2017003', 'Instalaciones Eléctricas', 3, 'Disciplinar'),

    create(430, '2544', 8, '2016851', 'Análisis Sist. Potencia', 4, 'Disciplinar'),
    
    create(431, '2544', 9, '2016864', 'Taller Proyectos', 3, 'Disciplinar'),
    create(432, '2544', 10, '2015289', 'Trabajo de Grado', 6, 'Disciplinar'),
  ],

  // =======================================================
  // 2547: INGENIERÍA MECÁNICA
  // Fuente: MallaCurricular-IngenieríaMecanica.pdf
  // =======================================================
  '2547': [
    create(601, '2547', 1, '1000004', 'Cálculo Diferencial', 4, 'Fundamentación'),
    create(602, '2547', 1, '2015734', 'Prog. de Computadores', 3, 'Disciplinar'),
    create(603, '2547', 1, '2015711', 'Dibujo Básico', 3, 'Disciplinar'),
    create(604, '2547', 1, '2017279', 'Tecnología Mecánica', 2, 'Disciplinar'),

    create(605, '2547', 2, '1000005', 'Cálculo Integral', 4, 'Fundamentación'),
    create(606, '2547', 2, '1000003', 'Álgebra Lineal', 4, 'Fundamentación'),
    create(607, '2547', 2, '1000019', 'Fundamentos de Mecánica', 4, 'Fundamentación'),
    create(608, '2547', 2, '2017257', 'Dibujo de Máquinas', 3, 'Disciplinar'),

    create(609, '2547', 3, '1000006', 'Cálculo Varias Variables', 4, 'Fundamentación'),
    create(610, '2547', 3, '1000013', 'Estadística Fundamental', 3, 'Fundamentación'),
    create(611, '2547', 3, '1000024', 'Principios de Química', 3, 'Fundamentación'),
    create(612, '2547', 3, '2016640', 'Principios de Estática', 3, 'Disciplinar'),

    create(613, '2547', 4, '1000007', 'Ecuaciones Diferenciales', 4, 'Fundamentación'),
    create(614, '2547', 4, '2017271', 'Principios de Dinámica', 3, 'Disciplinar'),
    create(615, '2547', 4, '2017260', 'Ciencia de Materiales', 3, 'Disciplinar'),
    create(616, '2547', 4, '2017278', 'Termodinámica Técnica', 3, 'Disciplinar'),

    create(617, '2547', 5, '2015970', 'Métodos Numéricos', 3, 'Disciplinar'),
    create(618, '2547', 5, '2017277', 'Resistencia Materiales', 3, 'Disciplinar'),
    create(619, '2547', 5, '2017268', 'Mecanismos', 3, 'Disciplinar'),
    create(620, '2547', 5, '2017267', 'Materiales de Ingeniería', 3, 'Disciplinar'),
    create(621, '2547', 5, '2017273', 'Mecánica de Fluidos', 3, 'Disciplinar'),
    create(622, '2547', 5, '2017266', 'Instalaciones Eléctricas', 3, 'Disciplinar'),

    create(623, '2547', 6, '2017293', 'Modelación Matemática', 3, 'Disciplinar'),
    create(624, '2547', 6, '2015703', 'Ingeniería Económica', 3, 'Fundamentación'),
    create(625, '2547', 6, '2017273', 'Procesos Manufactura I', 3, 'Disciplinar'),
    create(626, '2547', 6, '2017262', 'Ing. Térmica y Fluidos', 3, 'Disciplinar'),

    create(627, '2547', 7, '2015702', 'Gerencia de Proyectos', 3, 'Disciplinar'),
    create(628, '2547', 7, '2017259', 'Ingeniería de Diseño', 3, 'Disciplinar'),
    create(629, '2547', 7, '2017274', 'Procesos Manufactura II', 3, 'Disciplinar'),

    create(630, '2547', 8, '2017255', 'Diseño II', 3, 'Disciplinar'),
    create(631, '2547', 9, '2016503', 'Fundamentos Control', 3, 'Disciplinar'),
    create(632, '2547', 10, '2015289', 'Trabajo de Grado', 6, 'Disciplinar'),
  ]
};