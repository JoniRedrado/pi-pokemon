const { Router } = require('express');
const pokemonRouter = Router();

const getPokemons = require('./getPokemons')
const getPokemonById = require ('./getPokemonById')

pokemonRouter.get('/', getPokemons)
pokemonRouter.get('/:id', getPokemonById)

module.exports = pokemonRouter;