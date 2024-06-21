CREATE DATABASE ferreteria;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    pnombre_user VARCHAR(40),
    email TEXT,
    password VARCHAR(32)
);


CREATE TABLE productos(
    id_producto SERIAL PRIMARY KEY,
    nombre_producto TEXT,
    precio_producto INTEGER,
    imagen_producto BYTEA
);

INSERT INTO productos (nombre_producto, precio_producto, imagen_producto) VALUES 
('Martillo', 5000, pg_read_binary_file('ruta')::bytea);

INSERT INTO productos (nombre_producto, precio_producto, imagen_producto) VALUES 
('Taladro', 80000, pg_read_binary_file('ruta')::bytea);

INSERT INTO productos (nombre_producto, precio_producto, imagen_producto) VALUES 
('Herramientas', 80000, pg_read_binary_file('ruta')::bytea);

CREATE TABLE tipo_user (
	id_tipo_user SERIAL PRIMARY KEY,
	nombre_tipo_user VARCHAR(25)
);

ALTER TABLE users
ADD COLUMN id_tipo_user INT;


ALTER TABLE users
ADD CONSTRAINT fk_id_tipo_user
FOREIGN KEY (id_tipo_user)
REFERENCES tipo_user (id_tipo_user);

INSERT INTO tipo_user (nombre_tipo_user) VALUES ('Administrador');
INSERT INTO tipo_user (nombre_tipo_user) VALUES ('Bodeguero');
INSERT INTO tipo_user (nombre_tipo_user) VALUES ('Cliente');

INSERT INTO users (pnombre_user, email, password, id_tipo_user) VALUES ('admin', 'admin@gmail.com', '123456', 1);
INSERT INTO users (pnombre_user, email, password, id_tipo_user) VALUES ('bodeguero', 'bodeguero@gmail.com', '123456', 2);

CREATE TABLE purchase_orders (
    id SERIAL PRIMARY KEY,
    order_number VARCHAR(50) NOT NULL UNIQUE,
    user_id INTEGER NOT NULL,
    order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) NOT NULL,
    total_amount NUMERIC(10, 2) NOT NULL,
    card_number VARCHAR(4) NULL,
    order_details TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);