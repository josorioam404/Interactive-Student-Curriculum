INSERT INTO Program (program_code_sia, name, snies_code, total_credits, faculty)
VALUES ('2546', 'Ingeniería Industrial', '16940', 168, 'Ingeniería')
ON CONFLICT (program_code_sia) DO NOTHING;
WITH ProgramData AS (
    SELECT program_code_sia FROM Program WHERE program_code_sia = '2546'
)
INSERT INTO CurriculumGroup (program_code_sia, component, group_name, required_credits_total, required_credits_obligatory)
SELECT '2546', 'Foundational', 'Matemáticas', 20, 0 FROM ProgramData UNION ALL
SELECT '2546', 'Foundational', 'Probabilidad y Estadística', 8, 8 FROM ProgramData UNION ALL
SELECT '2546', 'Foundational', 'Física', 8, 8 FROM ProgramData UNION ALL
SELECT '2546', 'Foundational', 'Programación', 6, 6 FROM ProgramData UNION ALL
SELECT '2546', 'Disciplinary', 'Administración y Gestión', 12, 0 FROM ProgramData UNION ALL
SELECT '2546', 'Disciplinary', 'Economía y Finanzas', 13, 3 FROM ProgramData UNION ALL
SELECT '2546', 'Disciplinary', 'Materiales y Procesos', 10, 10 FROM ProgramData UNION ALL
SELECT '2546', 'Disciplinary', 'Sistemas, Modelos, Optimización y Simulación', 12, 6 FROM ProgramData UNION ALL
SELECT '2546', 'Disciplinary', 'Producción y Operaciones', 21, 18 FROM ProgramData UNION ALL
SELECT '2546', 'Disciplinary', 'Sociohumanística', 9, 9 FROM ProgramData UNION ALL
SELECT '2546', 'Disciplinary', 'Sistemas de Información', 3, 0 FROM ProgramData UNION ALL
SELECT '2546', 'Disciplinary', 'Contexto Profesional y Proyectos de Ingeniería', 6, 6 FROM ProgramData UNION ALL
SELECT '2546', 'Disciplinary', 'Trabajo de Grado', 6, 6 FROM ProgramData UNION ALL
SELECT '2546', 'Free Elective', 'Profundización', 34, 0 FROM ProgramData
ON CONFLICT (program_code_sia, component, group_name) DO NOTHING;
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
WITH GroupIDs AS (
    SELECT group_id, group_name, component FROM CurriculumGroup WHERE program_code_sia = '2546'
)
INSERT INTO StudyPlan (program_code_sia, subject_code, suggested_semester, component, is_obligatory, group_id, prereq_rules)
VALUES
-- COMPONENTE DE FUNDAMENTACIÓN (42 Créditos)
-- Matemáticas (20 Créditos Optativos)
('2546', '1000004', 1, 'Foundational', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Matemáticas'), '{"subjects": [{"name": "Matemáticas Básicas", "type": "Prerrequisito"}]}'),
('2546', '2016377', 1, 'Foundational', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Matemáticas'), '{"subjects": [{"name": "Matemáticas Básicas", "type": "Prerrequisito"}]}'),
('2546', '1000005', 2, 'Foundational', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Matemáticas'), '{"subjects": [{"code": "1000004", "type": "Alternativa"}, {"code": "2016377", "type": "Alternativa"}]}'),
('2546', '2015556', 2, 'Foundational', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Matemáticas'), '{"subjects": [{"code": "1000004", "type": "Alternativa"}, {"code": "2016377", "type": "Alternativa"}]}'),
('2546', '1000003', 2, 'Foundational', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Matemáticas'), '{"subjects": [{"code": "1000004", "type": "Alternativa"}, {"code": "2016377", "type": "Alternativa"}]}'),
('2546', '2015555', 2, 'Foundational', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Matemáticas'), '{"subjects": [{"code": "1000004", "type": "Alternativa"}, {"code": "2016377", "type": "Alternativa"}]}'),
('2546', '1000006', 3, 'Foundational', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Matemáticas'), '{"subjects": [{"code": "1000005", "type": "Alternativa"}, {"code": "2015556", "type": "Alternativa"}]}'),
('2546', '2015162', 3, 'Foundational', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Matemáticas'), '{"subjects": [{"code": "1000005", "type": "Alternativa"}, {"code": "2015556", "type": "Alternativa"}]}'),
('2546', '1000007', 3, 'Foundational', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Matemáticas'), '{"subjects": [{"code": "1000005", "type": "Alternativa"}, {"code": "2015556", "type": "Alternativa"}, {"code": "1000003", "type": "Alternativa"}, {"code": "2015555", "type": "Alternativa"}]}'),
('2546', '2016342', 3, 'Foundational', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Matemáticas'), '{"subjects": [{"code": "1000005", "type": "Alternativa"}, {"code": "2015556", "type": "Alternativa"}, {"code": "1000003", "type": "Alternativa"}, {"code": "2015555", "type": "Alternativa"}]}'),

-- Probabilidad y Estadística (8 Créditos Obligatorios)
('2546', '2027877', 3, 'Foundational', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Probabilidad y Estadística'), '{"subjects": [{"code": "1000005", "type": "Alternativa"}, {"code": "2015556", "type": "Alternativa"}]}'),
('2546', '2027878', 4, 'Foundational', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Probabilidad y Estadística'), '{"subjects": [{"code": "2027877", "type": "Prerrequisito"}]}'),

-- Física (8 Créditos Obligatorios)
('2546', '1000019', 2, 'Foundational', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Física'), '{"subjects": [{"code": "1000004", "type": "Alternativa"}, {"code": "2016377", "type": "Alternativa"}]}'),
('2546', '1000017', 3, 'Foundational', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Física'), '{"subjects": [{"code": "1000019", "type": "Prerrequisito"}, {"code": "1000005", "type": "Correquisito"}, {"code": "2015556", "type": "Alternativa"}]}'),

-- Programación (6 Créditos Obligatorios)
('2546', '2015734', 1, 'Foundational', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Programación'), '{"subjects": []}'),
('2546', '2016375', 2, 'Foundational', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Programación'), '{"subjects": [{"code": "2015734", "type": "Prerrequisito"}]}'),

-- COMPONENTE DISCIPLINAR O PROFESIONAL (92 Créditos)
-- Contexto Profesional y Proyectos de Ingeniería (6 Obligatorios)
('2546', '2026805', 1, 'Disciplinary', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Contexto Profesional y Proyectos de Ingeniería'), '{"subjects": []}'),
('2546', '2026488', 2, 'Disciplinary', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Contexto Profesional y Proyectos de Ingeniería'), '{"subjects": [{"code": "1000004", "type": "Alternativa"}, {"code": "2016377", "type": "Alternativa"}, {"code": "2026805", "type": "Prerrequisito"}, {"code": "2016375", "type": "Prerrequisito"}]}'),

-- Sociohumanística (9 Obligatorios)
('2546', '2016615', 2, 'Disciplinary', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Sociohumanística'), '{"subjects": [{"code": "2026805", "type": "Prerrequisito"}]}'),
('2546', '2015811', 3, 'Disciplinary', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Sociohumanística'), '{"subjects": []}'),
('2546', '2016616', 4, 'Disciplinary', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Sociohumanística'), '{"subjects": [{"code": "2016615", "type": "Prerrequisito"}, {"code": "2027878", "type": "Prerrequisito"}]}'),

-- Materiales y Procesos (10 Obligatorios)
('2546', '2025993', 3, 'Disciplinary', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Materiales y Procesos'), '{"subjects": [{"code": "1000019", "type": "Prerrequisito"}]}'),
('2546', '2016619', 4, 'Disciplinary', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Materiales y Procesos'), '{"subjects": [{"code": "2025993", "type": "Prerrequisito"}]}'),
('2546', '2016618', 4, 'Disciplinary', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Materiales y Procesos'), '{"subjects": [{"code": "2025993", "type": "Prerrequisito"}]}'),

-- Economía y Finanzas - Obligatoria (3 Créditos)
('2546', '2025986', 5, 'Disciplinary', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Economía y Finanzas'), '{"subjects": [{"code": "1000006", "type": "Alternativa"}, {"code": "2015162", "type": "Alternativa"}, {"code": "2016610", "type": "Alternativa", "type_2": "Correquisito"}, {"code": "2016038", "type": "Alternativa", "type_2": "Correquisito"}]}'), 

-- Producción y Operaciones - Obligatorias (18 Créditos)
('2546', '2016609', 5, 'Disciplinary', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Producción y Operaciones'), '{"subjects": [{"code": "1000017", "type": "Prerrequisito"}]}'),
('2546', '2016613', 6, 'Disciplinary', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Producción y Operaciones'), '{"subjects": [{"code": "2025971", "type": "Alternativa"}, {"code": "2015173", "type": "Alternativa"}, {"code": "2016618", "type": "Prerrequisito"}]}'),
('2546', '2016614', 7, 'Disciplinary', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Producción y Operaciones'), '{"subjects": [{"code": "2016613", "type": "Prerrequisito"}, {"code": "2025987", "type": "Prerrequisito"}]}'),
('2546', '2016612', 8, 'Disciplinary', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Producción y Operaciones'), '{"subjects": [{"code": "2016609", "type": "Prerrequisito"}, {"code": "2025982", "type": "Alternativa", "type_2": "Prerrequisito"}, {"code": "2016053", "type": "Alternativa", "type_2": "Prerrequisito"}, {"code": "2016614", "type": "Prerrequisito"}]}'),
('2546', '2016605', 8, 'Disciplinary', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Producción y Operaciones'), '{"subjects": [{"code": "2025988", "type": "Prerrequisito"}]}'),

-- Sistemas, Modelos, Optimización y Simulación - Obligatorias (6 Créditos)
('2546', '2025987', 6, 'Disciplinary', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Sistemas, Modelos, Optimización y Simulación'), '{"subjects": [{"code": "2025971", "type": "Alternativa", "type_2": "Prerrequisito"}, {"code": "2015173", "type": "Alternativa", "type_2": "Prerrequisito"}, {"code": "2025970", "type": "Alternativa", "type_2": "Prerrequisito"}, {"code": "2015177", "type": "Alternativa", "type_2": "Prerrequisito"}, {"code": "2027878", "type": "Correquisito"}]}'),
('2546', '2025988', 7, 'Disciplinary', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Sistemas, Modelos, Optimización y Simulación'), '{"subjects": [{"code": "2025987", "type": "Prerrequisito"}]}'),

-- Optativas Disciplinares: Administración y Gestión (12 Créditos Optativos)
('2546', '2026551', 4, 'Disciplinary', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Administración y Gestión'), '{"subjects": [{"code": "2016615", "type": "Prerrequisito"}, {"code": "2016592", "type": "Alternativa", "type_2": "Correquisito"}, {"code": "2016017", "type": "Alternativa", "type_2": "Correquisito"}]}'),
('2546', '2016007', 4, 'Disciplinary', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Administración y Gestión'), '{"subjects": [{"code": "2016615", "type": "Prerrequisito"}, {"code": "2016592", "type": "Alternativa", "type_2": "Correquisito"}, {"code": "2016017", "type": "Alternativa", "type_2": "Correquisito"}]}'),
('2546', '2015702', 6, 'Disciplinary', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Administración y Gestión'), '{"subjects": [{"code": "2025986", "type": "Prerrequisito"}]}'),
('2546', '2016028', 6, 'Disciplinary', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Administración y Gestión'), '{"subjects": [{"code": "2025986", "type": "Prerrequisito"}]}'),
('2546', '2016600', 7, 'Disciplinary', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Administración y Gestión'), '{"subjects": [{"code": "2026551", "type": "Alternativa", "type_2": "Prerrequisito"}, {"code": "2016007", "type": "Alternativa", "type_2": "Prerrequisito"}, {"code": "2025982", "type": "Alternativa", "type_2": "Correquisito"}, {"code": "2016053", "type": "Alternativa", "type_2": "Correquisito"}]}'),
('2546', '2016599', 7, 'Disciplinary', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Administración y Gestión'), '{"subjects": [{"code": "2026551", "type": "Alternativa", "type_2": "Prerrequisito"}, {"code": "2016007", "type": "Alternativa", "type_2": "Prerrequisito"}, {"code": "2025982", "type": "Alternativa", "type_2": "Correquisito"}, {"code": "2016053", "type": "Alternativa", "type_2": "Correquisito"}]}'),
('2546', '2015701', 8, 'Disciplinary', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Administración y Gestión'), '{"subjects": [{"code": "2016609", "type": "Prerrequisito"}, {"code": "2026551", "type": "Alternativa", "type_2": "Correquisito"}, {"code": "2016007", "type": "Alternativa", "type_2": "Correquisito"}]}'),
('2546', '2016111', 8, 'Disciplinary', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Administración y Gestión'), '{"subjects": [{"code": "2016609", "type": "Prerrequisito"}, {"code": "2026551", "type": "Alternativa", "type_2": "Correquisito"}, {"code": "2016007", "type": "Alternativa", "type_2": "Correquisito"}]}'),

-- Optativas Disciplinares: Economía y Finanzas (10 Créditos Optativos)
('2546', '2016592', 4, 'Disciplinary', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Economía y Finanzas'), '{"subjects": [{"code": "1000004", "type": "Alternativa"}, {"code": "2016377", "type": "Alternativa"}, {"code": "2026805", "type": "Correquisito"}]}'),
('2546', '2016017', 4, 'Disciplinary', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Economía y Finanzas'), '{"subjects": [{"code": "2016377", "type": "Prerrequisito"}, {"code": "2026805", "type": "Correquisito"}]}'),
('2546', '2016610', 4, 'Disciplinary', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Economía y Finanzas'), '{"subjects": [{"code": "2016592", "type": "Alternativa", "type_2": "Prerrequisito"}, {"code": "2016017", "type": "Alternativa", "type_2": "Prerrequisito"}, {"code": "2026488", "type": "Correquisito"}]}'),
('2546', '2016038', 4, 'Disciplinary', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Economía y Finanzas'), '{"subjects": [{"code": "2016592", "type": "Alternativa", "type_2": "Prerrequisito"}, {"code": "2016017", "type": "Alternativa", "type_2": "Prerrequisito"}, {"name": "Fundamentos de contabilidad Financiera", "type": "Prerrequisito"}, {"code": "2026488", "type": "Correquisito"}]}'),
('2546', '2016741', 6, 'Disciplinary', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Economía y Finanzas'), '{"subjects": [{"code": "2025986", "type": "Prerrequisito"}]}'),
('2546', '2016037', 6, 'Disciplinary', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Economía y Finanzas'), '{"subjects": [{"code": "2025986", "type": "Prerrequisito"}, {"name": "Fundamentos de Finanzas", "type": "Prerrequisito"}]}'),

-- Optativas Disciplinares: Sistemas, Modelos, Optimización y Simulación (6 Créditos Optativos)
('2546', '2025971', 5, 'Disciplinary', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Sistemas, Modelos, Optimización y Simulación'), '{"subjects": [{"code": "1000006", "type": "Alternativa"}, {"code": "2015162", "type": "Alternativa"}, {"code": "1000003", "type": "Alternativa", "type_2": "Correquisito"}, {"code": "2015555", "type": "Alternativa", "type_2": "Correquisito"}]}'),
('2546', '2015173', 5, 'Disciplinary', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Sistemas, Modelos, Optimización y Simulación'), '{"subjects": [{"code": "1000006", "type": "Alternativa"}, {"code": "2015162", "type": "Alternativa"}, {"code": "1000003", "type": "Alternativa", "type_2": "Correquisito"}, {"code": "2015555", "type": "Alternativa", "type_2": "Correquisito"}]}'),
('2546', '2025970', 4, 'Disciplinary', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Sistemas, Modelos, Optimización y Simulación'), '{"subjects": [{"code": "1000007", "type": "Alternativa"}, {"code": "2016342", "type": "Alternativa"}, {"code": "1000006", "type": "Alternativa", "type_2": "Correquisito"}, {"code": "2015162", "type": "Alternativa", "type_2": "Correquisito"}, {"code": "2027877", "type": "Correquisito"}, {"code": "2026488", "type": "Correquisito"}]}'),
('2546', '2015177', 4, 'Disciplinary', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Sistemas, Modelos, Optimización y Simulación'), '{"subjects": [{"code": "1000007", "type": "Alternativa"}, {"code": "2016342", "type": "Alternativa"}, {"code": "1000006", "type": "Alternativa", "type_2": "Correquisito"}, {"code": "2015162", "type": "Alternativa", "type_2": "Correquisito"}, {"code": "2027877", "type": "Correquisito"}, {"code": "2026488", "type": "Correquisito"}]}'),

-- Optativas Disciplinares: Producción y Operaciones (3 Créditos Optativos)
('2546', '2016589', 5, 'Disciplinary', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Producción y Operaciones'), '{"subjects": [{"code": "2027878", "type": "Prerrequisito"}, {"code": "2026551", "type": "Alternativa", "type_2": "Correquisito"}, {"code": "2016007", "type": "Alternativa", "type_2": "Correquisito"}]}'),
('2546', '2016316', 5, 'Disciplinary', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Producción y Operaciones'), '{"subjects": [{"code": "2027878", "type": "Prerrequisito"}, {"code": "2026551", "type": "Alternativa", "type_2": "Correquisito"}, {"code": "2016007", "type": "Alternativa", "type_2": "Correquisito"}]}'),
('2546', '2016317', 5, 'Disciplinary', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Producción y Operaciones'), '{"subjects": [{"code": "2027878", "type": "Prerrequisito"}, {"code": "2026551", "type": "Alternativa", "type_2": "Correquisito"}, {"code": "2016007", "type": "Alternativa", "type_2": "Correquisito"}]}'),

-- Optativas Disciplinares: Sistemas de Información (3 Créditos Optativos)
('2546', '2025982', 7, 'Disciplinary', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Sistemas de Información'), '{"subjects": [{"code": "2015702", "type": "Alternativa", "type_2": "Prerrequisito"}, {"code": "2016028", "type": "Alternativa", "type_2": "Prerrequisito"}]}'),
('2546', '2016053', 7, 'Disciplinary', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Sistemas de Información'), '{"subjects": [{"code": "2015702", "type": "Alternativa", "type_2": "Prerrequisito"}, {"code": "2016028", "type": "Alternativa", "type_2": "Prerrequisito"}]}'),

-- Trabajo de Grado (6 Obligatorios/Optativos) - Requiere 70 créditos Disciplinares aprobados [38, 39]
('2546', '2025990', 9, 'Disciplinary', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Trabajo de Grado'), '{"credits": {"component": "Disciplinary", "type": "Approved", "min_credits": 70}}'),
('2546', '2025989', 9, 'Disciplinary', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Trabajo de Grado'), '{"credits": {"component": "Disciplinary", "type": "Approved", "min_credits": 70}}'),
('2546', '2015321', 9, 'Disciplinary', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Trabajo de Grado'), '{"credits": {"component": "Disciplinary", "type": "Approved", "min_credits": 70}}'),

-- COMPONENTE DE LIBRE ELECCIÓN (34 Créditos Optativos)
-- Profundización (0 Créditos Obligatorios)
('2546', '2024045', 7, 'Free Elective', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Profundización'), '{"credits": {"component": "Disciplinary", "type": "Approved", "min_credits": 40}, "subjects": [{"code": "2015702", "type": "Prerrequisito"}]}'),
-- Prácticas - Requieren 45 créditos Disciplinares aprobados 
('2546', '2016762', 8, 'Free Elective', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Profundización'), '{"credits": {"component": "Disciplinary", "type": "Approved", "min_credits": 45}}'),
('2546', '2016763', 8, 'Free Elective', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Profundización'), '{"credits": {"component": "Disciplinary", "type": "Approved", "min_credits": 45}}'),
('2546', '2016764', 8, 'Free Elective', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Profundización'), '{"credits": {"component": "Disciplinary", "type": "Approved", "min_credits": 45}}'),
('2546', '1000070', 8, 'Free Elective', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Profundización'), '{"credits": {"component": "Disciplinary", "type": "Approved", "min_credits": 45}}'),
('2546', '1000071', 8, 'Free Elective', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Profundización'), '{"credits": {"component": "Disciplinary", "type": "Approved", "min_credits": 45}}'),
('2546', '1000072', 8, 'Free Elective', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Profundización'), '{"credits": {"component": "Disciplinary", "type": "Approved", "min_credits": 45}}'),
