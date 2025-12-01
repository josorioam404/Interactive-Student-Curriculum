INSERT INTO Program (program_code_sia, name, snies_code, total_credits, faculty)
VALUES ('2542', 'Ingeniería Civil', '25', 180, 'Ingeniería')
ON CONFLICT (program_code_sia) DO NOTHING;

INSERT INTO Subject (subject_code, name, credits) VALUES
('1000004', 'Cálculo Diferencial', 4),
('1000005', 'Cálculo Integral', 4),
('1000003', 'Álgebra Lineal', 4),
('1000008', 'Cálculo en Varias Variables', 4),
('1000007', 'Ecuaciones Diferenciales', 4),
('1000013', 'Probabilidad y Estadística Fundamental', 3),

-- Fundamentación: Física (4 créditos)
('1000019', 'Fundamentos de Mecánica', 4),

-- Fundamentación: Biología y Química (6 créditos) 
('1000011', 'Fundamentos de Ecología', 3),
('1000024', 'Principios de Química', 3),

-- Fundamentación: Expresión Gráfica (3 créditos) 
('2015711', 'Dibujo Básico', 3),

-- Fundamentación: Herramientas de Ingeniería A y B (6 créditos optativos) 
('2015734', 'Programación de Computadores', 3),
('2016375', 'Programación Orientada a Objetos', 3),
('2022761', 'SIG para Ingeniería Civil', 3),
('2015970', 'Métodos Numéricos', 3),
('2017293', 'Modelación Matemática', 3),
('2015942', 'Aplicación de Elementos Finitos', 3),
('2025971', 'Optimización', 3),
('2025973', 'Modelos y Simulación', 3),

-- Fundamentación: Económicas y Financieras (6 créditos)
('2015703', 'Ingeniería Económica', 3),
('2015972', 'Preparación y Evaluación de Proyectos de Infraestructura', 3),

-- Disciplinar: Básica Disciplinar (38 créditos) 
('2026166', 'Introducción a la Ingeniería Civil', 3),
('2026134', 'Estática', 3),
('2015958', 'Geomática Básica', 4),
('2015948', 'Dinámica', 3),
('2015957', 'Geomática Aplicada', 4),
('2015956', 'Geología', 3),
('2015966', 'Mecánica de Fluidos', 4),
('2015968', 'Mecánica de Sólidos', 4),
('2015965', 'Materiales para Construcción', 4),
('2019978', 'Hidrología', 3),
('2026135', 'Ingeniería Civil Sostenible', 3),

-- Disciplinar: Electiva Técnica (3 créditos optativos) 
('2026183', 'Análisis de Incertidumbre en Ingeniería Civil', 3),
('2015229', 'Colombia Contemporánea', 3),
('2022760', 'Gestión en Construcción', 3),
('2015967', 'Mecánica de Rocas', 3),
('2015992', 'Métodos Numéricos para Ingeniería Civil', 3),
('2015975', 'Taller de Experimentación y Modelación', 3),
('2024045', 'Taller de Proyectos Interdisciplinarios', 3),
('2026136', 'Tecnología del Concreto', 3),
('2015977', 'Transporte Sostenible', 3),
('2026137', 'Planificación del Tráfico', 3),

-- Disciplinar: Hidráulica (7 créditos) 
('2015961', 'Hidráulica Básica', 4),
('2015954', 'Estructuras Hidráulicas', 3),

-- Disciplinar: Vías y Transporte (9 créditos) 
('2026138', 'Ingeniería de Transporte', 3),
('2015963', 'Ingeniería de Tránsito', 3),
('2015949', 'Diseño Geométrico de Vías', 3),

-- Disciplinar: Geotecnia (9 créditos) 
('2015969', 'Mecánica de Suelos', 3),
('2015959', 'Geotecnia', 3),
('2015971', 'Pavimentos', 3),

