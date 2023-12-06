//IMPORT action-types
import {GET_POKEMONS, FILTER_BY_TYPE, ORDER_BY, SEARCH_POKEMON, PAGINATE} from '../Actions/actions'

//DEFINE initialState
let initialState = {
    allPokemons : [],
    backupPokemons: [],
    clientPokemons: [],
    currentPage: 0
}

//DEFINE rootReducer

function rootReducer (state=initialState, action){
    const ITEMS_PER_PAGE = 5
    switch (action.type) {
        case GET_POKEMONS:
            //state.allPokemons = action.payload
            return {...state, allPokemons: action.payload,  backupPokemons: action.payload, clientPokemons: [...action.payload].splice(0, ITEMS_PER_PAGE)}
        
        case FILTER_BY_TYPE:
            /*const pokemonByType = state.allPokemons.filter( pokemon => {
                var bool = false
                pokemon.tipos.forEach(tipo => {
                    if(tipo.type.name === action.payload) {
                        bool = true
                    }
                });
                return bool
            })
            console.log(pokemonByType);           
            return {...state, 
                    backupPokemons: pokemonByType, 
                    clientPokemons:[...state.backupPokemons].splice(0, ITEMS_PER_PAGE)
                }*/
            let pokemonByType = [...state.allPokemons].filter( pokemon => {
                var bool = false
                pokemon.tipos.forEach(tipo => {
                    if(tipo.type.name === action.payload) {
                        bool = true
                    }
                });
                return bool
            })

            return { ...state,
                    clientPokemons: [...pokemonByType].splice(0,ITEMS_PER_PAGE),
                    backupPokemons: pokemonByType,
                    currentPage: 0
            }
        
        case ORDER_BY:
            var orderedPokemons = []
            switch (action.payload) {
                
                case "A-Z":
                    const orderAZ = (a, b) => {
                        const nombreA = a.nombre.toUpperCase(); // Convertir a mayúsculas para comparación sin distinción entre mayúsculas y minúsculas
                        const nombreB = b.nombre.toUpperCase();
                    
                        if (nombreA < nombreB) {
                            return -1;
                        }
                        if (nombreA > nombreB) {
                            return 1;
                        }
                        return 0;
                    };

                    orderedPokemons = [...state.backupPokemons].sort(orderAZ)
                    return {...state, 
                            clientPokemons: [...orderedPokemons].splice(0,ITEMS_PER_PAGE),
                            backupPokemons: orderedPokemons,
                            currentPage: 0    
                        };
                
                case "Z-A":
                    const orderZA = (a, b) => {
                        const nombreA = a.nombre.toUpperCase(); // Convertir a mayúsculas para comparación sin distinción entre mayúsculas y minúsculas
                        const nombreB = b.nombre.toUpperCase();
                    
                        if (nombreA > nombreB) {
                            return -1;
                        }
                        if (nombreA < nombreB) {
                            return 1;
                        }
                        return 0;
                    };
                    orderedPokemons = [...state.backupPokemons].sort(orderZA)
                    return {...state, 
                            clientPokemons: [...orderedPokemons].splice(0,ITEMS_PER_PAGE),
                            backupPokemons: orderedPokemons,
                            currentPage: 0    
                        };
                
                case "ASC":
                    orderedPokemons = [...state.backupPokemons].sort((a,b)=>a.ataque - b.ataque)
                    console.log(orderedPokemons);
                    return {...state,
                            clientPokemons: [...orderedPokemons].splice(0, ITEMS_PER_PAGE),
                            backupPokemons: orderedPokemons,
                            currentPage: 0
                        };

                case "DES":
                    orderedPokemons = [...state.backupPokemons].sort((a,b)=>b.ataque - a.ataque)
                    console.log(orderedPokemons);
                    return {...state,
                            clientPokemons: [...orderedPokemons].splice(0, ITEMS_PER_PAGE),
                            backupPokemons: orderedPokemons,
                            currentPage: 0
                        };
                
                default:
                    break;
            }

            break;
            //return {...state, allPokemons: []}
        
        case SEARCH_POKEMON:
            //state.clientPokemons = action.payload
            console.log(state);
            return {...state, clientPokemons: action.payload}
        
        case PAGINATE:
            switch (action.payload) {
                case "PREV":
                    if(state.currentPage===0){
                        return{...state}
                    }else{    
                        state.currentPage--
                        return{...state, clientPokemons: [...state.backupPokemons].splice(state.currentPage*ITEMS_PER_PAGE, ITEMS_PER_PAGE)}
                    }

                case "NEXT":
                    state.currentPage++
                    console.log(state.backupPokemons);
                    if(state.currentPage*ITEMS_PER_PAGE >= state.backupPokemons.length){
                        state.currentPage--
                        return{...state}
                    } else {
                        return{...state, clientPokemons: [...state.backupPokemons].splice(state.currentPage*ITEMS_PER_PAGE, ITEMS_PER_PAGE)}
                    }
                default:
                    break;
            }
            break;

        default:
            return {...state};
    }
}   

export default rootReducer;