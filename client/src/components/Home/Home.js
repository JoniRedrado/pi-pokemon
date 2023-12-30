//LIBRARIES
import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
//COMPONENTS
import Navbar from '../Navbar/Navbar'
import Filter from '../Filter/Filter'
import Paginate from '../Paginate/Paginate'
//CSS
import './Home.css'
import PokemonCard from '../PokemonCard/PokemonCard'
//REDUX
import { useDispatch, useSelector } from 'react-redux'
import { getPokemons, filterPokemonType, resetFilters } from '../../Redux/Actions/actions'

const Home = () => {

    var allPokemons = useSelector((state) => state.clientPokemons)
    var backupPokemons = useSelector((state) => state.backupPokemons)
    const dispatch = useDispatch()

    const [ types, setTypes] = useState({})
    const [ typeFilter, setTypeFilter ] = useState()
    const typesFilter = ["normal", "fighting", "flying", "poison", "ground", "rock", "bug", "ghost", "steel", "fire", "water", "grass", "electic", "psychic", "ice", "dragon", "dark", "fairy", "unknown", "shadow"]

    useEffect(()=>{
        if(allPokemons.length === 0 ) {
            dispatch(getPokemons())
        }
        getTypes()
    },[])

    const getTypes = ()=>{
        axios.get('http://localhost:3001/types')
            .then(({data}) => {
                setTypes(data)
            })
    }

    const filterByType = (e)=>{
        setTypeFilter(e.target.value)
        dispatch(filterPokemonType(e.target.value))
    }

    const resetAllFilters = () => {
        dispatch(resetFilters())
        setTypeFilter("")
    }

    return (
    <main>
        <Navbar />
        <div className='filter-container'>
            <Filter title="ORIGIN" filters={["API", "DB"]}/>
            <Filter title="ORDER" filters={["A-Z", "Z-A"]}/>
            <Filter title="POWER" filters={["ASC", "DES"]}/>
            <article>
                <p>TYPE</p>
                <select id="opciones" value={typeFilter} onChange={filterByType}>
                    <option value="" >Selecciona...</option>
                    {   typesFilter?.map(type => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))
                    }   
                </select> 
            </article>
            <article>
                <button onClick={resetAllFilters}>RESET</button>
            </article>
        </div>
        <div className='card-container'>
            {
                allPokemons ? allPokemons.map(pokemon => {
                    return (
                        <PokemonCard id={pokemon.id} img={pokemon.imagen} name={pokemon.nombre} types={pokemon.tipos} key={pokemon.id}/>
                    )
                })
                :
                <></>
            }
        </div>
        <Paginate />
    </main>
    )
}

export default Home