CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(255),
    user_id INTEGER,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE 
    -- user_id bigint REFERENCES users(id)
);