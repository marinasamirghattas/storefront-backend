# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

### Order Products
- addProduct [token required]
- destroy [token required]


## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

### Order Products

- id
- order_id 
- product_id
- quantity



## Database Schema

#### Product
store-db=# \d products
                                     Table "public.products"
  Column  |          Type          | Collation | Nullable |               Default
----------+------------------------+-----------+----------+--------------------------------------
 id       | integer                |           | not null | nextval('products_id_seq'::regclass)
 name     | character varying(200) |           | not null |
 price    | integer                |           | not null |
 category | character varying(200) |           |          |
Indexes:
    "products_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "order_products" CONSTRAINT "product_id" FOREIGN KEY (product_id) REFERENCES products(id)


#### User
store-db=# \d users
                                      Table "public.users"
   Column   |          Type          | Collation | Nullable |              Default
------------+------------------------+-----------+----------+-----------------------------------
 id         | integer                |           | not null | nextval('users_id_seq'::regclass)
 first_name | character varying(50)  |           | not null |
 last_name  | character varying(50)  |           | not null |
 password   | character varying(255) |           | not null |
Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "orders" CONSTRAINT "id" FOREIGN KEY (user_id) REFERENCES users(id) NOT VALID


#### Orders
store-db=# \d orders
                                      Table "public.orders"
    Column    |         Type          | Collation | Nullable |              Default
--------------+-----------------------+-----------+----------+------------------------------------
 id           | integer               |           | not null | nextval('orders_id_seq'::regclass)
 user_id      | integer               |           | not null |
 order_status | character varying(10) |           | not null |
Indexes:
    "orders_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "id" FOREIGN KEY (user_id) REFERENCES users(id) NOT VALID
Referenced by:
    TABLE "order_products" CONSTRAINT "order_id" FOREIGN KEY (order_id) REFERENCES orders(id)



### Order Products
store-db=# \d order_products
                              Table "public.order_products"
   Column   |  Type   | Collation | Nullable |                  Default
------------+---------+-----------+----------+--------------------------------------------
 id         | integer |           | not null | nextval('order_products_id_seq'::regclass)
 order_id   | integer |           | not null |
 product_id | integer |           | not null |
 quantity   | integer |           |          |
Indexes:
    "order_products_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "order_id" FOREIGN KEY (order_id) REFERENCES orders(id)
    "product_id" FOREIGN KEY (product_id) REFERENCES products(id)

