const { Router } = require('express');
const pokemonRouter = Router();

const getPokemons = require('./getPokemons')

pokemonRouter.get('/', getPokemons)

module.exports = pokemonRouter;