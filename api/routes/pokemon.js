// Handles all API calls under '/pokemon'

const express = require('express');
const router = express.Router();
const { getAllPokemon, getPokemonById, createPokemon, updatePokemon, deletePokemon } = require('../controllers/pokemonController');

router.get('/', getAllPokemon);
router.get('/:id', getPokemonById);
router.post('/', createPokemon);
router.put('/:id', updatePokemon);
router.delete('/:id', deletePokemon);

module.exports = router;