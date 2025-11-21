CREATE OR REPLACE VIEW V_CurriculumMap AS
SELECT
    P.program_code_sia,
    P.name AS program_name,
    CG.component AS component_type,
    CG.group_name AS curriculum_group,
    S.subject_code,
    S.name AS subject_name,
    S.credits,
    SP.is_obligatory,
    SP.suggested_semester,
    SP.prereq_rules 
FROM
    Program P
JOIN
    StudyPlan SP ON P.program_code_sia = SP.program_code_sia
JOIN
    Subject S ON SP.subject_code = S.subject_code
JOIN
    CurriculumGroup CG ON SP.group_id = CG.group_id
ORDER BY
    P.name,
    SP.suggested_semester,
    S.subject_code;

CREATE OR REPLACE VIEW V_PrerequisiteRules AS
SELECT
    P.program_code_sia,
    P.name AS program_name,
    S.subject_code,
    S.name AS subject_name,
    SP.prereq_rules,
    (SP.prereq_rules -> 'credits' -> 'min_credits')::INTEGER AS required_min_credits,
    (SP.prereq_rules -> 'credits' -> 'component') AS required_component
FROM
    Program P
JOIN
    StudyPlan SP ON P.program_code_sia = SP.program_code_sia
JOIN
    Subject S ON SP.subject_code = S.subject_code
WHERE
    SP.prereq_rules IS NOT NULL
    AND SP.prereq_rules::text <> '{"subjects": []}';

CREATE OR REPLACE VIEW V_ComponentCreditSummary AS
SELECT
    P.program_code_sia,
    P.name AS program_name,
    P.total_credits AS program_total_credits,
    CG.component AS component_type,
    SUM(CG.required_credits_total) AS total_required_credits,
    SUM(CG.required_credits_obligatory) AS total_obligatory_credits
FROM
    Program P
JOIN
    CurriculumGroup CG ON P.program_code_sia = CG.program_code_sia
GROUP BY
    P.program_code_sia, P.name, CG.component
ORDER BY
    P.program_code_sia, CG.component;