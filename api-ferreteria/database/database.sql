CREATE DATABASE ferreteria;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    email TEXT,
    password VARCHAR(32),
    CONSTRAINT users_pkey PRIMARY KEY (id)
);


CREATE TABLE productos(
    id_producto SERIAL PRIMARY KEY,
    nombre_producto TEXT,
    precio_producto INTEGER,
    imagen_producto BYTEA.
    CONSTRAINT productos_pkey PRIMARY KEY (id_producto)
);

INSERT INTO productos (nombre_producto, precio_producto, imagen_producto) VALUES 
('Martillo', 5000, pg_read_binary_file('ruta')::bytea);

INSERT INTO productos (nombre_producto, precio_producto, imagen_producto) VALUES 
('Taladro', 80000, pg_read_binary_file('ruta')::bytea);

INSERT INTO productos (nombre_producto, precio_producto, imagen_producto) VALUES 
('Taladro', 80000, pg_read_binary_file('ruta')::bytea);

CREATE TABLE tipo_user (
	id_tipo_user SERIAL PRIMARY KEY,
	nombre_tipo_user VARCHAR(25)
);

ALTER TABLE users
ADD COLUMN id_tipo_users INT;


ALTER TABLE users
ADD CONSTRAINT fk_id_tipo_user
FOREIGN KEY (id_tipo_user)
REFERENCES tipo_user (id_tipo_user);

INSERT INTO tipo_user (nombre_tipo_user) VALUES ('Administrador');
INSERT INTO tipo_user (nombre_tipo_user) VALUES ('Bodeguero');
INSERT INTO tipo_user (nombre_tipo_user) VALUES ('Cliente');

INSERT INTO users (pnombre_user, email, password, id_tipo_user) VALUES ('admin', 'admin@gmail.com', '123456', 1);
INSERT INTO users (pnombre_user, email, password, id_tipo_user) VALUES ('bodeguero', 'bodeguero@gmail.com', '123456', 2);