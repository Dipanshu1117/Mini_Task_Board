CREATE DATABASE IF NOT EXISTS taskboard_db;

USE taskboard_db;

CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('Todo', 'In Progress', 'Done') NOT NULL DEFAULT 'Todo',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO tasks (title, description, status)
VALUES
  ('Build Navbar', 'Set up the main navigation layout', 'Todo'),
  ('Develop API Routes', 'Create the base endpoints for the app', 'In Progress'),
  ('Design Login UI', 'Finalize the login screen mockup', 'Done')
ON DUPLICATE KEY UPDATE title = VALUES(title);
