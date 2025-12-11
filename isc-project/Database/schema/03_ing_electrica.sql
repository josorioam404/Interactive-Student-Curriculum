INSERT INTO Program (program_code_sia, name, snies_code, total_credits, faculty)
VALUES ('2544', 'Ingeniería Eléctrica', '27', 167, 'Ingeniería');
INSERT INTO Subject (subject_code, name, credits) VALUES 
('1000004', 'Cálculo diferencial', 4),
('1000005', 'Cálculo integral', 4),
('1000003', 'Álgebra lineal', 4),
('1000006', 'Cálculo en varias variables', 4),
('1000007', 'Ecuaciones diferenciales', 4),
('2015159', 'Variable compleja', 4),
('1000013', 'Probabilidad y estadística fundamental', 3),
('1000015', 'Probabilidad fundamental', 3),
('1000040', 'Introducción a la ciencia de materiales', 3),
('1000019', 'Fundamentos de mecánica', 4),
('1000017', 'Fundamentos de electricidad y magnetismo', 4),
('1000020', 'Fundamentos de oscilaciones, ondas y óptica', 4),
('1000021', 'Fundamentos de mecánica de fluidos y termodinámica', 3),
('2015703', 'Ingeniería económica', 3),
('2015702', 'Gerencia y gestión de proyectos', 3),
('2015701', 'Gerencia de recursos humanos', 3),
('2016741', 'Finanzas', 3),
('2016609', 'Seguridad Industrial', 3),
('2016592', 'Economía general', 3),
('2015734', 'Programación de computadores', 3),
('2016845', 'Mecánica para ingeniería', 3),
('2016603', 'Investigación de operaciones I', 3),
('2016500', 'Física de semiconductores', 3),
('1000018', 'Fundamentos de física moderna', 3),
('2016375', 'Programación orientada a objetos', 3),
('2023212', 'Análisis y diseño de experimentos', 4),
('1000016', 'Inferencia estadística fundamental', 3),
('2015970', 'Métodos numéricos', 3),
('2016489', 'Circuitos eléctricos I', 3),
('2016490', 'Circuitos eléctricos II', 4),
('2016487', 'Campos electromagnéticos', 4),
('2016506', 'Señales y sistemas I', 3),
('2016507', 'Señales y sistemas II', 3),
('2016493', 'Control', 4),
('2017003', 'Instalaciones eléctricas', 3),
('2016494', 'Conversión electromagnética', 3),
('2016858', 'Laboratorio conversión electromagnética', 2),
('2016857', 'Laboratorio de aislamiento eléctrico', 2),
('2016852', 'Aplicación y control de motores', 3),
('2016495', 'Electrónica análoga I', 4),
('2016498', 'Electrónica digital I', 4),
('2016865', 'Transmisión y distribución', 3),
('2016861', 'Introducción a los sistemas de energía eléctrica', 3),
('2016851', 'Análisis de sistemas de potencia', 3),
('2024049', 'Subestaciones eléctricas', 3),
('2016856', 'Introducción a ingeniería eléctrica', 5),
('2016862', 'Taller de ingeniería eléctrica', 2),
('2016863', 'Taller de Ingeniería', 3),
('2024045', 'Taller de proyectos interdisciplinarios', 3),
('2016866', 'Trabajo de Grado', 6),
('2016867', 'Trabajo de Grado - Asignaturas de Posgrado', 6),
('2024048', 'Regulación de energía', 3),
('2016850', 'Aislamiento eléctrico', 3),
('2024295', 'Calidad de energía', 3),
('2016762', 'Práctica estudiantil I', 3),
('2016763', 'Práctica estudiantil II', 6),
('2016764', 'Práctica estudiantil III', 9),
('2016853', 'Diseño de sistemas de distribución', 3),
('2024296', 'Seguridad eléctrica', 3),
('2024297', 'Tópicos de aislamiento eléctrico', 3),
('2016859', 'Protección de sistemas de potencia', 3)
ON CONFLICT (subject_code) DO NOTHING;
WITH InsertedGroups AS (
INSERT INTO CurriculumGroup (program_code_sia, component, group_name, required_credits_total, required_credits_obligatory) VALUES
('2544', 'Foundational', 'Matemáticas, probabilidad y estadística', 27, 24),
('2544', 'Foundational', 'Ciencia de los materiales', 3, 3),
('2544', 'Foundational', 'Física', 15, 15),
('2544', 'Foundational', 'Ciencias económicas y administración', 9, 3),
('2544', 'Foundational', 'Informática', 3, 3),
('2544', 'Foundational', 'Herramientas para ingeniería', 6, 3),
('2544', 'Disciplinary', 'Circuitos y campos', 11, 11),
('2544', 'Disciplinary', 'Señales, sistemas y control', 10, 10),
('2544', 'Disciplinary', 'Electrotecnia', 8, 6),
('2544', 'Disciplinary', 'Electrónica', 8, 8),
('2544', 'Disciplinary', 'Sistemas de potencia', 12, 9),
('2544', 'Disciplinary', 'Contexto profesional, innovación e investigación', 22, 19),
('2544', 'Free Elective', 'Profundización', 33, 0)
RETURNING group_id, group_name, component
)
SELECT * FROM InsertedGroups;
WITH GroupMap AS (
    SELECT group_id, group_name, component FROM CurriculumGroup WHERE program_code_sia = '2544'
)
INSERT INTO StudyPlan (program_code_sia, subject_code, suggested_semester, component, is_obligatory, group_id, prereq_rules)
SELECT '2544', T1.subject_code, T1.suggested_semester, T1.component, T1.is_obligatory, gm.group_id, T1.prereq_rules
FROM (
VALUES
('1000004', 1, 'Foundational', TRUE, 'Matemáticas, probabilidad y estadística', NULL),
('1000005', 2, 'Foundational', TRUE, 'Matemáticas, probabilidad y estadística', '[{"subject_code": "1000004", "type": "Prerrequisito"}]'::jsonb),
('1000003', 2, 'Foundational', TRUE, 'Matemáticas, probabilidad y estadística', '[{"subject_code": "1000004", "type": "Prerrequisito"}]'::jsonb),
('1000006', 3, 'Foundational', TRUE, 'Matemáticas, probabilidad y estadística', '[{"subject_code": "1000005", "type": "Prerrequisito"}, {"subject_code": "1000003", "type": "Prerrequisito"}]'::jsonb),
('1000007', 3, 'Foundational', TRUE, 'Matemáticas, probabilidad y estadística', '[{"subject_code": "1000005", "type": "Prerrequisito"}, {"subject_code": "1000003", "type": "Prerrequisito"}]'::jsonb),
('2015159', 4, 'Foundational', TRUE, 'Matemáticas, probabilidad y estadística', '[{"subject_code": "1000007", "type": "Prerrequisito"}]'::jsonb),
('1000013', 2, 'Foundational', FALSE, 'Matemáticas, probabilidad y estadística', '[{"subject_code": "1000004", "type": "Prerrequisito"}]'::jsonb),
('1000015', 3, 'Foundational', FALSE, 'Matemáticas, probabilidad y estadística', '[{"subject_code": "1000005", "type": "Prerrequisito"}]'::jsonb),

('1000040', 3, 'Foundational', TRUE, 'Ciencia de los materiales', '[{"subject_code": "1000019", "type": "Prerrequisito"}]'::jsonb),

('1000019', 1, 'Foundational', TRUE, 'Física', '[{"subject_code": "1000004", "type": "Prerrequisito"}]'::jsonb),
('1000017', 2, 'Foundational', TRUE, 'Física', '[{"subject_code": "1000005", "type": "Prerrequisito"}, {"subject_code": "1000019", "type": "Prerrequisito"}]'::jsonb),
('1000020', 3, 'Foundational', TRUE, 'Física', '[{"subject_code": "1000019", "type": "Prerrequisito"}, {"subject_code": "1000007", "type": "Prerrequisito"}]'::jsonb),
('1000021', 4, 'Foundational', TRUE, 'Física', '[{"subject_code": "1000019", "type": "Prerrequisito"}]'::jsonb),

('2015703', 3, 'Foundational', TRUE, 'Ciencias económicas y administración', '[{"subject_code": "1000005", "type": "Prerrequisito"}]'::jsonb),
('2015702', 4, 'Foundational', FALSE, 'Ciencias económicas y administración', '[{"subject_code": "2015703", "type": "Prerrequisito"}]'::jsonb),
('2015701', 5, 'Foundational', FALSE, 'Ciencias económicas y administración', '[{"subject_code": "2016609", "type": "Prerrequisito"}]'::jsonb),
('2016741', 5, 'Foundational', FALSE, 'Ciencias económicas y administración', '[{"subject_code": "2015703", "type": "Prerrequisito"}]'::jsonb),
('2016609', 4, 'Foundational', FALSE, 'Ciencias económicas y administración', '[{"subject_code": "1000017", "type": "Prerrequisito"}]'::jsonb),
('2016592', 4, 'Foundational', FALSE, 'Ciencias económicas y administración', NULL),

('2015734', 1, 'Foundational', TRUE, 'Informática', NULL),

('2016845', 2, 'Foundational', TRUE, 'Herramientas para ingeniería', '[{"subject_code": "1000003", "type": "Prerrequisito"}]'::jsonb),
('2016603', 4, 'Foundational', FALSE, 'Herramientas para ingeniería', '[{"subject_code": "1000006", "type": "Prerrequisito"}]'::jsonb),
('2016500', 4, 'Foundational', FALSE, 'Herramientas para ingeniería', '[{"subject_code": "1000019", "type": "Prerrequisito"}]'::jsonb),
('1000018', 4, 'Foundational', FALSE, 'Herramientas para ingeniería', '[{"subject_code": "1000007", "type": "Prerrequisito"}]'::jsonb),
('2016375', 2, 'Foundational', FALSE, 'Herramientas para ingeniería', '[{"subject_code": "2015734", "type": "Prerrequisito"}]'::jsonb),
('2023212', 4, 'Foundational', FALSE, 'Herramientas para ingeniería', '[{"subject_code": "1000013", "type": "Prerrequisito"}]'::jsonb),
('1000016', 4, 'Foundational', FALSE, 'Herramientas para ingeniería', '[{"subject_code": "1000015", "type": "Prerrequisito"}]'::jsonb),
('2015970', 4, 'Foundational', FALSE, 'Herramientas para ingeniería', '[{"subject_code": "1000007", "type": "Prerrequisito"}]'::jsonb),

('2016489', 3, 'Disciplinary', TRUE, 'Circuitos y campos', '[{"subject_code": "2016862", "type": "Prerrequisito"}, {"subject_code": "1000003", "type": "Prerrequisito"}]'::jsonb),
('2016490', 4, 'Disciplinary', TRUE, 'Circuitos y campos', '[{"subject_code": "2016489", "type": "Prerrequisito"}, {"subject_code": "1000007", "type": "Prerrequisito"}]'::jsonb),
('2016487', 5, 'Disciplinary', TRUE, 'Circuitos y campos', '[{"subject_code": "1000006", "type": "Prerrequisito"}, {"subject_code": "1000017", "type": "Prerrequisito"}]'::jsonb),

('2016506', 5, 'Disciplinary', TRUE, 'Señales, sistemas y control', '[{"subject_code": "2016489", "type": "Prerrequisito"}, {"subject_code": "1000007", "type": "Prerrequisito"}]'::jsonb),
('2016507', 6, 'Disciplinary', TRUE, 'Señales, sistemas y control', '[{"subject_code": "2016506", "type": "Prerrequisito"}, {"subject_code": "2015159", "type": "Prerrequisito"}]'::jsonb),
('2016493', 7, 'Disciplinary', TRUE, 'Señales, sistemas y control', '[{"subject_code": "2016507", "type": "Prerrequisito"}]'::jsonb),

('2017003', 5, 'Disciplinary', TRUE, 'Electrotecnia', '[{"subject_code": "2016490", "type": "Prerrequisito"}]'::jsonb), 
('2016494', 6, 'Disciplinary', TRUE, 'Electrotecnia', '[{"subject_code": "2016487", "type": "Prerrequisito"}, {"subject_code": "2016490", "type": "Prerrequisito"}]'::jsonb),
('2016858', 7, 'Disciplinary', FALSE, 'Electrotecnia', '[{"subject_code": "2016861", "type": "Prerrequisito"}]'::jsonb),
('2016857', 7, 'Disciplinary', FALSE, 'Electrotecnia', '[{"subject_code": "2016861", "type": "Prerrequisito"}]'::jsonb),
('2016852', 7, 'Disciplinary', FALSE, 'Electrotecnia', '[{"subject_code": "2016861", "type": "Prerrequisito"}]'::jsonb),

('2016495', 4, 'Disciplinary', TRUE, 'Electrónica', '[{"subject_code": "2016489", "type": "Prerrequisito"}]'::jsonb),
('2016498', 5, 'Disciplinary', TRUE, 'Electrónica', '[{"subject_code": "2016495", "type": "Prerrequisito"}]'::jsonb),

('2016865', 6, 'Disciplinary', TRUE, 'Sistemas de potencia', '[{"subject_code": "2016487", "type": "Prerrequisito"}, {"subject_code": "2016490", "type": "Prerrequisito"}]'::jsonb),
('2016861', 7, 'Disciplinary', TRUE, 'Sistemas de potencia', '[{"subject_code": "2016494", "type": "Prerrequisito"}, {"subject_code": "2016865", "type": "Prerrequisito"}]'::jsonb),
('2016851', 8, 'Disciplinary', TRUE, 'Sistemas de potencia', '[{"subject_code": "2016861", "type": "Prerrequisito"}]'::jsonb),
('2024049', 9, 'Disciplinary', FALSE, 'Sistemas de potencia', '[{"subject_code": "2016851", "type": "Prerrequisito"}]'::jsonb),

('2016856', 1, 'Disciplinary', TRUE, 'Contexto profesional, innovación e investigación', NULL),
('2016862', 2, 'Disciplinary', TRUE, 'Contexto profesional, innovación e investigación', NULL), 
('2016863', 3, 'Disciplinary', TRUE, 'Contexto profesional, innovación e investigación', '[{"subject_code": "2016498", "type": "Prerrequisito"}]'::jsonb),
('2024045', 7, 'Disciplinary', TRUE, 'Contexto profesional, innovación e investigación', '[{"credit_rule": 117, "component": "Total"}, {"percentage_rule": 70, "component": "Total"}]'::jsonb), 
('2016866', 9, 'Disciplinary', TRUE, 'Contexto profesional, innovación e investigación', '[{"credit_rule": 57, "component": "Disciplinary"}]'::jsonb), 
('2016867', 9, 'Disciplinary', TRUE, 'Contexto profesional, innovación e investigación', '[{"credit_rule": 57, "component": "Disciplinary"}]'::jsonb),
('2024048', 8, 'Disciplinary', FALSE, 'Contexto profesional, innovación e investigación', '[{"subject_code": "2016851", "type": "Prerrequisito"}]'::jsonb),
('2016850', 7, 'Disciplinary', FALSE, 'Contexto profesional, innovación e investigación', '[{"subject_code": "2016865", "type": "Prerrequisito"}]'::jsonb),
('2024295', 8, 'Disciplinary', FALSE, 'Contexto profesional, innovación e investigación', '[{"subject_code": "2016851", "type": "Prerrequisito"}]'::jsonb),
('2016762', 8, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 117, "component": "Total"}]'::jsonb),
('2016763', 8, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 117, "component": "Total"}]'::jsonb), 
('2016764', 8, 'Free Elective', FALSE, 'Profundización', '[{"credit_rule": 117, "component": "Total"}]'::jsonb), 
('2016853', 9, 'Free Elective', FALSE, 'Profundización', '[{"subject_code": "2024049", "type": "Prerrequisito"}]'::jsonb),
('2024296', 9, 'Free Elective', FALSE, 'Profundización', '[{"subject_code": "2024049", "type": "Prerrequisito"}]'::jsonb),
('2024297', 9, 'Free Elective', FALSE, 'Profundización', '[{"subject_code": "2024049", "type": "Prerrequisito"}]'::jsonb),
('2016859', 9, 'Free Elective', FALSE, 'Profundización', '[{"subject_code": "2024049", "type": "Prerrequisito"}]'::jsonb)
) AS T1(subject_code, suggested_semester, component, is_obligatory, group_name, prereq_rules)
JOIN GroupMap gm ON T1.group_name = gm.group_name AND T1.component = gm.component;

