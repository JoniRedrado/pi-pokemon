//Libraries
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { searchPokemon } from '../../Redux/Actions/actions';


const SearchBar = () => {

    const dispatch = useDispatch();

    const [state, setState] = useState("")

    const handleChange = (e)=>{
        setState(e.target.value)
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log("submit");
        dispatch(searchPokemon(state))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} type="text"/>
                <input type='submit'/>
            </form>
        </div>
    )
}

export default SearchBar