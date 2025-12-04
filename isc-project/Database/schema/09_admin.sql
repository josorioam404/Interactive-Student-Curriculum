INSERT INTO "User" (email, password_hash, full_name, role, selected_program_code_sia)
VALUES (
  'admin@unal.edu.co',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- bcrypt of "admin123"
  'System Administrator',
  'Admin',
  NULL
);
