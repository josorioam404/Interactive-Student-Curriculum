INSERT INTO Program (program_code_sia, name, snies_code, total_credits, faculty)
VALUES ('2546', 'Ingeniería Industrial', '16940', 168, 'Ingeniería')
ON CONFLICT (program_code_sia) DO NOTHING;
INSERT INTO Subject (subject_code, name, credits) VALUES 
-- Fundamentación: Matemáticas (Optativas)
('1000004', 'Cálculo Diferencial', 4),
('2016377', 'Cálculo Diferencial en una Variable', 4),
('1000005', 'Cálculo Integral', 4),
('2015556', 'Cálculo Integral en una Variable', 4),
('1000006', 'Cálculo en Varias Variables', 4),
('2015162', 'Cálculo Vectorial', 4),
('1000003', 'Álgebra Lineal', 4),
('2015555', 'Álgebra Lineal Básica', 4),
('1000007', 'Ecuaciones Diferenciales', 4),
('2016342', 'Cálculo de Ecuaciones Diferenciales Ordinarias', 4),
-- Fundamentación: Probabilidad y Estadística (Obligatorias)
('2027877', 'Probabilidad Fundamental', 4),
('2027878', 'Inferencia Estadística Fundamental', 4),
-- Fundamentación: Física (Obligatorias)
('1000019', 'Fundamentos de Mecánica', 4),
('1000017', 'Fundamentos de Electricidad y Magnetismo', 4),
-- Fundamentación: Programación (Obligatorias)
('2015734', 'Programación de Computadores', 3),
('2016375', 'Programación Orientada a Objetos', 3),

-- Disciplinar: Administración y Gestión (Optativas)
('2026551', 'Creación y Gestión de Empresas', 3), 
('2016007', 'Fundamentos de Administración', 4), 
('2015702', 'Gerencia y Gestión de Proyectos', 3), 
('2016028', 'Diseño, Gestión y Evaluación de Proyectos', 4), 
('2016600', 'Gestión Tecnológica', 3), 
('2016599', 'Gestión de la Ciencia, la Tecnología y la Innovación', 3), 
('2015701', 'Gerencia de recursos Humanos', 3), 
('2016111', 'Administración de Personal I', 4), 

-- Disciplinar: Economía y Finanzas
('2025986', 'Ingeniería Económica y Análisis de Riesgo', 3), 
('2016592', 'Economía General', 3), 
('2016017', 'Microeconomía I', 3), 
('2016610', 'Sistemas de Costos', 4), 
('2016038', 'Fundamentos de Contabilidad de Gestión', 4), 
('2016741', 'Finanzas', 3), 
('2016037', 'Finanzas Avanzadas', 4), 

-- Disciplinar: Materiales y Procesos (Obligatorias)
('2025993', 'Taller de Ciencia y Tecnología de Materiales', 4), 
('2016619', 'Taller de Procesos Químicos y Biotecnológicos', 3), 
('2016618', 'Taller de Procesos Metalmecánicos', 3), 

-- Disciplinar: Sistemas, Modelos, Optimización y Simulación
('2025987', 'Modelos Estocásticos para Procesos de Manufactura y Sistemas de Servicios', 3), 
('2025988', 'Taller de Simulación de Procesos de Manufactura y Sistemas de Servicios', 3), 
('2025971', 'Optimización', 3), 
('2015173', 'Introducción a la Optimización', 4), 
('2025970', 'Modelos y Simulación', 3), 
('2015177', 'Modelos Matemáticos', 4), 

-- Disciplinar: Producción y Operaciones
('2016609', 'Seguridad Industrial', 3), 
('2016613', 'Taller de Ergonomía e Ingeniería de Métodos', 4), 
('2016614', 'Taller de Ingeniería de la Producción', 4), 
('2016612', 'Taller de Diseño de Plantas', 4), 
('2016605', 'Logística', 3), 
('2016589', 'Control y Gestión de Calidad', 3),  
('2016316', 'Control de Calidad y Sistemas de Gestión', 3),  
('2016317', 'Control Estadístico de Calidad', 3),

