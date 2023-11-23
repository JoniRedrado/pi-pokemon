const axios = require('axios')

module.exports = (req, res) => {

    axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1292')
        .then( ({data}) => {
            const pokemons = data.results;
            console.log(pokemons);
            res.status(200).send(pokemons)
        })
        .catch(error => {
            console.log("Error");
            res.status(500).send("Error")
        })
}