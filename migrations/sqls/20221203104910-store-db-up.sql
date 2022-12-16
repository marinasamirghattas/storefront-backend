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
    user_id integer NOT NULL,
    order_status character varying(10) NOT NULL ,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.order_products
(
     id serial NOT NULL,
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer,
    PRIMARY KEY (id)
);



ALTER TABLE IF EXISTS public.orders
    ADD CONSTRAINT id FOREIGN KEY (user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;



ALTER TABLE IF EXISTS public.order_products
    ADD CONSTRAINT order_id FOREIGN KEY (order_id)
    REFERENCES public.orders (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.order_products
    ADD CONSTRAINT product_id FOREIGN KEY (product_id)
    REFERENCES public.products (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
