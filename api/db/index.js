// Connects to the Postgres db
require('dotenv').config();

const { Pool } = require('pg'); // Basically: from pg import Pool

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

module.exports = pool;