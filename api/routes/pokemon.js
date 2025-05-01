// Handles all API calls under '/pokemon'

const express = require('express');
const router = express.Router();
const { getAllPokemon, getPokemonById } = require('../controllers/pokemonController');

router.get('/:id', getPokemonById);
router.get('/', getAllPokemon);

module.exports = router;