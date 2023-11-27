const axios = require('axios')

const {Pokemon, Type} = require('../../db.js')

module.exports = ( req, res ) => {
    
    const {nombre, imagen, vida, ataque, defensa, altura, peso, tipos} = req.body;

    /*Type.findAll({where : {nombre: tipos}})
        .then(types => {
            console.log(types);
            if(types.length === tipos.length) {

                Pokemon.create({
                    nombre: nombre,
                    imagen: imagen,
                    vida: vida,
                    ataque: ataque,
                    defensa: defensa,
                    altura: altura,
                    peso: peso,
                    Types: types
                }, {
                    include: [Type]
                })
                .then( nuevoPokemon => {
                    console.log(nuevoPokemon);
                })
                .catch( error => {
                    console.error(error);
                })
            } else {
                console.log('Error 32');
            }
        })
        .catch( error => {
            console.error('Error al buscar los tipos');
        })

    */
    Pokemon.create({
        nombre: nombre,
        imagen: imagen,
        vida: vida,
        ataque: ataque,
        defensa: defensa,
        altura: altura,
        peso: peso
    }).then(nuevoPokemon => {
        if(nuevoPokemon){
            Type.findAll({ where: {nombre: tipos}})
                .then(types => {
                    if(types.length === tipos.length){
                        nuevoPokemon.addTypes(types)
                            .then(()=>{
                                console.log('Creado con exito');
                            })
                            .catch(error=>{
                                console.error('Error al agregar tipos');
                            })
                    } else { 
                        console.log('No se encontraron los tipos');
                    }
                })
                .catch(error => {
                    console.error('Error al buscar los tipos');
                })
        } else { 
            console.log('No se pudo crear el Pokemon');
        }
    })
    .catch(error => {
        console.log('Error al crear el Pokemon');
    })

    //console.log(data);
    res.status(200).send("Ok")
}