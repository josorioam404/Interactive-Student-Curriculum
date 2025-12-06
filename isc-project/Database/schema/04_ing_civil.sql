INSERT INTO Program (program_code_sia, name, snies_code, total_credits, faculty)
VALUES ('2542', 'Ingeniería Civil', '25', 180, 'Ingeniería')
ON CONFLICT (program_code_sia) DO NOTHING;

INSERT INTO Subject (subject_code, name, credits) VALUES
    -- Fundamentación: Matemáticas y Estadística
    ('1000004', 'Cálculo Diferencial', 4),
    ('1000005', 'Cálculo Integral', 4),
    ('1000003', 'Álgebra Lineal', 4),
    ('1000006', 'Cálculo en Varias Variables', 4),
    ('1000007', 'Ecuaciones Diferenciales', 4),
    ('1000013', 'Probabilidad y Estadística Fundamental', 3),

    -- Fundamentación: Física
    ('1000019', 'Fundamentos de Mecánica', 4),

    -- Fundamentación: Biología y Química
    ('1000011', 'Fundamentos de Ecología', 3),
    ('1000024', 'Principios de Química', 3),

    -- Fundamentación: Expresión Gráfica
    ('2015711', 'Dibujo Básico', 3),

    -- Fundamentación: Herramientas de Ingeniería (Optativas)
    ('2015734', 'Programación de Computadores', 3),
    ('2016375', 'Programación Orientada a Objetos', 3),
    ('2022761', 'SIG para Ingeniería Civil', 3),
    ('2015970', 'Métodos Numéricos', 3),
    ('2017293', 'Modelación Matemática', 3),
    ('2015942', 'Aplicación de Elementos Finitos', 3),
    ('2025971', 'Optimización', 3),
    ('2025973', 'Modelos y Simulación', 3),

    -- Fundamentación: Económicas y Financieras
    ('2015703', 'Ingeniería Económica', 3),
    ('2015972', 'Preparación y Evaluación de Proyectos de Infraestructura', 3),

    -- Disciplinar: Básica Disciplinar
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

    -- Disciplinar: Electiva Técnica (Optativas)
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

    -- Disciplinar: Hidráulica
    ('2015961', 'Hidráulica Básica', 4),
    ('2015954', 'Estructuras Hidráulicas', 3),

    -- Disciplinar: Vías y Transporte
    ('2026138', 'Ingeniería de Transporte', 3),
    ('2015963', 'Ingeniería de Tránsito', 3),
    ('2015949', 'Diseño Geométrico de Vías', 3),

    -- Disciplinar: Geotecnia
    ('2015969', 'Mecánica de Suelos', 3),
    ('2015959', 'Geotecnia', 3),
    ('2015971', 'Pavimentos', 3),

    -- Disciplinar: Estructuras
    ('2015941', 'Análisis Estructural Básico', 3),
    ('2015940', 'Análisis Estructural Aplicado', 3),
    ('2015950', 'Diseño Estructural', 3),

    -- Disciplinar: Saneamiento Básico
    ('2015938', 'Acueductos', 3),
    ('2015939', 'Alcantarillados', 3),
    ('2015973', 'Saneamiento Ambiental', 3),

    -- Disciplinar: Construcción
    ('2015955', 'Fundamentos de Construcción', 3),

    -- Disciplinar: Construcción de Obras Civiles (Optativas)
    ('2015943', 'Construcción de Edificaciones', 3),
    ('2015944', 'Construcción de Infraestructura Vial', 3),
    ('2015945', 'Construcción de Obras Pluviales y Litorales', 3),

    -- Disciplinar: Trabajo de Grado
    ('2015296', 'Trabajo de Grado', 6),
    ('2015299', 'Trabajo de Grado - Asignaturas de Posgrado', 6),

    -- Libre Elección: Profundización (Optativas)
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

