const {Pokemon} = require('../../db.js')

module.exports = ( req, res ) => {
    const { id } = req.body
    console.log(req.body);
    Pokemon.destroy({where: {id: id}})
        .then(delPokemon =>{
            console.log(delPokemon, "Pokemon eliminado");
            res.status(200).send("eliminado con exito")
        })
        .catch(error=>{
            console.error(error);
            res.status(500).send("No se pudo eliminar el Pokemon")
        })
}