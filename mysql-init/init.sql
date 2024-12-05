CREATE DATABASE IF NOT EXISTS user_service_db;
CREATE DATABASE IF NOT EXISTS product_service_db;
CREATE DATABASE IF NOT EXISTS order_service_db;

---------------------------------------------------------

USE user_service_db;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT INTO users (name, email, password) VALUES 
('Aymen Beghdad', 'aymenbeghdad@gmail.com', 'password'),
('Dana', 'dana10@gmail.com', 'password'),
('Bourada', 'brd@gmail.com', 'password');


-------------------------------------------------------------
USE product_service_db;

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    categorie varchar(255) NOT NULL
);

INSERT INTO products (name, price, categorie) VALUES
('HP 840 G3', 1500.00, 'Laptop'),
('iPhone 13 pro max', 799.00, 'Smartphones');


-- --------------------------------------------------------
USE order_service_db;

CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL
);

INSERT INTO orders (user_id, product_id, quantity) VALUES
(1, 1, 2),
(2, 2, 1);