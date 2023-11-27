const { Router } = require('express');
const pokemonRouter = Router();

const getPokemons = require('./getPokemons')
const getPokemonById = require ('./getPokemonById')
const postNewPokemon = require('./postNewPokemon')

pokemonRouter.get('/', getPokemons)
pokemonRouter.post('/', postNewPokemon)
pokemonRouter.get('/:id', getPokemonById)

module.exports = pokemonRouter;