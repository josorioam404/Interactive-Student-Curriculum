INSERT INTO Program (program_code_sia, name, snies_code, total_credits, faculty)
VALUES ('2547', 'Ingeniería Mecánica', '28', 180, 'Ingeniería')
ON CONFLICT (program_code_sia) DO NOTHING;
INSERT INTO Subject (subject_code, name, credits) VALUES
-- Fundamentación: Matemáticas, Probabilidad y Estadística
('1000004', 'Cálculo Diferencial', 4),
('1000003', 'Álgebra Lineal', 4),
('1000005', 'Cálculo Integral', 4),
('1000006', 'Cálculo en Varias Variables', 4),
('1000007', 'Ecuaciones Diferenciales', 4),
('1000013', 'Probabilidad y Estadística Fundamental', 3),

-- Fundamentación: Física
('1000019', 'Fundamentos de Mecánica', 4),
('1000017', 'Fundamentos de Electricidad y Magnetismo', 4),
('1000020', 'Fundamentos de Oscilaciones, Ondas y Óptica', 4),
('1000018', 'Fundamentos de Física Moderna', 3),
('1000021', 'Fundamentos de Mecánica de Fluidos', 3),
('2020122', 'Física de Radiaciones', 3),

-- Fundamentación: Ciencias Económicas y Administrativas
('2015703', 'Ingeniería Económica', 3),
('2015702', 'Gerencia de Proyectos', 3),

-- Fundamentación: Herramientas Informáticas y métodos numéricos
('2015734', 'Programación de Computadores', 3),
('2015970', 'Métodos Numéricos', 3),
('2017293', 'Modelación', 3),
('2015942', 'Aplicación de Elementos Finitos', 3),

-- Fundamentación: Química
('1000024', 'Principios de Química', 3),

-- Fundamentación: Expresión Gráfica
('2015711', 'Dibujo Básico', 3),

-- Disciplinar: Ingeniería de Diseño
('2017257', 'Dibujo de Máquinas', 4),
('2016640', 'Principios de Estática', 3),
('2017271', 'Principios de Dinámica', 3),
('2017268', 'Principios de Mecanismos', 3),
('2017258', 'Diseño de Elementos de Máquinas I', 3),
('2017259', 'Diseño de Elementos de Máquinas II', 3),
('2017277', 'Resistencia de Materiales', 3),

-- Disciplinar: Ingeniería Térmica y Fluidos
('2017279', 'Termodinámica Técnica', 3),
('2017272', 'Principios de Mecánica de Fluidos', 3),
('2017262', 'Fundamentos de Transferencia de Calor', 3),
('2017270', 'Plantas Térmicas', 3),
('2017269', 'Motores de Combustión Interna', 3),
('2017263', 'Fundamentos de Turbomaquinaria', 3),
('2027953', 'Termodinámica de Sistemas Energéticos', 3),

-- Disciplinar: Ingeniería de Materiales y Procesos de Manufactura
('2017278', 'Tecnología Mecánica Básica', 3),
('2017256', 'Ciencia e Ingeniería de Materiales', 3),
('2017267', 'Materiales de Ingeniería', 3),
('2017273', 'Procesos de Manufactura I', 3),
('2017274', 'Procesos de Manufactura II', 3),
('2017264', 'Ingeniería de Manufactura', 3),

-- Disciplinar: Automatización, Control y Robótica
('2017266', 'Instalaciones y Máquinas Eléctricas', 3),
('2017260', 'Electrónica Básica', 3),
('2016506', 'Señales y Sistemas I', 3),
('2015215', 'Análisis de Sistemas Dinámicos', 3),
('2017261', 'Fundamentos de Control', 3),

-- Disciplinar: Investigación, Innovación y Desarrollo Tecnológico
('2017265', 'Ingeniería y Desarrollo Sostenible', 3),
('2017275', 'Proyecto Aplicado de Ingeniería', 4),
('2017276', 'Taller de Proyectos Interdisciplinarios', 3),
('2017295', 'Trabajo de Grado', 6),
('2017296', 'Trabajo de Grado - Asignaturas de Posgrado', 6),