-- Disciplinar: Estructuras (9 créditos) 
('2015941', 'Análisis Estructural Básico', 3),
('2015940', 'Análisis Estructural Aplicado', 3),
('2015950', 'Diseño Estructural', 3),

-- Disciplinar: Saneamiento Básico (9 créditos) 
('2015938', 'Acueductos', 3),
('2015939', 'Alcantarillados', 3),
('2015973', 'Saneamiento Ambiental', 3),

-- Disciplinar: Construcción (3 créditos) 
('2015955', 'Fundamentos de Construcción', 3),

-- Disciplinar: Construcción de Obras Civiles (6 créditos optativos) 
('2015943', 'Construcción de Edificaciones', 3),
('2015944', 'Construcción de Infraestructura Vial', 3),
('2015945', 'Construcción de Obras Pluviales y Litorales', 3),

-- Disciplinar: Trabajo de Grado (6 créditos optativos) 
('2015296', 'Trabajo de Grado', 6),
('2015299', 'Trabajo de Grado - Asignaturas de Posgrado', 6),

-- Libre Elección: Profundización (36 créditos optativos) 
('2022894', 'Diseño Básico de Estructuras Metálicas', 3),
('2022895', 'Diseño Básico de Puentes', 3),
('2026185', 'Gerencia de Proyectos de Infraestructura', 3),
('2022914', 'Riesgos Geotécnicos', 3),
('2024081', 'Túneles', 3),
('2020486', 'Cimentaciones', 3),
('2020322', 'Evaluación Geoambiental', 3),
('2022916', 'Taller de Instalaciones Hidráulicas', 3),
('2025343', 'Taller de Modelación de Hidrosistemas: Hidráulica', 3),
('2025342', 'Taller de Modelación de Hidrosistemas: Hidrología', 3),
('2016762', 'Práctica Estudiantil I', 3),
('2016763', 'Práctica Estudiantil II', 6),
('1000070', 'Práctica Colombia I', 3),
('1000071', 'Práctica Colombia II', 6)
ON CONFLICT (subject_code) DO NOTHING;
WITH ProgramData AS (
    SELECT program_code_sia FROM Program WHERE program_code_sia = '2542'
)
INSERT INTO CurriculumGroup (program_code_sia, component, group_name, required_credits_total, required_credits_obligatory)
SELECT '2542', 'Foundational', 'Matemáticas, Probabilidad y Estadística', 23, 23 FROM ProgramData UNION ALL 
SELECT '2542', 'Foundational', 'Física', 4, 4 FROM ProgramData UNION ALL
SELECT '2542', 'Foundational', 'Biología y Química', 6, 6 FROM ProgramData UNION ALL
SELECT '2542', 'Foundational', 'Expresión Gráfica', 3, 3 FROM ProgramData UNION ALL
SELECT '2542', 'Foundational', 'Herramientas de Ingeniería A y B', 6, 0 FROM ProgramData UNION ALL
SELECT '2542', 'Foundational', 'Económicas y Financieras', 6, 3 FROM ProgramData UNION ALL

SELECT '2542', 'Disciplinary', 'Básica Disciplinar', 38, 38 FROM ProgramData UNION ALL 
SELECT '2542', 'Disciplinary', 'Electiva Técnica', 3, 0 FROM ProgramData UNION ALL
SELECT '2542', 'Disciplinary', 'Hidráulica', 7, 7 FROM ProgramData UNION ALL
SELECT '2542', 'Disciplinary', 'Vías y Transporte', 9, 9 FROM ProgramData UNION ALL
SELECT '2542', 'Disciplinary', 'Geotecnia', 9, 9 FROM ProgramData UNION ALL
SELECT '2542', 'Disciplinary', 'Estructuras', 9, 9 FROM ProgramData UNION ALL
SELECT '2542', 'Disciplinary', 'Saneamiento Básico', 9, 9 FROM ProgramData UNION ALL
SELECT '2542', 'Disciplinary', 'Construcción', 3, 3 FROM ProgramData UNION ALL
SELECT '2542', 'Disciplinary', 'Construcción de Obras Civiles', 6, 0 FROM ProgramData UNION ALL
SELECT '2542', 'Disciplinary', 'Trabajo de Grado', 6, 0 FROM ProgramData UNION ALL

