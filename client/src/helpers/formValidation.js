export function formValidation (inputs){
    let errors = {}

    //NOMBRE - ENTRE 0 Y 15 CARACTERES
    if( inputs.nombre.length !== 0 && (inputs.nombre.length > 15 || inputs.nombre.length < 3)) errors.nombre = 'El nombre debe tener entro 3 y 15 caracteres'
    //VIDA - ENTRE 0 Y 100
    if( inputs.vida.length !== 0 && (inputs.vida > 100 || inputs.vida < 1)) errors.vida = 'La vida debe ser un valor entre 1 y 100'
    //ATAQUE - ENTRE 0 Y 100
    if( inputs.ataque.length !== 0 && (inputs.ataque > 100 || inputs.ataque < 1)) errors.ataque = 'El ataque debe ser un valor entre 1 y 100'
    //DEFENSA - ENTRE 0 Y 100
    if( inputs.defensa.length !== 0 && (inputs.defensa > 100 || inputs.defensa < 1)) errors.defensa = 'La defensa debe ser un valor entre 1 y 100'
    //VELOCIDAD - ENTRE 0 Y 100 (PUEDE ESTAR VACIO)
    if( inputs.velocidad.length !== 0 && (inputs.velocidad > 100 || inputs.velocidad < 1)) errors.velocidad = 'La velocidad deber ser un valor entre 1 y 100. (puede dejarse vacio)'
    //ALTURA - ENTRE 0 Y 30 (PUEDE ESTAR VACIO)
    if( inputs.altura.length !== 0 && (inputs.altura > 30 || inputs.altura < 1)) errors.altura = 'La altura deber ser un valor entre 1 y 30. (puede dejarse vacio)'
    //PESO - ENTRE 0 Y 100 (PUEDE ESTAR VACIO)
    if( inputs.peso.length !== 0 && (inputs.peso > 100 || inputs.peso < 1)) errors.peso = 'El peso deber ser un valor entre 1 y 100. (puede dejarse vacio)'

    //console.log(errors);
    return errors
}