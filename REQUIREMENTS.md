# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index `/products` [GET]
- Show `/products/:id` [GET]
- Create `/products` [POST][token required]
- Delete `/products/:id` [DELETE][token required]
- Update `/products/:id` [PUT][token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Signin `/users/signin` [POST]
- Show `/users` [GET][token required]
- Create `/users` [POST]
- Delete `/users` [DELETE][token required]

#### Orders
- Index `/orders` [GET] [token required]
- Create `/orders/create` [POST] [token required]
- Read `/orders/:id` [GET] [token required]
- Show `/orders/me` [GET] [token required]
- Update `/orders/:id` [PUT] [token required]
- Delete `/orders/:id` [DELETE] [token required]
- Create `/orders/:id/product` [POST] [token required]
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
-  id `SERIAL PRIMARY KEY`
- name `VARCHAR(255)`
- price `INTEGER`
- [OPTIONAL] category `VARCHAR(255)`

#### User
- id `SERIAL PRIMARY KEY`
- firstName `VARCHAR(255)`
- lastName `VARCHAR(255)`
- password `VARCHAR(255)`

#### Orders
- id `SERIAL PRIMARY KEY`
- user_id `INTEGER` `REFERENCES users(id)`
- status `VARCHAR(255)`

#### Order_products
- order_id `INTEGER` `REFERENCES orders(id)` 
- product_id `INTEGER` `REFERENCES products(id)`
- quantity `INTEGER`
