const axios = require('axios')

const {Pokemon, Type} = require('../../db.js')

module.exports = ( req, res ) => {
    
    var {nombre, imagen, vida, ataque, defensa, velocidad, altura, peso, tipos} = req.body;

    //IMAGE - LA URL DEBE LLEVAR A UNA IMAGEN
    async function esURLImagen(url) {
        try {
            const response = await axios.head(url);
        
            if (response.status === 200) {
                const contentType = response.headers['content-type'];
                return contentType && contentType.startsWith('image/');
            } else {
                return false;
            }
        } catch (error) {
            imagen = 'https://i.ibb.co/9G0yWjc/pokemon-Default.jpg'
            return false;
        }
    }
        
    esURLImagen(imagen)
        .then((result) => {
            if (!result) {
                imagen = 'https://i.ibb.co/9G0yWjc/pokemon-Default.jpg'
            }
        })
        .then(()=>{
            Pokemon.create({
                nombre: nombre.toUpperCase(),
                imagen: imagen,
                vida: vida,
                ataque: ataque,
                defensa: defensa,
                velocidad: velocidad,
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
                console.log(error);
            })
        
            res.status(200).send("Ok")
        })



}