-- Disciplinar: Sociohumanística (Obligatorias)
('2015811', 'Sociología Especial: Industrial y del Trabajo', 3),  
('2016615', 'Taller de Invención y Creatividad', 3),  
('2016616', 'Taller de Metodología de la Investigación', 3),  

-- Disciplinar: Sistemas de Información (Optativas)
('2025982', 'Sistemas de Información', 3),  
('2016053', 'Sistemas de Información Gerencial', 4),

-- Disciplinar: Contexto Profesional y Proyectos de Ingeniería (Obligatorias)
('2026805', 'Introducción a la Ingeniería Industrial', 3),  
('2026488', 'Taller de Herramientas y Problemas en Ingeniería Industrial', 3),  

-- Disciplinar: Trabajo de Grado (Optativas - Se requieren 6 créditos)
('2025990', 'Trabajo de Grado- Modalidad Trabajos de Investigación', 6),  
('2025989', 'Trabajo de Grado- Modalidad Práctica de Extensión', 6),  
('2015321', 'Trabajo de Grado – Asignaturas de Posgrado', 6),

-- Libre Elección: Profundización (Optativas)
('2024045', 'Taller de Proyectos Interdisciplinarios', 3),  
('2016762', 'Práctica Estudiantil I', 3),  
('2016763', 'Práctica Estudiantil II', 6),  
('2016764', 'Práctica Estudiantil III', 9),  
('1000070', 'Práctica Colombia I', 3),  
('1000071', 'Práctica Colombia II', 6),  
('1000072', 'Práctica Colombia III', 9),  
('2016366', 'Estadística Descriptiva y Exploratoria', 4),  
('2016360', 'Análisis de Regresión', 4),  
('2016369', 'Muestreo Estadístico', 4),  
('2016368', 'Métodos No Paramétricos', 4),  
('2015970', 'Métodos Numéricos', 3),  
('1000011', 'Fundamentos de Ecología', 3),  
('1000024', 'Principios de Química', 3),  
('1000009', 'Biología General', 3),  
('1000040', 'Introducción a la Ciencia de Materiales', 3),  
('2016642', 'Termodinámica', 3),  
('2015270', 'Fundamentos de Economía', 3),  
('2016039', 'Fundamentos de Finanzas', 4)  
ON CONFLICT (subject_code) DO NOTHING;
WITH InsertedGroups AS (
    INSERT INTO CurriculumGroup (program_code_sia, component, group_name, required_credits_total, required_credits_obligatory) VALUES
    ('2546', 'Foundational', 'Matemáticas', 20, 0),
    ('2546', 'Foundational', 'Probabilidad y Estadística', 8, 8),
    ('2546', 'Foundational', 'Física', 8, 8),
    ('2546', 'Foundational', 'Programación', 6, 6),
    ('2546', 'Disciplinary', 'Administración y Gestión', 12, 0),
    ('2546', 'Disciplinary', 'Economía y Finanzas', 13, 3),
    ('2546', 'Disciplinary', 'Materiales y Procesos', 10, 10),
    ('2546', 'Disciplinary', 'Sistemas, Modelos, Optimización y Simulación', 12, 6),
    ('2546', 'Disciplinary', 'Producción y Operaciones', 21, 18),
    ('2546', 'Disciplinary', 'Sociohumanística', 9, 9),
    ('2546', 'Disciplinary', 'Sistemas de Información', 3, 0),
    ('2546', 'Disciplinary', 'Contexto Profesional y Proyectos', 6, 6),
    ('2546', 'Disciplinary', 'Trabajo de Grado', 6, 6),
    ('2546', 'Free Elective', 'Profundización', 34, 0)
    RETURNING group_id, group_name, component
)
SELECT * FROM InsertedGroups;
WITH GroupMap AS (
    SELECT group_id, group_name, component FROM CurriculumGroup WHERE program_code_sia = '2546'
)
INSERT INTO StudyPlan (program_code_sia, subject_code, suggested_semester, component, is_obligatory, group_id, prereq_rules)
SELECT '2546', T1.subject_code, T1.suggested_semester, T1.component, T1.is_obligatory, gm.group_id, T1.prereq_rules
FROM (
    VALUES
        -- == FUNDAMENTACIÓN: MATEMÁTICAS (Alternativas A y B) ==
    -- Cálculo Diferencial (4 cr)
    ('1000004', 1, 'Foundational', FALSE, 'Matemáticas', NULL),
    ('2016377', 1, 'Foundational', FALSE, 'Matemáticas', NULL),
    
    -- Cálculo Integral (4 cr) - Requiere Diferencial (1000004 O 2016377)
    ('1000005', 2, 'Foundational', FALSE, 'Matemáticas', '[{"subject_code": "1000004", "type": "Prerrequisito"}, {"subject_code": "2016377", "type": "Prerrequisito", "condition": "Alternativa"}]'::jsonb),
    ('2015556', 2, 'Foundational', FALSE, 'Matemáticas', '[{"subject_code": "1000004", "type": "Prerrequisito"}, {"subject_code": "2016377", "type": "Prerrequisito", "condition": "Alternativa"}]'::jsonb),

    -- Álgebra Lineal (4 cr) - Requiere Diferencial
    ('1000003', 2, 'Foundational', FALSE, 'Matemáticas', '[{"subject_code": "1000004", "type": "Prerrequisito"}, {"subject_code": "2016377", "type": "Prerrequisito", "condition": "Alternativa"}]'::jsonb),
    ('2015555', 2, 'Foundational', FALSE, 'Matemáticas', '[{"subject_code": "1000004", "type": "Prerrequisito"}, {"subject_code": "2016377", "type": "Prerrequisito", "condition": "Alternativa"}]'::jsonb),

    -- Cálculo Multivariado (4 cr) - Requiere Integral
    ('1000006', 3, 'Foundational', FALSE, 'Matemáticas', '[{"subject_code": "1000005", "type": "Prerrequisito"}, {"subject_code": "2015556", "type": "Prerrequisito", "condition": "Alternativa"}]'::jsonb),
    ('2015162', 3, 'Foundational', FALSE, 'Matemáticas', '[{"subject_code": "1000005", "type": "Prerrequisito"}, {"subject_code": "2015556", "type": "Prerrequisito", "condition": "Alternativa"}]'::jsonb),

    -- Ecuaciones Diferenciales (4 cr) - Requiere Integral Y Álgebra Lineal
    ('1000007', 3, 'Foundational', FALSE, 'Matemáticas', '[{"subject_code": "1000005", "type": "Prerrequisito"}, {"subject_code": "2015556", "type": "Prerrequisito", "condition": "Alternativa"}, {"subject_code": "1000003", "type": "Prerrequisito"}, {"subject_code": "2015555", "type": "Prerrequisito", "condition": "Alternativa"}]'::jsonb),
    ('2016342', 3, 'Foundational', FALSE, 'Matemáticas', '[{"subject_code": "1000005", "type": "Prerrequisito"}, {"subject_code": "2015556", "type": "Prerrequisito", "condition": "Alternativa"}, {"subject_code": "1000003", "type": "Prerrequisito"}, {"subject_code": "2015555", "type": "Prerrequisito", "condition": "Alternativa"}]'::jsonb),

    -- == PROBABILIDAD Y ESTADÍSTICA ==
    -- Probabilidad Fundamental - Requiere Integral
    ('2027877', 3, 'Foundational', TRUE, 'Probabilidad y Estadística', '[{"subject_code": "1000005", "type": "Prerrequisito"}, {"subject_code": "2015556", "type": "Prerrequisito", "condition": "Alternativa"}]'::jsonb),
    -- Inferencia - Requiere Probabilidad
    ('2027878', 4, 'Foundational', TRUE, 'Probabilidad y Estadística', '[{"subject_code": "2027877", "type": "Prerrequisito"}]'::jsonb),

    -- == FÍSICA ==
    -- Mecánica - Requiere Diferencial
    ('1000019', 2, 'Foundational', TRUE, 'Física', '[{"subject_code": "1000004", "type": "Prerrequisito"}, {"subject_code": "2016377", "type": "Prerrequisito", "condition": "Alternativa"}]'::jsonb),
    -- Electricidad y Magnetismo - Requiere Mecánica e Integral
    ('1000017', 3, 'Foundational', TRUE, 'Física', '[{"subject_code": "1000019", "type": "Prerrequisito"}, {"subject_code": "1000005", "type": "Prerrequisito"}, {"subject_code": "2015556", "type": "Prerrequisito", "condition": "Alternativa"}]'::jsonb),

    -- == PROGRAMACIÓN ==
    ('2015734', 1, 'Foundational', TRUE, 'Programación', NULL),
    ('2016375', 2, 'Foundational', TRUE, 'Programación', '[{"subject_code": "2015734", "type": "Prerrequisito"}]'::jsonb),

    -- == CONTEXTO PROFESIONAL ==
    ('2026805', 1, 'Disciplinary', TRUE, 'Contexto Profesional', NULL),
    -- Taller de Herramientas: Requiere Introducción a II, POO y Diferencial
    ('2026488', 2, 'Disciplinary', TRUE, 'Contexto Profesional', '[{"subject_code": "2026805", "type": "Prerrequisito"}, {"subject_code": "2016375", "type": "Prerrequisito"}, {"subject_code": "1000004", "type": "Prerrequisito"}, {"subject_code": "2016377", "type": "Prerrequisito", "condition": "Alternativa"}]'::jsonb),

    -- == ECONOMÍA Y FINANZAS ==
    -- Economía General: Requiere Diferencial e Introducción
    ('2016592', 3, 'Disciplinary', FALSE, 'Economía y Finanzas', '[{"subject_code": "2026805", "type": "Prerrequisito"}, {"subject_code": "1000004", "type": "Prerrequisito"}, {"subject_code": "2016377", "type": "Prerrequisito", "condition": "Alternativa"}]'::jsonb),
    -- Microeconomía I (Alternativa de Economía General): Mismos requisitos
    ('2016017', 3, 'Disciplinary', FALSE, 'Economía y Finanzas', '[{"subject_code": "2026805", "type": "Prerrequisito"}, {"subject_code": "1000004", "type": "Prerrequisito"}, {"subject_code": "2016377", "type": "Prerrequisito", "condition": "Alternativa"}]'::jsonb),
    
    -- Sistemas de Costos: Requiere Economía y Taller Herramientas
    ('2016610', 4, 'Disciplinary', FALSE, 'Economía y Finanzas', '[{"subject_code": "2026488", "type": "Prerrequisito"}, {"subject_code": "2016592", "type": "Prerrequisito"}, {"subject_code": "2016017", "type": "Prerrequisito", "condition": "Alternativa"}]'::jsonb),
    -- Contabilidad de Gestión (Alternativa de Costos)
    ('2016038', 4, 'Disciplinary', FALSE, 'Economía y Finanzas', '[{"subject_code": "2026488", "type": "Prerrequisito"}, {"subject_code": "2016592", "type": "Prerrequisito"}, {"subject_code": "2016017", "type": "Prerrequisito", "condition": "Alternativa"}]'::jsonb),

    -- Ing. Económica: Requiere Multivariado y Costos
    ('2025986', 5, 'Disciplinary', TRUE, 'Economía y Finanzas', '[{"subject_code": "1000006", "type": "Prerrequisito"}, {"subject_code": "2015162", "type": "Prerrequisito", "condition": "Alternativa"}, {"subject_code": "2016610", "type": "Prerrequisito"}, {"subject_code": "2016038", "type": "Prerrequisito", "condition": "Alternativa"}]'::jsonb),

    -- Finanzas: Requiere Ing. Económica
    ('2016741', 6, 'Disciplinary', FALSE, 'Economía y Finanzas', '[{"subject_code": "2025986", "type": "Prerrequisito"}]'::jsonb),
    ('2016037', 6, 'Disciplinary', FALSE, 'Economía y Finanzas', '[{"subject_code": "2025986", "type": "Prerrequisito"}]'::jsonb),

    -- == MATERIALES ==
    ('2025993', 3, 'Disciplinary', TRUE, 'Materiales y Procesos', '[{"subject_code": "1000019", "type": "Prerrequisito"}]'::jsonb),
    ('2016618', 4, 'Disciplinary', TRUE, 'Materiales y Procesos', '[{"subject_code": "2025993", "type": "Prerrequisito"}]'::jsonb),
    ('2016619', 4, 'Disciplinary', TRUE, 'Materiales y Procesos', '[{"subject_code": "2025993", "type": "Prerrequisito"}]'::jsonb),

    -- == SISTEMAS Y OPTIMIZACIÓN ==
    -- Optimización: Requiere Multivariado y Lineal
    ('2025971', 5, 'Disciplinary', FALSE, 'Sistemas, Modelos, Optimización', '[{"subject_code": "1000006", "type": "Prerrequisito"}, {"subject_code": "2015162", "type": "Prerrequisito", "condition": "Alternativa"}, {"subject_code": "1000003", "type": "Prerrequisito"}, {"subject_code": "2015555", "type": "Prerrequisito", "condition": "Alternativa"}]'::jsonb),
    ('2015173', 5, 'Disciplinary', FALSE, 'Sistemas, Modelos, Optimización', '[{"subject_code": "1000006", "type": "Prerrequisito"}, {"subject_code": "2015162", "type": "Prerrequisito", "condition": "Alternativa"}, {"subject_code": "1000003", "type": "Prerrequisito"}, {"subject_code": "2015555", "type": "Prerrequisito", "condition": "Alternativa"}]'::jsonb),

    -- Modelos y Simulación: Requiere Ecuaciones, Multivariado y Probabilidad
    ('2025970', 4, 'Disciplinary', FALSE, 'Sistemas, Modelos, Optimización', '[{"subject_code": "1000007", "type": "Prerrequisito"}, {"subject_code": "2016342", "type": "Prerrequisito", "condition": "Alternativa"}, {"subject_code": "2027877", "type": "Prerrequisito"}]'::jsonb),
    ('2015177', 4, 'Disciplinary', FALSE, 'Sistemas, Modelos, Optimización', '[{"subject_code": "1000007", "type": "Prerrequisito"}, {"subject_code": "2016342", "type": "Prerrequisito", "condition": "Alternativa"}, {"subject_code": "2027877", "type": "Prerrequisito"}]'::jsonb),

    -- Modelos Estocásticos: Requiere Optimización, Modelos e Inferencia
    ('2025987', 6, 'Disciplinary', TRUE, 'Sistemas, Modelos, Optimización', '[{"subject_code": "2025971", "type": "Prerrequisito"}, {"subject_code": "2015173", "type": "Prerrequisito", "condition": "Alternativa"}, {"subject_code": "2025970", "type": "Prerrequisito"}, {"subject_code": "2015177", "type": "Prerrequisito", "condition": "Alternativa"}, {"subject_code": "2027878", "type": "Prerrequisito"}]'::jsonb),
    
    ('2025988', 7, 'Disciplinary', TRUE, 'Sistemas, Modelos, Optimización', '[{"subject_code": "2025987", "type": "Prerrequisito"}]'::jsonb),

    -- == PRODUCCIÓN ==
    ('2016609', 5, 'Disciplinary', TRUE, 'Producción y Operaciones', '[{"subject_code": "1000017", "type": "Prerrequisito"}]'::jsonb),
    -- Taller Ergonomía: Requiere Optimización y Procesos Metalmecánicos
    ('2016613', 6, 'Disciplinary', TRUE, 'Producción y Operaciones', '[{"subject_code": "2016618", "type": "Prerrequisito"}, {"subject_code": "2025971", "type": "Prerrequisito"}, {"subject_code": "2015173", "type": "Prerrequisito", "condition": "Alternativa"}]'::jsonb),
    
    -- Taller Ingeniería Producción: Requiere Ergonomía y Estocásticos
    ('2016614', 7, 'Disciplinary', TRUE, 'Producción y Operaciones', '[{"subject_code": "2016613", "type": "Prerrequisito"}, {"subject_code": "2025987", "type": "Prerrequisito"}]'::jsonb),
    
    ('2016612', 8, 'Disciplinary', TRUE, 'Producción y Operaciones', '[{"subject_code": "2016609", "type": "Prerrequisito"}, {"subject_code": "2016614", "type": "Prerrequisito"}]'::jsonb),
    ('2016605', 8, 'Disciplinary', TRUE, 'Producción y Operaciones', '[{"subject_code": "2025988", "type": "Prerrequisito"}]'::jsonb),

    -- Control de Calidad: Requiere Inferencia y Administración
    ('2016589', 5, 'Disciplinary', FALSE, 'Producción y Operaciones', '[{"subject_code": "2027878", "type": "Prerrequisito"}, {"subject_code": "2026551", "type": "Prerrequisito"}, {"subject_code": "2016007", "type": "Prerrequisito", "condition": "Alternativa"}]'::jsonb),
    ('2016316', 5, 'Disciplinary', FALSE, 'Producción y Operaciones', '[{"subject_code": "2027878", "type": "Prerrequisito"}, {"subject_code": "2026551", "type": "Prerrequisito"}, {"subject_code": "2016007", "type": "Prerrequisito", "condition": "Alternativa"}]'::jsonb),
    ('2016317', 5, 'Disciplinary', FALSE, 'Producción y Operaciones', '[{"subject_code": "2027878", "type": "Prerrequisito"}, {"subject_code": "2026551", "type": "Prerrequisito"}, {"subject_code": "2016007", "type": "Prerrequisito", "condition": "Alternativa"}]'::jsonb),

    -- == ADMINISTRACIÓN Y GESTIÓN ==
    ('2026551', 4, 'Disciplinary', FALSE, 'Administración y Gestión', '[{"subject_code": "2016615", "type": "Prerrequisito"}, {"subject_code": "2016592", "type": "Prerrequisito"}, {"subject_code": "2016017", "type": "Prerrequisito", "condition": "Alternativa"}]'::jsonb),
    ('2016007', 4, 'Disciplinary', FALSE, 'Administración y Gestión', '[{"subject_code": "2016615", "type": "Prerrequisito"}, {"subject_code": "2016592", "type": "Prerrequisito"}, {"subject_code": "2016017", "type": "Prerrequisito", "condition": "Alternativa"}]'::jsonb),
    
    ('2015702', 6, 'Disciplinary', FALSE, 'Administración y Gestión', '[{"subject_code": "2025986", "type": "Prerrequisito"}]'::jsonb),
    ('2016028', 6, 'Disciplinary', FALSE, 'Administración y Gestión', '[{"subject_code": "2025986", "type": "Prerrequisito"}]'::jsonb),
    
    ('2016600', 7, 'Disciplinary', FALSE, 'Administración y Gestión', '[{"subject_code": "2026551", "type": "Prerrequisito"}, {"subject_code": "2016007", "type": "Prerrequisito", "condition": "Alternativa"}]'::jsonb),
    ('2016599', 7, 'Disciplinary', FALSE, 'Administración y Gestión', '[{"subject_code": "2026551", "type": "Prerrequisito"}, {"subject_code": "2016007", "type": "Prerrequisito", "condition": "Alternativa"}]'::jsonb),

    ('2015701', 8, 'Disciplinary', FALSE, 'Administración y Gestión', '[{"subject_code": "2016609", "type": "Prerrequisito"}]'::jsonb),
    ('2016111', 8, 'Disciplinary', FALSE, 'Administración y Gestión', '[{"subject_code": "2016609", "type": "Prerrequisito"}]'::jsonb),

    -- == SOCIOHUMANÍSTICA ==
    ('2016615', 2, 'Disciplinary', TRUE, 'Sociohumanística', '[{"subject_code": "2026805", "type": "Prerrequisito"}]'::jsonb),
    ('2016616', 4, 'Disciplinary', TRUE, 'Sociohumanística', '[{"subject_code": "2016615", "type": "Prerrequisito"}, {"subject_code": "2027878", "type": "Prerrequisito"}]'::jsonb),

    -- == SISTEMAS DE INFORMACIÓN ==
    ('2025982', 7, 'Disciplinary', FALSE, 'Sistemas de Información', '[{"subject_code": "2015702", "type": "Prerrequisito"}, {"subject_code": "2016028", "type": "Prerrequisito", "condition": "Alternativa"}]'::jsonb),
    ('2016053', 7, 'Disciplinary', FALSE, 'Sistemas de Información', '[{"subject_code": "2015702", "type": "Prerrequisito"}, {"subject_code": "2016028", "type": "Prerrequisito", "condition": "Alternativa"}]'::jsonb),

    -- == TRABAJO DE GRADO ==
    ('2025990', 9, 'Disciplinary', TRUE, 'Trabajo de Grado', '[{"credit_rule": 70, "component": "Disciplinary"}]'::jsonb),
    ('2025989', 9, 'Disciplinary', TRUE, 'Trabajo de Grado', '[{"credit_rule": 70, "component": "Disciplinary"}]'::jsonb),
    ('2015321', 9, 'Disciplinary', TRUE, 'Trabajo de Grado', '[{"credit_rule": 70, "component": "Disciplinary"}]'::jsonb),
    -- Profundización (0 Créditos Obligatorios)
    ('2024045', 7, 'Free Elective', FALSE, 'Profundización', '{"credits": {"component": "Disciplinary", "type": "Approved", "min_credits": 40}, "subjects": [{"code": "2015702", "type": "Prerrequisito"}]}'::jsonb),

    -- Prácticas Estudiantiles (Requieren 45 créditos disciplinares aprobados)
    ('2016762', 8, 'Free Elective', FALSE, 'Profundización', '{"credits": {"component": "Disciplinary", "type": "Approved", "min_credits": 45}}'::jsonb),
    ('2016763', 8, 'Free Elective', FALSE, 'Profundización', '{"credits": {"component": "Disciplinary", "type": "Approved", "min_credits": 45}}'::jsonb),
    ('2016764', 8, 'Free Elective', FALSE, 'Profundización', '{"credits": {"component": "Disciplinary", "type": "Approved", "min_credits": 45}}'::jsonb),

    -- Prácticas Colombia (Requieren 45 créditos disciplinares aprobados)
    ('1000070', 8, 'Free Elective', FALSE, 'Profundización', '{"credits": {"component": "Disciplinary", "type": "Approved", "min_credits": 45}}'::jsonb),
    ('1000071', 8, 'Free Elective', FALSE, 'Profundización', '{"credits": {"component": "Disciplinary", "type": "Approved", "min_credits": 45}}'::jsonb),
    ('1000072', 8, 'Free Elective', FALSE, 'Profundización', '{"credits": {"component": "Disciplinary", "type": "Approved", "min_credits": 45}}'::jsonb)
) AS T1(subject_code, suggested_semester, component, is_obligatory, group_name, prereq_rules)
JOIN GroupMap gm ON T1.group_name = gm.group_name AND T1.component = gm.component;   

