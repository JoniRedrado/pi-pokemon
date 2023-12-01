import axios from "axios"

//Action-types
export const GET_POKEMONS = "GET_POKEMONS"

//Actions
export const getPokemons = ()=>{
    return function(dispatch){
        //peticion al back
        console.log("getpokemons");
        axios.get("http://localhost:3001/pokemon")
            .then(({data})=> {
                console.log(data);
                dispatch({type: GET_POKEMONS, payload: data})
            })
    }
    //return{type: GET_POKEMONS, payload: {}}
}
