//LIBRARIES
import React, { useEffect } from 'react'
import {Select} from 'react-dropdown-select'
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

    const [types, setTypes] = useState({})

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

    return (
    <main>
        <Navbar />
        <div className='filter-container'>
            <Filter title="ORIGIN" filters={["API", "DB"]}/>
            <Filter title="ORDER" filters={["A-Z", "Z-A"]}/>
            <Filter title="POWER" filters={["ASC", "DES"]}/>
            <article>
                <p>TYPE</p>
                <Select
                    options={types}
                    labelField="nombre" valueField="id"
                    onChange={(value) => dispatch(filterPokemonType(value[0].nombre))}
                />
            </article>
            <article>
                <button onClick={()=>dispatch(resetFilters())}>RESET</button>
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