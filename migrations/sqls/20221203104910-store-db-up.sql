-- CREATE TABLE users (id SERIAL PRIMARY KEY,first_name VARCHAR(50) NOT NULL,last_name VARCHAR(50) NOT NULL,password VARCHAR(50) NOT NULL);
-- CREATE TABLE products (id SERIAL PRIMARY KEY,name VARCHAR(200) NOT NULL,price integer NOT NULL,category VARCHAR(200));

CREATE TABLE IF NOT EXISTS public.users
(
    id serial NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    password character varying(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.products
(
    id serial NOT NULL,
    name character varying(200) NOT NULL,
    price integer NOT NULL,
    category character varying(200),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.orders
(
    id serial NOT NULL,
    product_id character varying(200)[] NOT NULL,
    user_id serial NOT NULL,
    quantity integer NOT NULL,
    order_status character varying(10) NOT NULL ,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.orders
    ADD CONSTRAINT user_id FOREIGN KEY (user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;