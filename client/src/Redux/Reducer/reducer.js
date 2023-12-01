//IMPORT action-types
import {GET_POKEMONS} from '../Actions/actions'

//DEFINE initialState
let initialState = {
    allPokemons : []
}

//DEFINE rootReducer

function rootReducer (state=initialState, action){

    switch (action.type) {
        case GET_POKEMONS:
            return {...state, allPokemons: action.payload}
    
        default:
            return {...state};
    }
    //return {...state, searchPokemon: action.payload}
}   

export default rootReducer;