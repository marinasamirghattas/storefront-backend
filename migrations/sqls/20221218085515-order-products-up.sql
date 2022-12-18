/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS public.order_products
(
     id serial NOT NULL,
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer,
    PRIMARY KEY (id)
);





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