-- =============================================================
-- OtaDojo - Esquema de Base de Datos
-- Base de datos: animequiz_db
-- PASO 1: Ejecutar este archivo primero
-- PASO 2: Ejecutar seed.sql para añadir los datos
-- =============================================================

CREATE DATABASE IF NOT EXISTS animequiz_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE animequiz_db;

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    username      VARCHAR(50)  NOT NULL UNIQUE,
    email         VARCHAR(100) NOT NULL UNIQUE,
    password      VARCHAR(255) NOT NULL,
    rol           ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de quizzes
CREATE TABLE IF NOT EXISTS quizzes (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    titulo        VARCHAR(100) NOT NULL,
    descripcion   TEXT         NOT NULL,
    dificultad    ENUM('facil', 'medio', 'dificil') NOT NULL,
    categoria     VARCHAR(50)  NOT NULL DEFAULT 'anime-clasico',
    imagen_portada VARCHAR(255) DEFAULT NULL,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de preguntas
CREATE TABLE IF NOT EXISTS questions (
    id                INT AUTO_INCREMENT PRIMARY KEY,
    quiz_id           INT          NOT NULL,
    texto_pregunta    TEXT         NOT NULL,
    opcion_a          VARCHAR(255) NOT NULL,
    opcion_b          VARCHAR(255) NOT NULL,
    opcion_c          VARCHAR(255) NOT NULL,
    opcion_d          VARCHAR(255) NOT NULL,
    respuesta_correcta CHAR(1)     NOT NULL,
    puntos_base       INT          NOT NULL DEFAULT 100,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
);

-- Tabla de intentos de quiz
CREATE TABLE IF NOT EXISTS quiz_attempts (
    id                   INT AUTO_INCREMENT PRIMARY KEY,
    user_id              INT NOT NULL,
    quiz_id              INT NOT NULL,
    puntos_obtenidos     INT NOT NULL DEFAULT 0,
    respuestas_correctas INT NOT NULL DEFAULT 0,
    total_preguntas      INT NOT NULL DEFAULT 0,
    completado_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
);

-- Usuario admin por defecto (contraseña: admin123)
-- Puedes cambiar esto o crear tu propio admin desde la app
-- INSERT INTO users (username, email, password, rol) VALUES
-- ('admin', 'admin@otadojo.com', '$2a$10$...hash...', 'admin');
