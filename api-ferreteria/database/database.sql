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