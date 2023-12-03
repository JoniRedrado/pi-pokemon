const axios = require('axios')

module.exports =  (req, res) => {

    var pokemons = []

    axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=15')
        .then( ({data}) => {

            async function getPokemonDetails (url){
                try {
                    await axios.get(url)
                        .then(({data}) => {
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
                            pokemons.push(pokemon)
                        })
                } catch (error) {
                    console.error(error);
                }
            }

            async function getAllPokemons (pokemonsArray){
                for (const pokemon of pokemonsArray) {
                    await getPokemonDetails(pokemon.url)
                }

                res.status(200).json(pokemons)
            }

            getAllPokemons(data.results)

        })
        .catch(error => {
            console.error(error);
            res.status(500).send("Error al obtener los pokemons")
        })
        
}