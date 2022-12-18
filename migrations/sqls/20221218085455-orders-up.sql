/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS public.orders
(
    id serial NOT NULL,
    user_id integer NOT NULL,
    order_status character varying(10) NOT NULL ,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.orders
    ADD CONSTRAINT id FOREIGN KEY (user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;