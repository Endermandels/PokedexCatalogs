DROP TABLE IF EXISTS pokemon;

CREATE TABLE IF NOT EXISTS pokemon (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    type TEXT[],
    description TEXT
);