WITH InsertedGroups AS (
    INSERT INTO CurriculumGroup (program_code_sia, component, group_name, required_credits_total, required_credits_obligatory) VALUES
    ('2542', 'Foundational', 'Matemáticas, Probabilidad y Estadística', 23, 23),
    ('2542', 'Foundational', 'Física', 4, 4),
    ('2542', 'Foundational', 'Biología y Química', 6, 6),
    ('2542', 'Foundational', 'Expresión Gráfica', 3, 3),
    ('2542', 'Foundational', 'Herramientas de Ingeniería A y B', 6, 0),
    ('2542', 'Foundational', 'Económicas y Financieras', 6, 3),
    ('2542', 'Disciplinary', 'Básica Disciplinar', 38, 38),
    ('2542', 'Disciplinary', 'Electiva Técnica', 3, 0),
    ('2542', 'Disciplinary', 'Hidráulica', 7, 7),
    ('2542', 'Disciplinary', 'Vías y Transporte', 9, 9),
    ('2542', 'Disciplinary', 'Geotecnia', 9, 9),
    ('2542', 'Disciplinary', 'Estructuras', 9, 9),
    ('2542', 'Disciplinary', 'Saneamiento Básico', 9, 9),
    ('2542', 'Disciplinary', 'Construcción', 3, 3),
    ('2542', 'Disciplinary', 'Construcción de Obras Civiles', 6, 0),
    ('2542', 'Disciplinary', 'Trabajo de Grado', 6, 0),
    ('2542', 'Free Elective', 'Profundización', 36, 0)
    RETURNING group_id, group_name, component
)
SELECT * FROM InsertedGroups;
WITH GroupMap AS (
    SELECT group_id, group_name, component 
    FROM CurriculumGroup 
    WHERE program_code_sia = '2542'
)
INSERT INTO StudyPlan (program_code_sia, subject_code, suggested_semester, component, is_obligatory, group_id, prereq_rules)
SELECT '2542', T1.subject_code, T1.suggested_semester, T1.component, T1.is_obligatory, gm.group_id, T1.prereq_rules
FROM (
    VALUES
    -- == FUNDAMENTACIÓN: MATEMÁTICAS, PROBABILIDAD Y ESTADÍSTICA ==
    ('1000004', 1, 'Foundational', TRUE, 'Matemáticas, Probabilidad y Estadística', NULL),
    ('1000005', 2, 'Foundational', TRUE, 'Matemáticas, Probabilidad y Estadística', '[{"subject_code": "1000004", "type": "Prerrequisito"}]'::jsonb),
    ('1000003', 2, 'Foundational', TRUE, 'Matemáticas, Probabilidad y Estadística', '[{"subject_code": "1000004", "type": "Prerrequisito"}]'::jsonb),
    ('1000006', 3, 'Foundational', TRUE, 'Matemáticas, Probabilidad y Estadística', '[{"subject_code": "1000005", "type": "Prerrequisito"}, {"subject_code": "1000003", "type": "Prerrequisito"}]'::jsonb),
    ('1000007', 3, 'Foundational', TRUE, 'Matemáticas, Probabilidad y Estadística', '[{"subject_code": "1000005", "type": "Prerrequisito"}, {"subject_code": "1000003", "type": "Prerrequisito"}]'::jsonb),
    ('1000013', 3, 'Foundational', TRUE, 'Matemáticas, Probabilidad y Estadística', '[{"subject_code": "1000004", "type": "Prerrequisito"}]'::jsonb),

    -- == FUNDAMENTACIÓN: FÍSICA ==
    ('1000019', 2, 'Foundational', TRUE, 'Física', '[{"subject_code": "1000004", "type": "Prerrequisito"}]'::jsonb),

    -- == FUNDAMENTACIÓN: BIOLOGÍA Y QUÍMICA ==
    ('1000011', 1, 'Foundational', TRUE, 'Biología y Química', NULL),
    ('1000024', 1, 'Foundational', TRUE, 'Biología y Química', NULL),

    -- == FUNDAMENTACIÓN: EXPRESIÓN GRÁFICA ==
    ('2015711', 1, 'Foundational', TRUE, 'Expresión Gráfica', NULL),

    -- == FUNDAMENTACIÓN: HERRAMIENTAS DE INGENIERÍA A Y B (Optativas) ==
    ('2015734', 1, 'Foundational', FALSE, 'Herramientas de Ingeniería A y B', NULL),
    ('2016375', 2, 'Foundational', FALSE, 'Herramientas de Ingeniería A y B', '[{"subject_code": "2015734", "type": "Prerrequisito"}]'::jsonb),
    ('2022761', 2, 'Foundational', FALSE, 'Herramientas de Ingeniería A y B', '[{"subject_code": "2015957", "type": "Prerrequisito"}]'::jsonb), 
    ('2015970', 3, 'Foundational', FALSE, 'Herramientas de Ingeniería A y B', '[{"subject_code": "1000007", "type": "Prerrequisito"}]'::jsonb),
    ('2017293', 3, 'Foundational', FALSE, 'Herramientas de Ingeniería A y B', '[{"subject_code": "1000007", "type": "Prerrequisito"}]'::jsonb),
    ('2015942', 3, 'Foundational', FALSE, 'Herramientas de Ingeniería A y B', '[{"subject_code": "1000007", "type": "Prerrequisito"}]'::jsonb),
    ('2025971', 4, 'Foundational', FALSE, 'Herramientas de Ingeniería A y B', '[{"subject_code": "2025973", "type": "Prerrequisito"}]'::jsonb),
    ('2025973', 4, 'Foundational', FALSE, 'Herramientas de Ingeniería A y B', '[{"subject_code": "1000007", "type": "Prerrequisito"}]'::jsonb),

    -- == FUNDAMENTACIÓN: ECONÓMICAS Y FINANCIERAS ==
    ('2015703', 4, 'Foundational', TRUE, 'Económicas y Financieras', '[{"subject_code": "1000005", "type": "Prerrequisito"}]'::jsonb),
    ('2015972', 5, 'Foundational', TRUE, 'Económicas y Financieras', '[{"subject_code": "2026138", "type": "Prerrequisito"}]'::jsonb),

    -- == DISCIPLINAR: BÁSICA DISCIPLINAR ==
    ('2026166', 1, 'Disciplinary', TRUE, 'Básica Disciplinar', NULL),
    ('2026134', 3, 'Disciplinary', TRUE, 'Básica Disciplinar', '[{"subject_code": "1000003", "type": "Prerrequisito"}, {"subject_code": "1000019", "type": "Prerrequisito"}]'::jsonb),
    ('2015958', 3, 'Disciplinary', TRUE, 'Básica Disciplinar', '[{"subject_code": "2015711", "type": "Prerrequisito"}, {"subject_code": "2026166", "type": "Prerrequisito"}]'::jsonb),
    ('2015948', 4, 'Disciplinary', TRUE, 'Básica Disciplinar', '[{"subject_code": "2026134", "type": "Prerrequisito"}]'::jsonb),
    ('2015957', 4, 'Disciplinary', TRUE, 'Básica Disciplinar', '[{"subject_code": "2015958", "type": "Prerrequisito"}]'::jsonb),
    ('2015956', 5, 'Disciplinary', TRUE, 'Básica Disciplinar', '[{"subject_code": "2015958", "type": "Prerrequisito"}]'::jsonb),
    ('2015966', 4, 'Disciplinary', TRUE, 'Básica Disciplinar', '[{"subject_code": "1000006", "type": "Prerrequisito"}, {"subject_code": "1000007", "type": "Prerrequisito"}, {"subject_code": "2026134", "type": "Prerrequisito"}]'::jsonb),
    ('2015968', 4, 'Disciplinary', TRUE, 'Básica Disciplinar', '[{"subject_code": "1000006", "type": "Prerrequisito"}, {"subject_code": "2026134", "type": "Prerrequisito"}]'::jsonb),
    ('2015965', 5, 'Disciplinary', TRUE, 'Básica Disciplinar', '[{"subject_code": "1000024", "type": "Prerrequisito"}, {"subject_code": "2015956", "type": "Prerrequisito"}]'::jsonb),
    ('2019978', 6, 'Disciplinary', TRUE, 'Básica Disciplinar', '[{"subject_code": "1000013", "type": "Prerrequisito"}, {"subject_code": "2015966", "type": "Prerrequisito"}]'::jsonb),
    ('2026135', 7, 'Disciplinary', TRUE, 'Básica Disciplinar', '[{"credit_rule": 77, "component": "Disciplinary"}]'::jsonb),

    -- == DISCIPLINAR: ELECTIVA TÉCNICA (Optativas) ==
    ('2026183', 6, 'Disciplinary', FALSE, 'Electiva Técnica', '[{"credit_rule": 28, "component": "Disciplinary"}]'::jsonb),
    ('2015229', 6, 'Disciplinary', FALSE, 'Electiva Técnica', '[{"credit_rule": 28, "component": "Disciplinary"}]'::jsonb),
    ('2022760', 6, 'Disciplinary', FALSE, 'Electiva Técnica', '[{"credit_rule": 28, "component": "Disciplinary"}]'::jsonb),
    ('2015967', 6, 'Disciplinary', FALSE, 'Electiva Técnica', '[{"credit_rule": 28, "component": "Disciplinary"}]'::jsonb),
    ('2015992', 6, 'Disciplinary', FALSE, 'Electiva Técnica', '[{"credit_rule": 28, "component": "Disciplinary"}]'::jsonb),
    ('2015975', 6, 'Disciplinary', FALSE, 'Electiva Técnica', '[{"credit_rule": 28, "component": "Disciplinary"}]'::jsonb),
    ('2024045', 6, 'Disciplinary', FALSE, 'Electiva Técnica', '[{"credit_rule": 28, "component": "Disciplinary"}]'::jsonb),
    ('2026136', 6, 'Disciplinary', FALSE, 'Electiva Técnica', '[{"credit_rule": 28, "component": "Disciplinary"}]'::jsonb),
    ('2015977', 6, 'Disciplinary', FALSE, 'Electiva Técnica', '[{"credit_rule": 28, "component": "Disciplinary"}]'::jsonb),
    ('2026137', 6, 'Disciplinary', FALSE, 'Electiva Técnica', '[{"credit_rule": 28, "component": "Disciplinary"}]'::jsonb),

    -- == DISCIPLINAR: HIDRÁULICA ==
    ('2015961', 5, 'Disciplinary', TRUE, 'Hidráulica', '[{"subject_code": "2015966", "type": "Prerrequisito"}]'::jsonb),
    ('2015954', 6, 'Disciplinary', TRUE, 'Hidráulica', '[{"subject_code": "2015961", "type": "Prerrequisito"}]'::jsonb),

    -- == DISCIPLINAR: VÍAS Y TRANSPORTE ==
    ('2026138', 5, 'Disciplinary', TRUE, 'Vías y Transporte', '[{"subject_code": "2015703", "type": "Prerrequisito"}, {"subject_code": "1000003", "type": "Prerrequisito"}]'::jsonb),
    ('2015963', 6, 'Disciplinary', TRUE, 'Vías y Transporte', '[{"subject_code": "2026138", "type": "Prerrequisito"}]'::jsonb),
    ('2015949', 7, 'Disciplinary', TRUE, 'Vías y Transporte', '[{"subject_code": "2015957", "type": "Prerrequisito"}, {"subject_code": "2015963", "type": "Prerrequisito"}]'::jsonb),

    -- == DISCIPLINAR: GEOTECNIA ==
    ('2015969', 5, 'Disciplinary', TRUE, 'Geotecnia', '[{"subject_code": "2015968", "type": "Prerrequisito"}]'::jsonb),
    ('2015959', 6, 'Disciplinary', TRUE, 'Geotecnia', '[{"subject_code": "2015969", "type": "Prerrequisito"}]'::jsonb),
    ('2015971', 7, 'Disciplinary', TRUE, 'Geotecnia', '[{"subject_code": "2015965", "type": "Prerrequisito"}, {"subject_code": "2015959", "type": "Prerrequisito"}]'::jsonb),

    -- == DISCIPLINAR: ESTRUCTURAS ==
    ('2015941', 5, 'Disciplinary', TRUE, 'Estructuras', '[{"subject_code": "2015968", "type": "Prerrequisito"}]'::jsonb),
    ('2015940', 6, 'Disciplinary', TRUE, 'Estructuras', '[{"subject_code": "2015941", "type": "Prerrequisito"}, {"subject_code": "2015948", "type": "Prerrequisito"}]'::jsonb),
    ('2015950', 7, 'Disciplinary', TRUE, 'Estructuras', '[{"subject_code": "2015965", "type": "Prerrequisito"}, {"subject_code": "2015940", "type": "Prerrequisito"}]'::jsonb),

    -- == DISCIPLINAR: SANEAMIENTO BÁSICO ==
    ('2015938', 6, 'Disciplinary', TRUE, 'Saneamiento Básico', '[{"subject_code": "2015961", "type": "Prerrequisito"}]'::jsonb),
    ('2015939', 7, 'Disciplinary', TRUE, 'Saneamiento Básico', '[{"subject_code": "2019978", "type": "Prerrequisito"}]'::jsonb),
    ('2015973', 8, 'Disciplinary', TRUE, 'Saneamiento Básico', '[{"subject_code": "1000011", "type": "Prerrequisito"}, {"subject_code": "2015938", "type": "Prerrequisito"}]'::jsonb),

    -- == DISCIPLINAR: CONSTRUCCIÓN ==
    ('2015955', 7, 'Disciplinary', TRUE, 'Construcción', '[{"credit_rule": 87, "component": "Disciplinary"}]'::jsonb), -- Ajustado a 87 según fuente SQL original

    -- == DISCIPLINAR: CONSTRUCCIÓN DE OBRAS CIVILES (Optativas) ==
    ('2015943', 8, 'Disciplinary', FALSE, 'Construcción de Obras Civiles', '[{"subject_code": "2015955", "type": "Prerrequisito"}]'::jsonb),
    ('2015944', 8, 'Disciplinary', FALSE, 'Construcción de Obras Civiles', '[{"subject_code": "2015955", "type": "Prerrequisito"}]'::jsonb),
    ('2015945', 8, 'Disciplinary', FALSE, 'Construcción de Obras Civiles', '[{"subject_code": "2015955", "type": "Prerrequisito"}]'::jsonb),

    -- == DISCIPLINAR: TRABAJO DE GRADO ==
    ('2015296', 9, 'Disciplinary', FALSE, 'Trabajo de Grado', '[{"credit_rule": 77, "component": "Disciplinary"}]'::jsonb),
    ('2015299', 9, 'Disciplinary', FALSE, 'Trabajo de Grado', '[{"credit_rule": 77, "component": "Disciplinary"}]'::jsonb),

    -- == LIBRE ELECCIÓN: PROFUNDIZACIÓN ==
    ('2022894', 7, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 108, "component": "Total"}]'::jsonb),
    ('2022895', 7, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 108, "component": "Total"}]'::jsonb),
    ('2026185', 7, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 108, "component": "Total"}]'::jsonb),
    ('2022914', 7, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 108, "component": "Total"}]'::jsonb),
    ('2024081', 7, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 108, "component": "Total"}]'::jsonb),
    ('2020486', 7, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 108, "component": "Total"}]'::jsonb),
    ('2020322', 7, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 108, "component": "Total"}]'::jsonb),
    ('2022916', 7, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 108, "component": "Total"}]'::jsonb),
    ('2025343', 7, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 108, "component": "Total"}]'::jsonb),
    ('2025342', 7, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 108, "component": "Total"}]'::jsonb),
    
    -- Prácticas
    ('2016762', 9, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 126, "component": "Total"}]'::jsonb),
    ('2016763', 9, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 126, "component": "Total"}]'::jsonb),
    ('1000070', 9, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 126, "component": "Total"}]'::jsonb),
    ('1000071', 9, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 126, "component": "Total"}]'::jsonb)

) AS T1(subject_code, suggested_semester, component, is_obligatory, group_name, prereq_rules)
JOIN GroupMap gm ON T1.group_name = gm.group_name AND T1.component = gm.component;