-- Libre Elección: Profundización (Muestra de asignaturas optativas)
('2023257', 'Análisis y Solución de Averías en Sistemas Mecánicos', 4),
('2023244', 'Computación Gráfica', 3),
('2023248', 'Diseño de Dispositivos para Máquinas Herramientas', 4),
('2023285', 'Ensayos No Destructivos', 4),
('2023250', 'Herramientas Matemáticas para la Administración', 3),
('2023286', 'Ingeniería Estratégica', 3),
('2023660', 'Mantenimiento Industrial', 4),
('2028063', 'Materiales Compuestos', 3),
('2028065', 'Metrología y Calidad', 3),
('2023288', 'Plásticos', 4),
('2023254', 'Proyecto de Plantas Térmicas y Procesos', 3),
('2023290', 'Soldadura', 3),
('2023121', 'Tratamientos Térmicos', 4),
('2023255', 'Tribología', 3),
('2023283', 'Combustión y su Tecnología', 3),
('2016770', 'Robótica', 3),
('2017287', 'Sensores y Actuadores', 3),
('2017288', 'Servomecanismos', 3),
('2016762', 'Práctica Estudiantil I', 3),
('2016763', 'Práctica Estudiantil II', 6),
('2016764', 'Práctica Estudiantil III', 9),
('1000070', 'Práctica Colombia I', 3),
('1000071', 'Práctica Colombia II', 6),
('1000072', 'Práctica Colombia III', 9)
ON CONFLICT (subject_code) DO NOTHING;
WITH InsertedGroups AS (
    INSERT INTO CurriculumGroup (program_code_sia, component, group_name, required_credits_total, required_credits_obligatory) VALUES
    ('2547', 'Foundational', 'Matemáticas, Probabilidad y Estadística', 23, 23),
    ('2547', 'Foundational', 'Física', 11, 4),
    ('2547', 'Foundational', 'Ciencias Económicas y Administrativas', 6, 6),
    ('2547', 'Foundational', 'Herramientas Informáticas y métodos numéricos', 12, 12),
    ('2547', 'Foundational', 'Química', 3, 3),
    ('2547', 'Foundational', 'Expresión Gráfica', 3, 3),
    ('2547', 'Disciplinary', 'Ingeniería de Diseño', 22, 22),
    ('2547', 'Disciplinary', 'Ingeniería Térmica y Fluidos', 15, 9),
    ('2547', 'Disciplinary', 'Ingeniería de Materiales y Procesos de Manufactura', 18, 18),
    ('2547', 'Disciplinary', 'Automatización, Control y Robótica', 15, 15),
    ('2547', 'Disciplinary', 'Investigación, Innovación y Desarrollo Tecnológico', 16, 10),
    ('2547', 'Free Elective', 'Profundización', 36, 0)
    RETURNING group_id, group_name, component
)
SELECT * FROM InsertedGroups;
WITH GroupMap AS (
    SELECT group_id, group_name, component
    FROM CurriculumGroup
    WHERE program_code_sia = '2547'
)
INSERT INTO StudyPlan (program_code_sia, subject_code, suggested_semester, component, is_obligatory, group_id, prereq_rules)
SELECT '2547', T1.subject_code, T1.suggested_semester, T1.component, T1.is_obligatory, gm.group_id, T1.prereq_rules
FROM (
    VALUES
    -- == FUNDAMENTACIÓN: MATEMÁTICAS, PROBABILIDAD Y ESTADÍSTICA ==
    ('1000004', 1, 'Foundational', TRUE, 'Matemáticas, Probabilidad y Estadística', '[{"subject_name": "Matemáticas Básicas", "type": "Prerrequisito"}]'::jsonb),
    ('1000003', 2, 'Foundational', TRUE, 'Matemáticas, Probabilidad y Estadística', '[{"subject_code": "1000004", "type": "Prerrequisito"}]'::jsonb),
    ('1000005', 2, 'Foundational', TRUE, 'Matemáticas, Probabilidad y Estadística', '[{"subject_code": "1000004", "type": "Prerrequisito"}]'::jsonb),
    ('1000006', 3, 'Foundational', TRUE, 'Matemáticas, Probabilidad y Estadística', '[{"subject_code": "1000005", "type": "Prerrequisito"}, {"subject_code": "1000003", "type": "Prerrequisito"}]'::jsonb),
    ('1000007', 3, 'Foundational', TRUE, 'Matemáticas, Probabilidad y Estadística', '[{"subject_code": "1000005", "type": "Prerrequisito"}, {"subject_code": "1000003", "type": "Prerrequisito"}]'::jsonb),
    ('1000013', 3, 'Foundational', TRUE, 'Matemáticas, Probabilidad y Estadística', '[{"subject_code": "1000004", "type": "Prerrequisito"}]'::jsonb),

    -- == FUNDAMENTACIÓN: FÍSICA ==
    ('1000019', 2, 'Foundational', TRUE, 'Física', '[{"subject_code": "1000004", "type": "Prerrequisito"}]'::jsonb),
    -- Optativas de Física
    ('1000017', 3, 'Foundational', FALSE, 'Física', '[{"subject_code": "1000019", "type": "Prerrequisito"}, {"subject_code": "1000005", "type": "Prerrequisito"}]'::jsonb),
    ('1000020', 3, 'Foundational', FALSE, 'Física', '[{"subject_code": "1000019", "type": "Prerrequisito"}, {"subject_code": "1000005", "type": "Prerrequisito"}]'::jsonb),
    ('1000018', 4, 'Foundational', FALSE, 'Física', '[{"subject_code": "1000007", "type": "Prerrequisito"}]'::jsonb),
    ('1000021', 4, 'Foundational', FALSE, 'Física', '[{"subject_code": "1000019", "type": "Prerrequisito"}]'::jsonb),
    ('2020122', 4, 'Foundational', FALSE, 'Física', '[{"subject_name": "Matemáticas Básicas", "type": "Prerrequisito"}]'::jsonb),

    -- == FUNDAMENTACIÓN: CIENCIAS ECONÓMICAS Y ADMINISTRATIVAS ==
    ('2015703', 4, 'Foundational', TRUE, 'Ciencias Económicas y Administrativas', '[{"subject_code": "1000005", "type": "Prerrequisito"}]'::jsonb),
    ('2015702', 4, 'Foundational', TRUE, 'Ciencias Económicas y Administrativas', '[{"subject_code": "2015703", "type": "Correquisito"}]'::jsonb),

    -- == FUNDAMENTACIÓN: HERRAMIENTAS INFORMÁTICAS Y MÉTODOS NUMÉRICOS ==
    ('2015734', 1, 'Foundational', TRUE, 'Herramientas Informáticas y métodos numéricos', NULL),
    ('2015970', 4, 'Foundational', TRUE, 'Herramientas Informáticas y métodos numéricos', '[{"subject_code": "1000007", "type": "Prerrequisito"}]'::jsonb),
    ('2017293', 4, 'Foundational', TRUE, 'Herramientas Informáticas y métodos numéricos', '[{"subject_code": "1000007", "type": "Prerrequisito"}]'::jsonb),
    ('2015942', 4, 'Foundational', TRUE, 'Herramientas Informáticas y métodos numéricos', '[{"subject_code": "1000007", "type": "Prerrequisito"}]'::jsonb),

    -- == FUNDAMENTACIÓN: QUÍMICA ==
    ('1000024', 1, 'Foundational', TRUE, 'Química', NULL),

    -- == FUNDAMENTACIÓN: EXPRESIÓN GRÁFICA ==
    ('2015711', 1, 'Foundational', TRUE, 'Expresión Gráfica', NULL),

    -- == DISCIPLINAR: INGENIERÍA DE DISEÑO ==
    ('2017257', 2, 'Disciplinary', TRUE, 'Ingeniería de Diseño', '[{"subject_code": "2015711", "type": "Prerrequisito"}]'::jsonb),
    ('2016640', 2, 'Disciplinary', TRUE, 'Ingeniería de Diseño', '[{"subject_code": "1000003", "type": "Prerrequisito"}]'::jsonb),
    ('2017277', 3, 'Disciplinary', TRUE, 'Ingeniería de Diseño', '[{"subject_code": "2016640", "type": "Prerrequisito"}]'::jsonb),
    ('2017271', 3, 'Disciplinary', TRUE, 'Ingeniería de Diseño', '[{"subject_code": "1000003", "type": "Prerrequisito"}]'::jsonb),
    ('2017268', 4, 'Disciplinary', TRUE, 'Ingeniería de Diseño', '[{"subject_code": "2017271", "type": "Prerrequisito"}]'::jsonb),
    ('2017258', 5, 'Disciplinary', TRUE, 'Ingeniería de Diseño', '[{"subject_code": "2017268", "type": "Prerrequisito"}, {"subject_code": "2017277", "type": "Prerrequisito"}]'::jsonb),
    ('2017259', 6, 'Disciplinary', TRUE, 'Ingeniería de Diseño', '[{"subject_code": "2017258", "type": "Prerrequisito"}]'::jsonb),

    -- == DISCIPLINAR: INGENIERÍA TÉRMICA Y FLUIDOS ==
    ('2017279', 3, 'Disciplinary', TRUE, 'Ingeniería Térmica y Fluidos', '[{"subject_code": "1000024", "type": "Prerrequisito"}]'::jsonb),
    ('2017272', 4, 'Disciplinary', TRUE, 'Ingeniería Térmica y Fluidos', '[{"subject_code": "1000007", "type": "Prerrequisito"}]'::jsonb),
    ('2017262', 5, 'Disciplinary', TRUE, 'Ingeniería Térmica y Fluidos', '[{"subject_code": "2017272", "type": "Prerrequisito"}]'::jsonb),
    -- Optativas Térmica
    ('2017270', 6, 'Disciplinary', FALSE, 'Ingeniería Térmica y Fluidos', '[{"subject_code": "2017262", "type": "Prerrequisito"}]'::jsonb),
    ('2017269', 6, 'Disciplinary', FALSE, 'Ingeniería Térmica y Fluidos', '[{"subject_code": "2017262", "type": "Prerrequisito"}]'::jsonb),
    ('2017263', 6, 'Disciplinary', FALSE, 'Ingeniería Térmica y Fluidos', '[{"subject_code": "2017262", "type": "Prerrequisito"}]'::jsonb),
    ('2027953', 6, 'Disciplinary', FALSE, 'Ingeniería Térmica y Fluidos', '[{"subject_code": "2017262", "type": "Prerrequisito"}]'::jsonb),

    -- == DISCIPLINAR: INGENIERÍA DE MATERIALES Y PROCESOS DE MANUFACTURA ==
    ('2017278', 2, 'Disciplinary', TRUE, 'Ingeniería de Materiales y Procesos de Manufactura', '[{"subject_code": "1000024", "type": "Prerrequisito"}]'::jsonb),
    ('2017256', 3, 'Disciplinary', TRUE, 'Ingeniería de Materiales y Procesos de Manufactura', '[{"subject_code": "2017278", "type": "Prerrequisito"}, {"subject_code": "1000024", "type": "Prerrequisito"}]'::jsonb),
    ('2017267', 4, 'Disciplinary', TRUE, 'Ingeniería de Materiales y Procesos de Manufactura', '[{"subject_code": "2017256", "type": "Prerrequisito"}]'::jsonb),
    ('2017273', 5, 'Disciplinary', TRUE, 'Ingeniería de Materiales y Procesos de Manufactura', '[{"subject_code": "2017256", "type": "Prerrequisito"}, {"subject_code": "2017277", "type": "Prerrequisito"}]'::jsonb),
    ('2017274', 6, 'Disciplinary', TRUE, 'Ingeniería de Materiales y Procesos de Manufactura', '[{"subject_code": "2017273", "type": "Prerrequisito"}, {"subject_code": "2017267", "type": "Prerrequisito"}]'::jsonb),
    ('2017264', 7, 'Disciplinary', TRUE, 'Ingeniería de Materiales y Procesos de Manufactura', '[{"subject_code": "2017274", "type": "Prerrequisito"}, {"subject_code": "1000013", "type": "Prerrequisito"}]'::jsonb),

    -- == DISCIPLINAR: AUTOMATIZACIÓN, CONTROL Y ROBÓTICA ==
    ('2017266', 3, 'Disciplinary', TRUE, 'Automatización, Control y Robótica', '[{"subject_code": "1000003", "type": "Prerrequisito"}]'::jsonb),
    ('2017260', 4, 'Disciplinary', TRUE, 'Automatización, Control y Robótica', '[{"subject_code": "2017266", "type": "Prerrequisito"}]'::jsonb),
    ('2016506', 5, 'Disciplinary', TRUE, 'Automatización, Control y Robótica', '[{"subject_code": "2017266", "type": "Prerrequisito"}]'::jsonb),
    ('2015215', 6, 'Disciplinary', TRUE, 'Automatización, Control y Robótica', '[{"subject_code": "2017260", "type": "Prerrequisito"}, {"subject_code": "2016506", "type": "Prerrequisito"}]'::jsonb),
    ('2017261', 7, 'Disciplinary', TRUE, 'Automatización, Control y Robótica', '[{"subject_code": "2015215", "type": "Prerrequisito"}]'::jsonb),

    -- == DISCIPLINAR: INVESTIGACIÓN, INNOVACIÓN Y DESARROLLO TECNOLÓGICO ==
    ('2017265', 1, 'Disciplinary', TRUE, 'Investigación, Innovación y Desarrollo Tecnológico', NULL),
    ('2017275', 8, 'Disciplinary', TRUE, 'Investigación, Innovación y Desarrollo Tecnológico', '[{"credit_rule": 65, "component": "Disciplinary"}]'::jsonb),
    ('2017276', 9, 'Disciplinary', TRUE, 'Investigación, Innovación y Desarrollo Tecnológico', '[{"credit_rule": 47, "component": "Disciplinary"}, {"subject_code": "2017265", "type": "Prerrequisito"}]'::jsonb),
    -- Trabajo de Grado
    ('2017295', 10, 'Disciplinary', FALSE, 'Investigación, Innovación y Desarrollo Tecnológico', '[{"credit_rule": 69, "component": "Disciplinary"}]'::jsonb),
    ('2017296', 10, 'Disciplinary', FALSE, 'Investigación, Innovación y Desarrollo Tecnológico', '[{"credit_rule": 69, "component": "Disciplinary"}]'::jsonb),

    -- == LIBRE ELECCIÓN: PROFUNDIZACIÓN ==
    ('2023257', 7, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 126, "component": "Total"}]'::jsonb),
    ('2023244', 7, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 126, "component": "Total"}]'::jsonb),
    ('2023248', 7, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 126, "component": "Total"}]'::jsonb),
    ('2023285', 7, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 126, "component": "Total"}]'::jsonb),
    ('2023250', 7, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 126, "component": "Total"}]'::jsonb),
    ('2023286', 7, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 126, "component": "Total"}]'::jsonb),
    ('2023660', 7, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 126, "component": "Total"}]'::jsonb),
    ('2028063', 7, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 126, "component": "Total"}]'::jsonb),
    ('2028065', 7, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 126, "component": "Total"}]'::jsonb),
    ('2023288', 7, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 126, "component": "Total"}]'::jsonb),
    ('2023254', 7, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 126, "component": "Total"}]'::jsonb),
    ('2023290', 7, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 126, "component": "Total"}]'::jsonb),
    ('2023121', 7, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 126, "component": "Total"}]'::jsonb),
    ('2023255', 7, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 126, "component": "Total"}]'::jsonb),
    ('2023283', 7, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 126, "component": "Total"}]'::jsonb),
    ('2016770', 7, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 126, "component": "Total"}]'::jsonb),
    ('2017287', 7, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 126, "component": "Total"}]'::jsonb),
    ('2017288', 7, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 126, "component": "Total"}]'::jsonb),

    -- Prácticas (70% de avance)
    ('2016762', 8, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 126, "component": "Total"}]'::jsonb),
    ('2016763', 8, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 126, "component": "Total"}]'::jsonb),
    ('2016764', 8, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 126, "component": "Total"}]'::jsonb),
    ('1000070', 8, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 126, "component": "Total"}]'::jsonb),
    ('1000071', 8, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 126, "component": "Total"}]'::jsonb),
    ('1000072', 8, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 126, "component": "Total"}]'::jsonb)

) AS T1(subject_code, suggested_semester, component, is_obligatory, group_name, prereq_rules)
JOIN GroupMap gm ON T1.group_name = gm.group_name AND T1.component = gm.component;
