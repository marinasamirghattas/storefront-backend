/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS public.users
(
    id serial NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    password character varying(255) NOT NULL,
    PRIMARY KEY (id)
);