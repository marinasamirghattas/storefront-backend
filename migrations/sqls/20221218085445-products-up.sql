/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS public.products
(
    id serial NOT NULL,
    name character varying(200) NOT NULL,
    price integer NOT NULL,
    category character varying(200),
    PRIMARY KEY (id)
);