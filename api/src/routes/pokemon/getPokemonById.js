const axios = require('axios')
const {Pokemon, } = require('../../db.js')

module.exports = ( req, res ) => {
    
    const { id } = req.params;
    console.log(typeof (id+0));

    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(({data})=>{
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
            console.log(pokemon);
            res.status(200).json(pokemon)
        })
        .catch(error => {
            Pokemon.findOne({where: {id: id}})
                .then(dbPokemon => {
                    dbPokemon.getTypes()
                        .then(types => {
                            dbPokemon.dataValues.tipos = types
                            res.status(200).json(dbPokemon)
                        })
                        .catch(error => {
                            console.error('No se encontraron los tipos.');
                        })
                })
                .catch(error => {
                    res.status(404).send('No se ha encontrado el pokemon.')
                })
        })

}

//ID data.id 
//nombre data.name
//imagen data.sprites.other["official-artwork"].front_default
//vida data.stats[0].base_stat
//ataque data.stats[1].base_stat
//defensa data.stats[2].base_stat
//velocidad data.stats[5].base_stat
//altura data.height
//peso data.weight