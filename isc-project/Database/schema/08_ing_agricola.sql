INSERT INTO Program (program_code_sia, name, snies_code, total_credits, faculty)
VALUES ('2541', 'Ingeniería Agrícola', '24', 180, 'Ingeniería');

INSERT INTO Subject (subject_code, name, credits) VALUES 
('1000004', 'Cálculo diferencial', 4),
('1000005', 'Cálculo integral', 4),
('1000006', 'Cálculo en varias variables', 4),
('1000007', 'Ecuaciones diferenciales', 4),
('1000003', 'Álgebra lineal', 4),
('1000013', 'Probabilidad y estadística fundamental', 3),
('1000019', 'Fundamentos de mecánica', 4),
('1000017', 'Fundamentos de electricidad y magnetismo', 4),
('1000020', 'Fundamentos de oscilaciones, ondas y óptica', 4),
('1000009', 'Biología general', 3),
('1000024', 'Principios de química', 3),
('2017538', 'Fisiología vegetal', 4),
('2015711', 'Dibujo básico', 3),
('2015734', 'Programación de computadores', 3),
('2016375', 'Programación orientada a objetos', 3),
('2015970', 'Métodos numéricos', 3),
('2017293', 'Modelación matemática', 3),
('2015942', 'Aplicación de elementos finitos', 3),
('2025970', 'Modelos y simulación', 3),
('2015703', 'Ingeniería económica', 3),
('2015702', 'Gerencia y gestión de proyectos', 3),
('2015698', 'Administración de empresas', 3),
('2015699', 'Administración de mercados', 3),
('2015694', 'Derecho laboral', 3),
('2016592', 'Economía general', 3),
('2016741', 'Finanzas', 3),
('2016587', 'Competitividad, productividad y benchmarking', 3),
('2015695', 'Diseño, gestión y evaluación de proyectos', 3),
('2015700', 'Fundamentos de contabilidad financiera', 3),
('2015701', 'Gerencia de recursos humanos', 3),
('2016597', 'Gerencia y planeación estratégica', 3),
('2016598', 'Gestión ambiental empresarial', 3),
('2016602', 'Investigación de mercados', 3),
('2015704', 'Mercadeo internacional', 3),
('2016046', 'Mercados I', 4),
('2016056', 'Teoría de la decisión', 4),
('2016609', 'Seguridad industrial', 3),
('2016610', 'Sistemas de costos', 4),
('2016635', 'Introducción a la ingeniería agrícola', 3),
('2026134', 'Estática', 3),
('2015958', 'Geomática básica', 4),
('2015966', 'Mecánica de fluidos', 4),
('2015969', 'Mecánica de Suelos', 3),
('2016630', 'Electrotecnia', 3),
('2015741', 'Termodinámica', 3),
('2015968', 'Mecánica de Sólidos', 4), 
('2016632', 'Suelos Agrícolas', 3), 
('2015961', 'Hidráulica básica', 4), 
('2015978', 'Hidrología', 3), 
('2016634', 'Ingeniería de riegos', 3),
('2016628', 'Diseño de sistemas de riego', 3),
('2016629', 'Drenaje de tierras agrícolas', 3),
('2016626', 'Control en biosistemas', 3),
('2016643', 'Transferencia de calor y masa', 3),
('2016638', 'Poscosecha de frutas y hortalizas', 3),
('2016639', 'Poscosecha de granos y semillas', 3),
('2015941', 'Análisis estructural básico', 3),
('2016627', 'Diseño de estructuras de concreto', 3),
('2016625', 'Construcciones rurales: Manejo ambiental', 3),
('2023219', 'Construcciones rurales: Materiales y administración de obra', 3),
('2016631', 'Elementos de máquinas agrícolas', 3),
('2016633', 'Fuentes de potencia en la agricultura', 3),
('2016636', 'Máquinas agrícolas', 3),
('2024045', 'Taller de proyectos interdisciplinarios', 3),
('2015372', 'Trabajo de Grado', 6),
('2015373', 'Trabajo de Grado - Asignaturas de Posgrado', 6),
('2024029', 'Administración de maquinaria', 3),
('2022920', 'Aplicación de pesticidas', 3),
('2024030', 'Bombas y estaciones de bombeo', 3),
('2015954', 'Estructuras hidráulicas', 3),
('2022894', 'Diseño básico de estructuras metálicas', 3),
('2024607', 'Diseño de implementos de labranza', 3),
('2024466', 'Ingeniería de conservación de agua y suelos', 3),
('2024612', 'Manejo y conservaciones de perecederos', 3),
('2024611', 'Máquinas cosechadoras', 3),
('2022923', 'Riego por goteo', 3),
('2022913', 'Riego por superficie', 3),
('2024608', 'Invernaderos', 3),
('2025988', 'Taller de simulación procesos de manufactura y sistemas de servicios', 3),
('2025987', 'Modelos estocásticos para procesos de manufactura y sistemas de servicios', 3),
('2025971', 'Optimización', 3),
('2016762', 'Práctica Estudiantil I', 3),
('2016763', 'Práctica Estudiantil II', 6),
('1000070', 'Práctica Colombia I', 3),
('1000071', 'Práctica Colombia II', 6)
ON CONFLICT (subject_code) DO NOTHING;
WITH InsertedGroups AS (
INSERT INTO CurriculumGroup (program_code_sia, component, group_name, required_credits_total, required_credits_obligatory) VALUES
-- Componente de Fundamentación (59 exigidos)
('2541', 'Foundational', 'Matemáticas, Probabilidad y Estadística', 23, 23),
('2541', 'Foundational', 'Física', 8, 8),
('2541', 'Foundational', 'Química y Biología', 10, 10),
('2541', 'Foundational', 'Expresión Gráfica', 3, 3),
('2541', 'Foundational', 'Herramientas Informáticas y métodos numéricos', 6, 6),
('2541', 'Foundational', 'Ciencias Económicas y Administrativas', 9, 9),
-- Componente Disciplinar (85 exigidos)
('2541', 'Disciplinary', 'Asignaturas sin agrupación', 37, 37),
('2541', 'Disciplinary', 'Ingeniería de Riego y Drenaje', 9, 9),
('2541', 'Disciplinary', 'Automatización y Control', 3, 3),
('2541', 'Disciplinary', 'Poscosecha de Productos Agropecuarios', 9, 9),
('2541', 'Disciplinary', 'Construcciones Rurales', 9, 9),
('2541', 'Disciplinary', 'Maquinaria Agrícola y Mecanización', 9, 9),
('2541', 'Disciplinary', 'Taller De Proyectos De Ingeniería', 3, 3),
('2541', 'Disciplinary', 'Trabajo de Grado', 6, 0), 
-- Componente de Libre Elección (36 exigidos)
('2541', 'Free Elective', 'Profundización', 36, 0)
RETURNING group_id, group_name, component
)
SELECT * FROM InsertedGroups;
WITH GroupMap AS (
    SELECT group_id, group_name, component FROM CurriculumGroup WHERE program_code_sia = '2541'
)
INSERT INTO StudyPlan (program_code_sia, subject_code, suggested_semester, component, is_obligatory, group_id, prereq_rules)
SELECT '2541', T1.subject_code, T1.suggested_semester, T1.component, T1.is_obligatory, gm.group_id, T1.prereq_rules
FROM (
-- Componente de Fundamentación
VALUES
-- Matemáticas, Probabilidad y Estadística (23 obligatorios)
('1000004', 1, 'Foundational', TRUE, 'Matemáticas, Probabilidad y Estadística', NULL),
('1000005', 2, 'Foundational', TRUE, 'Matemáticas, Probabilidad y Estadística', '[{"subject_code": "1000004", "type": "Prerrequisito"}]'::jsonb),
('1000003', 2, 'Foundational', TRUE, 'Matemáticas, Probabilidad y Estadística', '[{"subject_code": "1000004", "type": "Prerrequisito"}]'::jsonb),
('1000006', 3, 'Foundational', TRUE, 'Matemáticas, Probabilidad y Estadística', '[{"subject_code": "1000005", "type": "Prerrequisito"}, {"subject_code": "1000003", "type": "Prerrequisito"}]'::jsonb),
('1000007', 3, 'Foundational', TRUE, 'Matemáticas, Probabilidad y Estadística', '[{"subject_code": "1000005", "type": "Prerrequisito"}, {"subject_code": "1000003", "type": "Prerrequisito"}]'::jsonb),
('1000013', 2, 'Foundational', TRUE, 'Matemáticas, Probabilidad y Estadística', '[{"subject_code": "1000004", "type": "Prerrequisito"}]'::jsonb),

-- Física (8 obligatorios)
('1000019', 1, 'Foundational', TRUE, 'Física', '[{"subject_code": "1000004", "type": "Prerrequisito"}]'::jsonb),
('1000017', 2, 'Foundational', FALSE, 'Física', '[{"subject_code": "1000019", "type": "Prerrequisito"}, {"subject_code": "1000005", "type": "Prerrequisito"}]'::jsonb),
('1000020', 3, 'Foundational', FALSE, 'Física', '[{"subject_code": "1000019", "type": "Prerrequisito"}, {"subject_code": "1000007", "type": "Prerrequisito"}]'::jsonb),

-- Química y Biología (10 obligatorios)
('1000009', 1, 'Foundational', TRUE, 'Química y Biología', NULL),
('1000024', 1, 'Foundational', TRUE, 'Química y Biología', NULL),
('2017538', 3, 'Foundational', TRUE, 'Química y Biología', '[{"subject_code": "1000024", "type": "Prerrequisito"}]'::jsonb),

-- Expresión Gráfica (3 obligatorios)
('2015711', 1, 'Foundational', TRUE, 'Expresión Gráfica', NULL),

-- Herramientas Informáticas y métodos numéricos (6 obligatorios)
('2015734', 1, 'Foundational', TRUE, 'Herramientas Informáticas y métodos numéricos', NULL),
('2016375', 2, 'Foundational', FALSE, 'Herramientas Informáticas y métodos numéricos', '[{"subject_code": "2015734", "type": "Prerrequisito"}]'::jsonb),
('2015970', 4, 'Foundational', FALSE, 'Herramientas Informáticas y métodos numéricos', '[{"subject_code": "1000007", "type": "Prerrequisito"}]'::jsonb),
('2017293', 4, 'Foundational', FALSE, 'Herramientas Informáticas y métodos numéricos', '[{"subject_code": "1000007", "type": "Prerrequisito"}]'::jsonb),
('2015942', 4, 'Foundational', FALSE, 'Herramientas Informáticas y métodos numéricos', '[{"subject_code": "1000007", "type": "Prerrequisito"}]'::jsonb),
('2025970', 4, 'Foundational', FALSE, 'Herramientas Informáticas y métodos numéricos', '[{"subject_code": "1000007", "type": "Prerrequisito"}]'::jsonb),

-- Ciencias Económicas y Administrativas (9 obligatorios)
('2015703', 3, 'Foundational', TRUE, 'Ciencias Económicas y Administrativas', '[{"subject_code": "1000005", "type": "Prerrequisito"}]'::jsonb),
('2015702', 4, 'Foundational', TRUE, 'Ciencias Económicas y Administrativas', '[{"subject_code": "2015703", "type": "Prerrequisito"}]'::jsonb),
('2015698', 5, 'Foundational', FALSE, 'Ciencias Económicas y Administrativas', '[{"subject_code": "2015702", "type": "Prerrequisito"}]'::jsonb),
('2015699', 5, 'Foundational', FALSE, 'Ciencias Económicas y Administrativas', '[{"subject_code": "2015702", "type": "Prerrequisito"}]'::jsonb),
('2015694', 5, 'Foundational', FALSE, 'Ciencias Económicas y Administrativas', '[{"subject_code": "2015702", "type": "Prerrequisito"}]'::jsonb),
('2016592', 5, 'Foundational', FALSE, 'Ciencias Económicas y Administrativas', '[{"subject_code": "2015702", "type": "Prerrequisito"}]'::jsonb),
('2016741', 5, 'Foundational', FALSE, 'Ciencias Económicas y Administrativas', '[{"subject_code": "2015702", "type": "Prerrequisito"}]'::jsonb),
('2016587', 5, 'Foundational', FALSE, 'Ciencias Económicas y Administrativas', '[{"subject_code": "2015702", "type": "Prerrequisito"}]'::jsonb),
('2015695', 5, 'Foundational', FALSE, 'Ciencias Económicas y Administrativas', '[{"subject_code": "2015702", "type": "Prerrequisito"}]'::jsonb),
('2015700', 5, 'Foundational', FALSE, 'Ciencias Económicas y Administrativas', '[{"subject_code": "2015702", "type": "Prerrequisito"}]'::jsonb),
('2015701', 5, 'Foundational', FALSE, 'Ciencias Económicas y Administrativas', '[{"subject_code": "2015702", "type": "Prerrequisito"}]'::jsonb),
('2016597', 5, 'Foundational', FALSE, 'Ciencias Económicas y Administrativas', '[{"subject_code": "2015702", "type": "Prerrequisito"}]'::jsonb),
('2016598', 5, 'Foundational', FALSE, 'Ciencias Económicas y Administrativas', '[{"subject_code": "2015702", "type": "Prerrequisito"}]'::jsonb),
('2016602', 5, 'Foundational', FALSE, 'Ciencias Económicas y Administrativas', '[{"subject_code": "2015702", "type": "Prerrequisito"}]'::jsonb),
('2015704', 5, 'Foundational', FALSE, 'Ciencias Económicas y Administrativas', '[{"subject_code": "2015702", "type": "Prerrequisito"}]'::jsonb),
('2016046', 5, 'Foundational', FALSE, 'Ciencias Económicas y Administrativas', '[{"subject_code": "2015702", "type": "Prerrequisito"}]'::jsonb),
('2016056', 5, 'Foundational', FALSE, 'Ciencias Económicas y Administrativas', '[{"subject_code": "2015702", "type": "Prerrequisito"}]'::jsonb),
('2016609', 5, 'Foundational', FALSE, 'Ciencias Económicas y Administrativas', '[{"subject_code": "2015702", "type": "Prerrequisito"}]'::jsonb),
('2016610', 5, 'Foundational', FALSE, 'Ciencias Económicas y Administrativas', '[{"subject_code": "2015702", "type": "Prerrequisito"}]'::jsonb),

-- Componente Disciplinar
-- Asignaturas sin agrupación (37 obligatorios)
('2016635', 1, 'Disciplinary', TRUE, 'Asignaturas sin agrupación', NULL),
('2015968', 2, 'Disciplinary', FALSE, 'Asignaturas sin agrupación', '[{"subject_code": "1000003", "type": "Prerrequisito"}, {"subject_code": "1000019", "type": "Prerrequisito"}]'::jsonb), 
('2016632', 3, 'Disciplinary', FALSE, 'Asignaturas sin agrupación', '[{"subject_code": "1000024", "type": "Prerrequisito"}]'::jsonb), 
('2026134', 3, 'Disciplinary', TRUE, 'Asignaturas sin agrupación', '[{"subject_code": "1000003", "type": "Prerrequisito"}, {"subject_code": "1000019", "type": "Prerrequisito"}]'::jsonb),
('2015958', 3, 'Disciplinary', TRUE, 'Asignaturas sin agrupación', '[{"subject_code": "2015711", "type": "Prerrequisito"}, {"subject_code": "2016635", "type": "Prerrequisito"}]'::jsonb),
('2015741', 4, 'Disciplinary', TRUE, 'Asignaturas sin agrupación', '[{"subject_code": "1000004", "type": "Prerrequisito"}]'::jsonb),
('2015966', 4, 'Disciplinary', TRUE, 'Asignaturas sin agrupación', '[{"subject_code": "1000006", "type": "Prerrequisito"}, {"subject_code": "1000007", "type": "Prerrequisito"}, {"subject_code": "2026134", "type": "Prerrequisito"}]'::jsonb),
('2015961', 5, 'Disciplinary', FALSE, 'Asignaturas sin agrupación', '[{"subject_code": "2015966", "type": "Prerrequisito"}]'::jsonb), 
('2015978', 5, 'Disciplinary', FALSE, 'Asignaturas sin agrupación', '[{"subject_code": "2015966", "type": "Prerrequisito"}]'::jsonb), 
('2015969', 5, 'Disciplinary', TRUE, 'Asignaturas sin agrupación', '[{"subject_code": "2015968", "type": "Prerrequisito"}, {"subject_code": "2016632", "type": "Prerrequisito"}]'::jsonb),
('2016630', 5, 'Disciplinary', TRUE, 'Asignaturas sin agrupación', '[{"credit_rule": 40, "component": "Disciplinary"}]'::jsonb),

-- Ingeniería de Riego y Drenaje (9 obligatorios)
('2016634', 6, 'Disciplinary', TRUE, 'Ingeniería de Riego y Drenaje', '[{"subject_code": "2015961", "type": "Prerrequisito"}, {"subject_code": "2016632", "type": "Prerrequisito"}]'::jsonb),
('2016628', 7, 'Disciplinary', TRUE, 'Ingeniería de Riego y Drenaje', '[{"subject_code": "2016634", "type": "Prerrequisito"}]'::jsonb),
('2016629', 7, 'Disciplinary', TRUE, 'Ingeniería de Riego y Drenaje', '[{"subject_code": "2016634", "type": "Prerrequisito"}, {"subject_code": "2015978", "type": "Prerrequisito"}]'::jsonb),

-- Automatización y Control (3 obligatorios)
('2016626', 6, 'Disciplinary', TRUE, 'Automatización y Control', '[{"subject_code": "2016630", "type": "Prerrequisito"}]'::jsonb),

-- Poscosecha de Productos Agropecuarios (9 obligatorios)
('2016643', 6, 'Disciplinary', TRUE, 'Poscosecha de Productos Agropecuarios', '[{"subject_code": "2015741", "type": "Prerrequisito"}]'::jsonb),
('2016638', 7, 'Disciplinary', TRUE, 'Poscosecha de Productos Agropecuarios', '[{"subject_code": "2016643", "type": "Prerrequisito"}, {"subject_code": "2017538", "type": "Prerrequisito"}]'::jsonb),
('2016639', 8, 'Disciplinary', TRUE, 'Poscosecha de Productos Agropecuarios', '[{"subject_code": "2016638", "type": "Prerrequisito"}]'::jsonb),

-- Construcciones Rurales (9 obligatorios)
('2015941', 6, 'Disciplinary', TRUE, 'Construcciones Rurales', '[{"subject_code": "2015968", "type": "Prerrequisito"}]'::jsonb),
('2016627', 7, 'Disciplinary', TRUE, 'Construcciones Rurales', '[{"subject_code": "2015941", "type": "Prerrequisito"}]'::jsonb),
('2016625', 8, 'Disciplinary', FALSE, 'Construcciones Rurales', '[{"subject_code": "2016627", "type": "Prerrequisito"}]'::jsonb),
('2023219', 8, 'Disciplinary', FALSE, 'Construcciones Rurales', '[{"subject_code": "2016627", "type": "Prerrequisito"}]'::jsonb),

-- Maquinaria Agrícola y Mecanización (9 obligatorios)
('2016631', 6, 'Disciplinary', TRUE, 'Maquinaria Agrícola y Mecanización', '[{"subject_code": "2015968", "type": "Prerrequisito"}]'::jsonb),
('2016633', 7, 'Disciplinary', TRUE, 'Maquinaria Agrícola y Mecanización', '[{"subject_code": "2016631", "type": "Prerrequisito"}]'::jsonb),
('2016636', 8, 'Disciplinary', TRUE, 'Maquinaria Agrícola y Mecanización', '[{"subject_code": "2016633", "type": "Prerrequisito"}]'::jsonb),

-- Taller De Proyectos De Ingeniería (3 obligatorios)
('2024045', 7, 'Disciplinary', TRUE, 'Taller De Proyectos De Ingeniería', '[{"credit_rule": 65, "component": "Disciplinary"}]'::jsonb),

-- Trabajo de Grado (6 exigidos, 0 obligatorios, pero se exige tomar una modalidad)
('2015372', 10, 'Disciplinary', FALSE, 'Trabajo de Grado', '[{"credit_rule": 68, "component": "Disciplinary"}]'::jsonb),
('2015373', 10, 'Disciplinary', FALSE, 'Trabajo de Grado', '[{"credit_rule": 68, "component": "Disciplinary"}]'::jsonb),

-- Componente de Libre Elección (36 Créditos exigidos)
-- Profundización (0 obligatorios)
('2024029', 9, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 108, "component": "Total"}]'::jsonb),
('2022920', 9, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 108, "component": "Total"}]'::jsonb),
('2024030', 9, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 108, "component": "Total"}]'::jsonb),
('2015954', 9, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 108, "component": "Total"}]'::jsonb),
('2022894', 9, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 108, "component": "Total"}]'::jsonb),
('2024607', 9, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 108, "component": "Total"}]'::jsonb),
('2024466', 9, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 108, "component": "Total"}]'::jsonb),
('2024612', 9, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 108, "component": "Total"}]'::jsonb),
('2024611', 9, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 108, "component": "Total"}]'::jsonb),
('2022923', 9, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 108, "component": "Total"}]'::jsonb),
('2022913', 9, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 108, "component": "Total"}]'::jsonb),
('2024608', 9, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 108, "component": "Total"}]'::jsonb),
('2025988', 9, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 108, "component": "Total"}]'::jsonb),
('2025987', 9, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 108, "component": "Total"}]'::jsonb),
('2025971', 9, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 108, "component": "Total"}]'::jsonb),
('2016762', 10, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 126, "component": "Total"}]'::jsonb),
('2016763', 10, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 126, "component": "Total"}]'::jsonb),
('1000070', 10, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 126, "component": "Total"}]'::jsonb),
('1000071', 10, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 126, "component": "Total"}]'::jsonb)
) AS T1(subject_code, suggested_semester, component, is_obligatory, group_name, prereq_rules)
JOIN GroupMap gm ON T1.group_name = gm.group_name AND T1.component = gm.component;