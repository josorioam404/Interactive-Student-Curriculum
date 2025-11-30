DROP TABLE IF EXISTS AuditLog;
DROP TABLE IF EXISTS UserProgress;
DROP TABLE IF EXISTS StudyPlan;
DROP TABLE IF EXISTS CurriculumGroup; 
DROP TABLE IF EXISTS "User";
DROP TABLE IF EXISTS Subject;
DROP TABLE IF EXISTS Program;

CREATE TABLE Program (
    program_code_sia VARCHAR(10) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    snies_code VARCHAR(20),
    total_credits INT,
    faculty VARCHAR(150) NOT NULL
);

CREATE TABLE Subject (
    subject_code VARCHAR(20) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    credits INT NOT NULL,
    weekly_hours INT,
    description TEXT
);

CREATE TABLE "User" (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    role VARCHAR(20) NOT NULL CHECK (role IN ('Student', 'Admin')),
    selected_program_code_sia VARCHAR(10),
    FOREIGN KEY (selected_program_code_sia) REFERENCES Program(program_code_sia) ON DELETE SET NULL
);

CREATE TABLE UserProgress (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    subject_code VARCHAR(20) NOT NULL,
    final_grade NUMERIC(3, 2),
    status VARCHAR(20) NOT NULL CHECK (status IN ('Not Taken', 'Completed', 'Planned', 'Enrolled')),
    FOREIGN KEY (user_id) REFERENCES "User"(id) ON DELETE CASCADE,
    FOREIGN KEY (subject_code) REFERENCES Subject(subject_code) ON DELETE CASCADE,
    UNIQUE(user_id, subject_code)
);

CREATE TABLE AuditLog (
    id SERIAL PRIMARY KEY,
    admin_user_id INT NOT NULL,
    action_type VARCHAR(255) NOT NULL,
    target_entity VARCHAR(50),
    target_id VARCHAR(20),
    details TEXT,
    "timestamp" TIMESTAMPTZ DEFAULT NOW(),
    FOREIGN KEY (admin_user_id) REFERENCES "User"(id)
);

CREATE TABLE CurriculumGroup (
    group_id SERIAL PRIMARY KEY,
    program_code_sia VARCHAR(10) NOT NULL,
    component VARCHAR(50) NOT NULL,
    group_name VARCHAR(255) NOT NULL,
    required_credits_total INT NOT NULL,
    required_credits_obligatory INT NOT NULL,
    
    FOREIGN KEY (program_code_sia) REFERENCES Program(program_code_sia) ON DELETE CASCADE,
    UNIQUE (program_code_sia, component, group_name)
);

CREATE TABLE StudyPlan (
    id SERIAL PRIMARY KEY,
    program_code_sia VARCHAR(10) NOT NULL,
    subject_code VARCHAR(20) NOT NULL,
    suggested_semester INT,
    component VARCHAR(50) NOT NULL CHECK (component IN ('Foundational', 'Disciplinary', 'Free Elective', 'Leveling')),
    required_credits_pct INT,
    group_id INT, 
    is_obligatory BOOLEAN DEFAULT FALSE, 
    prereq_rules JSONB, 
    
    FOREIGN KEY (program_code_sia) REFERENCES Program(program_code_sia) ON DELETE CASCADE,
    FOREIGN KEY (subject_code) REFERENCES Subject(subject_code) ON DELETE CASCADE,
    FOREIGN KEY (group_id) REFERENCES CurriculumGroup(group_id) ON DELETE SET NULL,
    UNIQUE (program_code_sia, subject_code)
);


