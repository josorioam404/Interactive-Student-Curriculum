CREATE OR REPLACE FUNCTION FN_Calculate_Component_Credits(
    p_student_id INTEGER,
    p_component_type TEXT 
)
RETURNS NUMERIC AS $$
DECLARE
    total_credits_approved NUMERIC := 0;
BEGIN

    SELECT
        COALESCE(SUM(S.credits), 0)
    INTO
        total_credits_approved
    FROM
        UserProgress UP 
    JOIN
        Subject S ON UP.subject_code = S.subject_code 
    JOIN
        StudyPlan SP ON S.subject_code = SP.subject_code 
    JOIN
        CurriculumGroup CG ON SP.group_id = CG.group_id 
    WHERE
        UP.user_id = p_student_id
        AND UP.final_grade >= 3.0 
        AND CG.component = p_component_type;

    RETURN total_credits_approved;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION FN_Validate_Prerequisites(
    p_student_id INTEGER,
    p_program_sia VARCHAR, 
    p_target_subject_code VARCHAR 
)
RETURNS BOOLEAN AS $$
DECLARE
    v_rules JSONB;
    req_item JSONB;
    requisite_code VARCHAR;
    requisite_name TEXT;
    requisite_type TEXT;
    passed_count INTEGER := 0;
    required_count INTEGER := 0;
    is_prereq_satisfied BOOLEAN := TRUE;
    
    min_credits NUMERIC;
    component_type TEXT;
    current_credits NUMERIC;
    
    alternative_group TEXT;
    passed_alternatives BOOLEAN;
    required_alternative_present BOOLEAN := FALSE;
    
BEGIN
    SELECT prereq_rules INTO v_rules
    FROM StudyPlan
    WHERE program_code_sia = p_program_sia
    AND subject_code = p_target_subject_code;

    IF v_rules IS NULL OR v_rules = '{}'::jsonb OR (jsonb_typeof(v_rules) = 'array' AND v_rules = '[]'::jsonb) THEN
        RETURN TRUE;
    END IF;

    IF jsonb_typeof(v_rules) = 'object' AND v_rules ? 'credits' THEN
        min_credits := (v_rules -> 'credits' ->> 'min_credits')::NUMERIC;
        component_type := v_rules -> 'credits' ->> 'component'; 

        SELECT FN_Calculate_Component_Credits(p_student_id, component_type) INTO current_credits;
        
        IF current_credits < min_credits THEN
            RETURN FALSE;
        END IF;
    END IF;


  
    IF jsonb_typeof(v_rules) = 'array' THEN
        FOR req_item IN SELECT * FROM jsonb_array_elements(v_rules)
        LOOP
            requisite_code := COALESCE(req_item ->> 'code', req_item ->> 'subject_code');
            requisite_type := req_item ->> 'type';
            alternative_group := COALESCE(req_item ->> 'condition', req_item ->> 'type_2');
            
            IF alternative_group IS NULL OR alternative_group = 'Prerrequisito' THEN
                required_count := required_count + 1;
                
                SELECT TRUE INTO passed_alternatives
                FROM UserProgress UP
                WHERE UP.user_id = p_student_id
                AND UP.subject_code = requisite_code
                AND UP.final_grade >= 3.0
                LIMIT 1;

                IF NOT passed_alternatives THEN
                    is_prereq_satisfied := FALSE;
                    RETURN FALSE;
                END IF;
            END IF;
        END LOOP;

    ELSIF jsonb_typeof(v_rules) = 'object' AND v_rules ? 'subjects' THEN
        FOR req_item IN SELECT * FROM jsonb_array_elements(v_rules -> 'subjects')
        LOOP
            requisite_code := COALESCE(req_item ->> 'code', req_item ->> 'subject_code');
            alternative_group := COALESCE(req_item ->> 'condition', req_item ->> 'type_2');
            
            IF alternative_group = 'Alternativa' THEN
                required_alternative_present := TRUE;
                
                SELECT TRUE INTO passed_alternatives
                FROM UserProgress UP
                WHERE UP.user_id = p_student_id
                AND UP.subject_code = requisite_code
                AND UP.final_grade >= 3.0 
                LIMIT 1;
                
                IF passed_alternatives THEN
                    is_prereq_satisfied := TRUE; 
                END IF;
            
            ELSE 
                required_count := required_count + 1;
                
                SELECT TRUE INTO passed_alternatives
                FROM UserProgress UP
                WHERE UP.user_id = p_student_id
                AND UP.subject_code = requisite_code
                AND UP.final_grade >= 3.0 
                LIMIT 1;

                IF NOT passed_alternatives THEN
                    RETURN FALSE;
                END IF;
            END IF;
        END LOOP;
        
        IF required_alternative_present AND NOT is_prereq_satisfied THEN
            RETURN FALSE;
        END IF;
    END IF;
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;
CREATE OR REPLACE FUNCTION FN_Calculate_GPA(
    p_student_id INTEGER
)
RETURNS NUMERIC AS $$
DECLARE
    weighted_sum NUMERIC;
    total_credits_attempted NUMERIC;
    calculated_gpa NUMERIC;
