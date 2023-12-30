const { Router } = require('express');
const pokemonRouter = Router();

const getPokemons = require('./getPokemons')
const getPokemonById = require ('./getPokemonById')
const postNewPokemon = require('./postNewPokemon');
const getPokemonByName = require('./getPokemonByName');

pokemonRouter.get('/', getPokemons)
pokemonRouter.post('/', postNewPokemon)
//pokemonRouter.post('/', (req)=>console.log(req.body))
pokemonRouter.get('/:id', getPokemonById)
pokemonRouter.get('/search/name', getPokemonByName)

module.exports = pokemonRouter;