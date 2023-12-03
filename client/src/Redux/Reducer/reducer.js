//IMPORT action-types
import {GET_POKEMONS, FILTER_BY_TYPE, ORDER_BY} from '../Actions/actions'

//DEFINE initialState
let initialState = {
    allPokemons : [],
    filteredPokemons: []
}

//DEFINE rootReducer

function rootReducer (state=initialState, action){

    switch (action.type) {
        case GET_POKEMONS:
            return {...state, allPokemons: action.payload}
        
        case FILTER_BY_TYPE:
                const pokemonByType = state.allPokemons.filter( pokemon => {
                var bool = false
                
                pokemon.tipos.forEach(tipo => {
                    if(tipo.type.name === action.payload) {
                        bool = true
                    }
                });
                return bool
            })           
            return {...state, filteredPokemons: pokemonByType}
        
        case ORDER_BY:
            var orderedPokemons = []
            switch (action.payload) {
                
                case "A-Z":

                    orderedPokemons = state.allPokemons.sort((a,b)=>b.ataque - a.ataque)
                    console.log(orderedPokemons);
                    return {...state, allPokemons: state.allPokemons.sort((a,b)=>b.ataque - a.ataque)};
                
                case "Z-A":
                    orderedPokemons = state.allPokemons.sort((a,b)=>b.nombre - a.nombre)

                    return {...state, allPokemons: orderedPokemons};
                
                case "ASC":
                    orderedPokemons = state.allPokemons.sort((a,b)=>a.ataque - b.ataque)
                    console.log(orderedPokemons);
                    return {...state, allPokemons: orderedPokemons};

                case "DES":
                    orderedPokemons = state.allPokemons.sort((a,b)=>b.ataque - a.ataque)
                    console.log(orderedPokemons);
                    return {...state, allPokemons: orderedPokemons};
                
                default:
                    break;
            }


            return {...state, allPokemons: []}

        default:
            return {...state};
    }
}   

export default rootReducer;