SELECT '2542', 'Free Elective', 'Profundización', 36, 0 FROM ProgramData 
ON CONFLICT (program_code_sia, component, group_name) DO NOTHING;
WITH GroupIDs AS (
    SELECT group_id, group_name, component FROM CurriculumGroup WHERE program_code_sia = '2542'
)
INSERT INTO StudyPlan (program_code_sia, subject_code, suggested_semester, component, is_obligatory, group_id, prereq_rules)
VALUES
-- COMPONENTE DE FUNDAMENTACIÓN (48 Créditos)
-- Matemáticas, Probabilidad y Estadística (23 Obligatorios) [5, 7]
('2542', '1000004', 1, 'Foundational', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Matemáticas, Probabilidad y Estadística'), '{"subjects": [{"name": "Matemáticas Básicas", "type": "Prerrequisito"}]}'),
('2542', '1000005', 2, 'Foundational', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Matemáticas, Probabilidad y Estadística'), '{"subjects": [{"code": "1000004", "type": "Prerrequisito"}]}'),
('2542', '1000003', 2, 'Foundational', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Matemáticas, Probabilidad y Estadística'), '{"subjects": [{"code": "1000004", "type": "Prerrequisito"}]}'),
('2542', '1000008', 3, 'Foundational', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Matemáticas, Probabilidad y Estadística'), '{"subjects": [{"code": "1000005", "type": "Prerrequisito"}, {"code": "1000003", "type": "Prerrequisito"}]}'),
('2542', '1000007', 3, 'Foundational', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Matemáticas, Probabilidad y Estadística'), '{"subjects": [{"code": "1000005", "type": "Prerrequisito"}, {"code": "1000003", "type": "Prerrequisito"}]}'),
('2542', '1000013', 3, 'Foundational', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Matemáticas, Probabilidad y Estadística'), '{"subjects": [{"code": "1000004", "type": "Prerrequisito"}]}'),

-- Física (4 Obligatorios)
('2542', '1000019', 2, 'Foundational', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Física'), '{"subjects": [{"code": "1000004", "type": "Prerrequisito"}]}'),

-- Biología y Química (6 Obligatorios)
('2542', '1000011', 1, 'Foundational', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Biología y Química'), '{"subjects": []}'),
('2542', '1000024', 1, 'Foundational', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Biología y Química'), '{"subjects": []}'),

-- Expresión Gráfica (3 Obligatorios) 
('2542', '2015711', 1, 'Foundational', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Expresión Gráfica'), '{"subjects": []}'),

-- Herramientas de Ingeniería A y B (6 Optativos) 
('2542', '2015734', 1, 'Foundational', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Herramientas de Ingeniería A y B'), '{"subjects": []}'),
('2542', '2016375', 2, 'Foundational', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Herramientas de Ingeniería A y B'), '{"subjects": [{"code": "2015734", "type": "Prerrequisito"}]}'),
('2542', '2022761', 2, 'Foundational', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Herramientas de Ingeniería A y B'), '{"subjects": [{"name": "Geomática Aplicada", "type": "Prerrequisito"}]}'),
('2542', '2015970', 3, 'Foundational', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Herramientas de Ingeniería A y B'), '{"subjects": [{"code": "1000007", "type": "Prerrequisito"}]}'),
('2542', '2017293', 3, 'Foundational', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Herramientas de Ingeniería A y B'), '{"subjects": [{"code": "1000007", "type": "Prerrequisito"}]}'),
('2542', '2015942', 3, 'Foundational', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Herramientas de Ingeniería A y B'), '{"subjects": [{"code": "1000007", "type": "Prerrequisito"}]}'),
('2542', '2025971', 4, 'Foundational', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Herramientas de Ingeniería A y B'), '{"subjects": [{"name": "Modelos y Simulación", "type": "Prerrequisito"}]}'),
('2542', '2025973', 4, 'Foundational', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Herramientas de Ingeniería A y B'), '{"subjects": [{"code": "1000007", "type": "Prerrequisito"}]}'),

-- Económicas y Financieras (3 Obligatorios) 
('2542', '2015703', 4, 'Foundational', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Económicas y Financieras'), '{"subjects": [{"code": "1000005", "type": "Prerrequisito"}]}'),
('2542', '2015972', 5, 'Foundational', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Económicas y Financieras'), '{"subjects": [{"name": "Ingeniería de Transporte", "type": "Prerrequisito"}]}'), 

-- COMPONENTE DISCIPLINAR O PROFESIONAL (96 Créditos)
-- Básica Disciplinar (38 Obligatorios)
('2542', '2026166', 1, 'Disciplinary', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Básica Disciplinar'), '{"subjects": []}'),
('2542', '2026134', 3, 'Disciplinary', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Básica Disciplinar'), '{"subjects": [{"code": "1000003", "type": "Prerrequisito"}, {"code": "1000019", "type": "Prerrequisito"}]}'),
('2542', '2015958', 3, 'Disciplinary', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Básica Disciplinar'), '{"subjects": [{"code": "2015711", "type": "Prerrequisito"}, {"code": "2026166", "type": "Prerrequisito"}]}'),
('2542', '2015948', 4, 'Disciplinary', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Básica Disciplinar'), '{"subjects": [{"code": "2026134", "type": "Prerrequisito"}]}'),
('2542', '2015957', 4, 'Disciplinary', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Básica Disciplinar'), '{"subjects": [{"code": "2015958", "type": "Prerrequisito"}]}'),
('2542', '2015956', 5, 'Disciplinary', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Básica Disciplinar'), '{"subjects": [{"code": "2015958", "type": "Prerrequisito"}]}'),
('2542', '2015966', 4, 'Disciplinary', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Básica Disciplinar'), '{"subjects": [{"code": "1000008", "type": "Prerrequisito"}, {"code": "1000007", "type": "Prerrequisito"}, {"code": "2026134", "type": "Prerrequisito"}]}'),
('2542', '2015968', 4, 'Disciplinary', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Básica Disciplinar'), '{"subjects": [{"code": "1000008", "type": "Prerrequisito"}, {"code": "2026134", "type": "Prerrequisito"}]}'),
('2542', '2015965', 5, 'Disciplinary', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Básica Disciplinar'), '{"subjects": [{"code": "1000024", "type": "Prerrequisito"}, {"code": "2015956", "type": "Prerrequisito"}]}'),
('2542', '2019978', 6, 'Disciplinary', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Básica Disciplinar'), '{"subjects": [{"code": "1000013", "type": "Prerrequisito"}, {"code": "2015966", "type": "Prerrequisito"}]}'),
('2542', '2026135', 7, 'Disciplinary', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Básica Disciplinar'), '{"credits": {"component": "Disciplinary", "type": "Approved", "min_credits": 77}}'), 

-- Electiva Técnica (3 Optativos) 
('2542', '2026183', 6, 'Disciplinary', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Electiva Técnica'), '{"credits": {"component": "Disciplinary", "type": "Approved", "min_credits": 28}}'),
('2542', '2015229', 6, 'Disciplinary', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Electiva Técnica'), '{"credits": {"component": "Disciplinary", "type": "Approved", "min_credits": 28}}'),
('2542', '2022760', 6, 'Disciplinary', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Electiva Técnica'), '{"credits": {"component": "Disciplinary", "type": "Approved", "min_credits": 28}}'),
('2542', '2015967', 6, 'Disciplinary', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Electiva Técnica'), '{"credits": {"component": "Disciplinary", "type": "Approved", "min_credits": 28}}'),
('2542', '2015992', 6, 'Disciplinary', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Electiva Técnica'), '{"credits": {"component": "Disciplinary", "type": "Approved", "min_credits": 28}}'),
('2542', '2015975', 6, 'Disciplinary', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Electiva Técnica'), '{"credits": {"component": "Disciplinary", "type": "Approved", "min_credits": 28}}'),
('2542', '2024045', 6, 'Disciplinary', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Electiva Técnica'), '{"credits": {"component": "Disciplinary", "type": "Approved", "min_credits": 28}}'),
('2542', '2026136', 6, 'Disciplinary', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Electiva Técnica'), '{"credits": {"component": "Disciplinary", "type": "Approved", "min_credits": 28}}'),
('2542', '2015977', 6, 'Disciplinary', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Electiva Técnica'), '{"credits": {"component": "Disciplinary", "type": "Approved", "min_credits": 28}}'),
('2542', '2026137', 6, 'Disciplinary', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Electiva Técnica'), '{"credits": {"component": "Disciplinary", "type": "Approved", "min_credits": 28}}'),

-- Hidráulica (7 Obligatorios) 
('2542', '2015961', 5, 'Disciplinary', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Hidráulica'), '{"subjects": [{"code": "2015966", "type": "Prerrequisito"}]}'),
('2542', '2015954', 6, 'Disciplinary', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Hidráulica'), '{"subjects": [{"code": "2015961", "type": "Prerrequisito"}]}'),

-- Vías y Transporte (9 Obligatorios) 
('2542', '2026138', 5, 'Disciplinary', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Vías y Transporte'), '{"subjects": [{"code": "2015703", "type": "Prerrequisito"}, {"code": "1000003", "type": "Prerrequisito"}]}'),
('2542', '2015963', 6, 'Disciplinary', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Vías y Transporte'), '{"subjects": [{"code": "2026138", "type": "Prerrequisito"}]}'),
('2542', '2015949', 7, 'Disciplinary', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Vías y Transporte'), '{"subjects": [{"code": "2015957", "type": "Prerrequisito"}, {"code": "2015963", "type": "Prerrequisito"}]}'),

-- Geotecnia (9 Obligatorios) 
('2542', '2015969', 5, 'Disciplinary', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Geotecnia'), '{"subjects": [{"code": "2015968", "type": "Prerrequisito"}]}'),
('2542', '2015959', 6, 'Disciplinary', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Geotecnia'), '{"subjects": [{"code": "2015969", "type": "Prerrequisito"}]}'),
('2542', '2015971', 7, 'Disciplinary', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Geotecnia'), '{"subjects": [{"code": "2015965", "type": "Prerrequisito"}, {"code": "2015959", "type": "Prerrequisito"}]}'),

-- Estructuras (9 Obligatorios) 
('2542', '2015941', 5, 'Disciplinary', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Estructuras'), '{"subjects": [{"code": "2015968", "type": "Prerrequisito"}]}'),
('2542', '2015940', 6, 'Disciplinary', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Estructuras'), '{"subjects": [{"code": "2015941", "type": "Prerrequisito"}, {"code": "2015948", "type": "Prerrequisito"}]}'),
('2542', '2015950', 7, 'Disciplinary', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Estructuras'), '{"subjects": [{"code": "2015965", "type": "Prerrequisito"}, {"code": "2015940", "type": "Prerrequisito"}]}'),

-- Saneamiento Básico (9 Obligatorios) 
('2542', '2015938', 6, 'Disciplinary', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Saneamiento Básico'), '{"subjects": [{"code": "2015961", "type": "Prerrequisito"}]}'),
('2542', '2015939', 7, 'Disciplinary', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Saneamiento Básico'), '{"subjects": [{"code": "2019978", "type": "Prerrequisito"}]}'),
('2542', '2015973', 8, 'Disciplinary', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Saneamiento Básico'), '{"subjects": [{"code": "1000011", "type": "Prerrequisito"}, {"code": "2015938", "type": "Prerrequisito"}]}'),

-- Construcción (3 Obligatorios)
('2542', '2015955', 7, 'Disciplinary', TRUE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Construcción'), '{"credits": {"component": "Disciplinary", "type": "Approved", "min_credits": 87}}'), 

-- Construcción de Obras Civiles (6 Optativos) 
('2542', '2015943', 8, 'Disciplinary', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Construcción de Obras Civiles'), '{"subjects": [{"code": "2015955", "type": "Prerrequisito"}]}'),
('2542', '2015944', 8, 'Disciplinary', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Construcción de Obras Civiles'), '{"subjects": [{"code": "2015955", "type": "Prerrequisito"}]}'),
('2542', '2015945', 8, 'Disciplinary', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Construcción de Obras Civiles'), '{"subjects": [{"code": "2015955", "type": "Prerrequisito"}]}'),

-- Trabajo de Grado (6 Optativos) 
('2542', '2015296', 9, 'Disciplinary', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Trabajo de Grado'), '{"credits": {"component": "Disciplinary", "type": "Approved", "min_credits": 77}}'),
('2542', '2015299', 9, 'Disciplinary', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Trabajo de Grado'), '{"credits": {"component": "Disciplinary", "type": "Approved", "min_credits": 77}}'), 

-- COMPONENTE DE LIBRE ELECCIÓN (36 Créditos)
-- Profundización (0 Obligatorios) 
('2542', '2022894', 7, 'Free Elective', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Profundización'), '{"credits": {"component": "Total", "type": "Approved", "min_credits": 108}}'), 
('2542', '2022895', 7, 'Free Elective', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Profundización'), '{"credits": {"component": "Total", "type": "Approved", "min_credits": 108}}'),
('2542', '2026185', 7, 'Free Elective', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Profundización'), '{"credits": {"component": "Total", "type": "Approved", "min_credits": 108}}'),
('2542', '2022914', 7, 'Free Elective', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Profundización'), '{"credits": {"component": "Total", "type": "Approved", "min_credits": 108}}'),
('2542', '2024081', 7, 'Free Elective', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Profundización'), '{"credits": {"component": "Total", "type": "Approved", "min_credits": 108}}'),
('2542', '2020486', 7, 'Free Elective', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Profundización'), '{"credits": {"component": "Total", "type": "Approved", "min_credits": 108}}'),
('2542', '2020322', 7, 'Free Elective', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Profundización'), '{"credits": {"component": "Total", "type": "Approved", "min_credits": 108}}'),
('2542', '2022916', 7, 'Free Elective', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Profundización'), '{"credits": {"component": "Total", "type": "Approved", "min_credits": 108}}'),
('2542', '2025343', 7, 'Free Elective', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Profundización'), '{"credits": {"component": "Total", "type": "Approved", "min_credits": 108}}'),
('2542', '2025342', 7, 'Free Elective', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Profundización'), '{"credits": {"component": "Total", "type": "Approved", "min_credits": 108}}'),
('2542', '2016762', 9, 'Free Elective', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Profundización'), '{"credits": {"component": "Total", "type": "Approved", "min_credits": 126}}'), -- Práctica Estudiantil I [17]
('2542', '2016763', 9, 'Free Elective', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Profundización'), '{"credits": {"component": "Total", "type": "Approved", "min_credits": 126}}'), -- Práctica Estudiantil II [17]
('2542', '1000070', 9, 'Free Elective', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Profundización'), '{"credits": {"component": "Total", "type": "Approved", "min_credits": 126}}'), -- Práctica Colombia I [17]
('2542', '1000071', 9, 'Free Elective', FALSE, (SELECT group_id FROM GroupIDs WHERE group_name = 'Profundización'), '{"credits": {"component": "Total", "type": "Approved", "min_credits": 126}}'); -- Práctica Colombia II [17]

