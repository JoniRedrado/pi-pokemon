const axios = require('axios')

const { Type } = require('../../db.js')

module.exports = async ( req, res ) => {

    const dbTypes = await Type.findAll({
        attributes: ['nombre']
    })
    
    if( dbTypes.length == 0 ) {
        
        console.log("db vacia");
        
        axios.get('https://pokeapi.co/api/v2/type/')
            .then( async ({data}) => {
                const apiTypes = data.results

                await apiTypes.forEach( type => {
                    Type.create({ nombre: type.name})
                });

                await Type.findAll();
                
                const dbTypes = await Type.findAll({
                    attributes: ['nombre']
                })
                if (dbTypes.length === 0) {
                    console.log(dbTypes);
                    res.status(500).send("23 err")
                } else {
                    res.status(200).send(dbTypes)
                }

            })
            .catch(error => {
                console.log("30");
                res.status(500).send('Errors')
            })

    } else {
        console.log("Ya hay datos");
        res.status(200).send(dbTypes)
    }


}