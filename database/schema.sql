-- Kompyuter Tarmoqlari O'quv Platformasi — Ma'lumotlar Bazasi Sxemasi (SQLite / PostgreSQL)

CREATE TABLE IF NOT EXISTS students (
  id VARCHAR(64) PRIMARY KEY,
  full_name VARCHAR(150) NOT NULL,
  group_name VARCHAR(50) NOT NULL,
  email VARCHAR(120) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  unlocked_topic INT NOT NULL DEFAULT 1,
  final_score INT DEFAULT NULL,
  joined_at DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS modules (
  id INT PRIMARY KEY,
  theory_title TEXT NOT NULL,
  practical_title TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS topic_progress (
  id SERIAL PRIMARY KEY,
  student_id VARCHAR(64) NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  module_id INT NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  quiz_score INT NOT NULL DEFAULT 0,
  practical_completed BOOLEAN NOT NULL DEFAULT FALSE,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(student_id, module_id)
);

CREATE TABLE IF NOT EXISTS labs (
  id INT PRIMARY KEY,
  title TEXT NOT NULL,
  tool_name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS lab_progress (
  id SERIAL PRIMARY KEY,
  student_id VARCHAR(64) NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  lab_id INT NOT NULL REFERENCES labs(id) ON DELETE CASCADE,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(student_id, lab_id)
);

CREATE TABLE IF NOT EXISTS certificates (
  certificate_id VARCHAR(64) PRIMARY KEY,
  student_id VARCHAR(64) UNIQUE NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  final_score INT NOT NULL,
  issued_date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS platform_settings (
  key VARCHAR(64) PRIMARY KEY,
  value VARCHAR(128) NOT NULL
);