BEGIN
    SELECT
        COALESCE(SUM(UP.final_grade * S.credits), 0),
        COALESCE(SUM(S.credits), 0)
    INTO
        weighted_sum,
        total_credits_attempted
    FROM
        UserProgress UP  
    JOIN
        Subject S ON UP.subject_code = S.subject_code
    WHERE
        UP.user_id = p_student_id; 
    IF total_credits_attempted = 0 THEN
        RETURN 0.0;
    END IF;

    calculated_gpa := weighted_sum / total_credits_attempted;

    RETURN ROUND(calculated_gpa, 2);

END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION FN_Get_Prerequisites_by_Name(
    p_program_sia VARCHAR,
    p_target_subject_code VARCHAR
)
RETURNS TABLE (
    requisite_name TEXT,
    requisite_type TEXT,
    logic_detail TEXT  
)
AS $$
DECLARE
    v_rules JSONB;
BEGIN
    SELECT prereq_rules INTO v_rules
    FROM StudyPlan
    WHERE program_code_sia = p_program_sia
    AND subject_code = p_target_subject_code;

    IF v_rules IS NULL OR v_rules = '{}'::jsonb THEN
        RETURN;
    END IF;

    RETURN QUERY
    WITH SubjectPrereqs AS (
        SELECT jsonb_array_elements(v_rules) AS req
        WHERE jsonb_typeof(v_rules) = 'array'

        UNION ALL

        SELECT jsonb_array_elements(v_rules -> 'subjects') AS req
        WHERE jsonb_typeof(v_rules) = 'object' AND v_rules ? 'subjects'
    )
    SELECT
        (COALESCE(S.name, up.req ->> 'name'))::TEXT AS requisite_name,

        up.req ->> 'type' AS requisite_type,

        COALESCE(up.req ->> 'condition', up.req ->> 'type_2', 'Estricto') AS logic_detail 
    FROM
        SubjectPrereqs up
    LEFT JOIN
        Subject S ON COALESCE(up.req ->> 'code', up.req ->> 'subject_code') = S.subject_code
    WHERE
        (up.req ->> 'code' IS NOT NULL OR up.req ->> 'subject_code' IS NOT NULL OR up.req ->> 'name' IS NOT NULL)

    UNION ALL

    SELECT
        (v_rules -> 'credits' ->> 'min_credits') || ' Créditos Aprobados (' || (v_rules -> 'credits' ->> 'component') || ')' AS requisite_name,
        'Prerrequisito' AS requisite_type,
        'Estricto' AS logic_detail 
    WHERE
        v_rules -> 'credits' IS NOT NULL
        AND jsonb_typeof(v_rules) = 'object';
END;
$$ LANGUAGE plpgsql;