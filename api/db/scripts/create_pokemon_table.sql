CREATE TABLE IF NOT EXISTS pokemon (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT[],
    description TEXT
);