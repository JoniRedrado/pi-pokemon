//IMPORT action-types
import {GET_POKEMONS, FILTER_BY_TYPE, ORDER_BY, SEARCH_POKEMON, PAGINATE, RESET_FILTERS} from '../Actions/actions'

//DEFINE initialState
let initialState = {
    //Contiene todos los pokemons
    allPokemons : [],
    //Contiene los pokemons que cumplen con los filtros/ordenamientos/busquedas
    backupPokemons: [],
    //Contiene los pokemons a renderizar segun paginado
    clientPokemons: [],
    //Pagina actual del paginado
    currentPage: 0,
    itemsPerPage: 5
}

//DEFINE rootReducer

function rootReducer (state=initialState, action){
    const ITEMS_PER_PAGE = 5
    switch (action.type) {

        case GET_POKEMONS:
            return {...state, allPokemons: action.payload,  backupPokemons: action.payload, clientPokemons: [...action.payload].splice(0, ITEMS_PER_PAGE)}
        
        case RESET_FILTERS:
            let resetFilters = [...state.allPokemons]
            return {...state,
                    backupPokemons: resetFilters,
                    clientPokemons: [...resetFilters].splice(0, ITEMS_PER_PAGE),
                    currentPage: 0
            }

        case FILTER_BY_TYPE:
            let pokemonByType = [...state.allPokemons].filter( pokemon => {
                var bool = false
                console.log(pokemon);
                //Arreglo provisorio, tira error porque los pokemon de la db no vienen con los tipos asociados! VER ESO!
                pokemon.tipos?.forEach(tipo => {
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
                        const nombreA = a.nombre.toUpperCase();
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
                    //console.log(orderedPokemons);
                    return {...state,
                            clientPokemons: [...orderedPokemons].splice(0, ITEMS_PER_PAGE),
                            backupPokemons: orderedPokemons,
                            currentPage: 0
                        };

                case "DES":
                    orderedPokemons = [...state.backupPokemons].sort((a,b)=>b.ataque - a.ataque)
                    //console.log(orderedPokemons);
                    return {...state,
                            clientPokemons: [...orderedPokemons].splice(0, ITEMS_PER_PAGE),
                            backupPokemons: orderedPokemons,
                            currentPage: 0
                        };
                
                default:
                    break;
            }
            break;
        
        case SEARCH_POKEMON:
            const searchPokemons = action.payload
            
            return {...state, 
                    clientPokemons: [...searchPokemons].splice(0, ITEMS_PER_PAGE),
                    backupPokemons: searchPokemons,
                    currentPage: 0
                }
        
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