CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(64) NOT NULL,
    lastname VARCHAR(64),
    email VARCHAR(64) NOT NULL UNIQUE,
    password VARCHAR(10) NOT NULL
);