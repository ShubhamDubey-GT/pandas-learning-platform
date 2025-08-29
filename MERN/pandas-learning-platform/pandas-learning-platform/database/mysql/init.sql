-- MySQL Database Initialization Script for Pandas Learning Platform

-- Create database (if not exists)
CREATE DATABASE IF NOT EXISTS pandas_learning 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE pandas_learning;

-- Create Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    profile_image VARCHAR(500) DEFAULT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    is_admin BOOLEAN DEFAULT FALSE,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_email (email),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB;

-- Create Modules table
CREATE TABLE IF NOT EXISTS modules (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    difficulty ENUM('beginner', 'intermediate', 'advanced') DEFAULT 'beginner',
    estimated_time VARCHAR(50),
    order_index INT NOT NULL UNIQUE,
    topics JSON,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_order (order_index),
    INDEX idx_difficulty (difficulty),
    INDEX idx_active (is_active)
) ENGINE=InnoDB;

-- Create Progress table
CREATE TABLE IF NOT EXISTS progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    module_id VARCHAR(50) NOT NULL,
    topic_id VARCHAR(100),
    completed BOOLEAN DEFAULT FALSE,
    completion_date TIMESTAMP NULL,
    time_spent INT DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE,

    UNIQUE KEY unique_user_topic (user_id, module_id, topic_id),
    INDEX idx_user_progress (user_id, completed),
    INDEX idx_module_progress (module_id, completed)
) ENGINE=InnoDB;

-- Insert initial modules data
INSERT IGNORE INTO modules (id, title, description, difficulty, estimated_time, order_index, topics) VALUES
('01_fundamentals', 'Pandas Fundamentals', 'Introduction to pandas library, basic concepts, and core data structures', 'beginner', '2 hours', 1, 
 JSON_ARRAY(
   JSON_OBJECT('id', 'what_is_pandas', 'title', 'What is Pandas', 'type', 'theory'),
   JSON_OBJECT('id', 'installation_setup', 'title', 'Installation and Setup', 'type', 'practical'),
   JSON_OBJECT('id', 'importing_pandas', 'title', 'Importing Pandas', 'type', 'code'),
   JSON_OBJECT('id', 'intro_series', 'title', 'Introduction to Series', 'type', 'theory'),
   JSON_OBJECT('id', 'intro_dataframe', 'title', 'Introduction to DataFrame', 'type', 'theory')
 )),

('02_data_structures', 'Data Structures Deep Dive', 'Comprehensive understanding of Series and DataFrame structures', 'beginner', '3 hours', 2,
 JSON_ARRAY(
   JSON_OBJECT('id', 'creating_series', 'title', 'Creating Series from Lists, Arrays, Dictionaries', 'type', 'practical'),
   JSON_OBJECT('id', 'series_attributes', 'title', 'Series Attributes and Methods', 'type', 'theory'),
   JSON_OBJECT('id', 'creating_dataframes', 'title', 'Creating DataFrames from Various Sources', 'type', 'practical')
 )),

('03_data_loading', 'Data Loading and I/O', 'Reading and writing data from various file formats and sources', 'beginner', '2.5 hours', 3,
 JSON_ARRAY(
   JSON_OBJECT('id', 'read_csv', 'title', 'Reading CSV Files', 'type', 'practical'),
   JSON_OBJECT('id', 'read_excel', 'title', 'Reading Excel Files', 'type', 'practical'),
   JSON_OBJECT('id', 'read_json', 'title', 'Reading JSON Files', 'type', 'practical')
 ));

SELECT 'Pandas Learning Platform database initialized successfully!' as Status;