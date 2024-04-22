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