const axios = require('axios')
const { Pokemon } = require('../../db')

module.exports = ( req, res ) => {

    const { name } = req.query
    const pokemonResults = []
    console.log(`https://pokeapi.co/api/v2/pokemon/${name}`);
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then( ({data})=>{
            const pokemon = {
                id: data.id,
                nombre: data.name,
                imagen: data.sprites.other["official-artwork"].front_default,
                vida: data.stats[0].base_stat,
                ataque: data.stats[1].base_stat,
                defensa: data.stats[2].base_stat,
                velocidad: data.stats[5].base_stat,
                altura: data.height,
                peso: data.weight,
                tipos: data.types
            }
            pokemonResults.push(pokemon)

            Pokemon.findAll({where: {nombre: name}})
                .then( dbPokemon => {
                    pokemonResults.push(dbPokemon)
                    res.status(200).json(pokemonResults)
                })
        })
        .catch( error => {
            Pokemon.findAll({where: {nombre: name}})
                .then( dbPokemon => {
                    if(dbPokemon.length !== 0){
                        pokemonResults.push(dbPokemon)
                        console.log(dbPokemon);
                        res.status(200).json(pokemonResults)
                    } else {
                        res.status(400).send('No se encontro ningun pokemon que coincida con el nombre ingresado.')
                    }
                })
                .catch(error => {
                    console.error(error);
                })
        })
    
    //res.status(200).send("Ok")
}