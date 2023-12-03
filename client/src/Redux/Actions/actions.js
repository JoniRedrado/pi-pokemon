import axios from "axios"

//Action-types
export const GET_POKEMONS = "GET_POKEMONS"
export const FILTER_BY_TYPE = "FILTER_BY_TYPE"
export const ORDER_BY = "ORDER_BY"

//Actions
export const getPokemons = ()=>{
    return function(dispatch){
        //peticion al back
        axios.get("http://localhost:3001/pokemon")
            .then(({data})=> {
                //console.log(data);
                dispatch({type: GET_POKEMONS, payload: data})
            })
    }
}

export const filterPokemonType = (type)=> {
    return function(dispatch){
        dispatch({type: FILTER_BY_TYPE, payload: type})
    }
}

export const orderBy = (order)=>{
    return function(dispatch){
        dispatch({type: ORDER_BY, payload: order})
    }
}