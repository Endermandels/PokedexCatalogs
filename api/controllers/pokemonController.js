// Handles db communication to pokemon table
const pool = require('../db');

async function getAllPokemon(req, res) {
    try {
        // query db for all rows
        const result = await pool.query('SELECT * FROM pokemon');

        // send back all rows in pokemon table
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
}

async function getPokemonById(req, res) {
    const { id } = req.params; // get id from API call

    try {
        // query db for rows that match the specified id
        const result = await pool.query('SELECT * FROM pokemon WHERE id = $1', [id]);

        // if there are no matching rows, the Pokemon was not found; return error
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Pokemon Not Found' });
        }

        // send back the pokemon data in the matching row
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
}

module.exports = { getAllPokemon, getPokemonById };