//LIBRARIES
import React, { useEffect } from 'react'
import {Select} from 'react-dropdown-select'
import { useState } from 'react'
import axios from 'axios'
//COMPONENTS
import Navbar from '../Navbar/Navbar'
//CSS
import './Home.css'
import PokemonCard from '../PokemonCard/PokemonCard'
//REDUX
import { useDispatch, useSelector } from 'react-redux'
import { getPokemons, filterPokemonType, changePage, resetFilters } from '../../Redux/Actions/actions'
import Filter from '../Filter/Filter'
import Paginate from '../Paginate/Paginate'

const Home = () => {

    var allPokemons = useSelector((state) => state.clientPokemons)
    const dispatch = useDispatch()

    const [types, setTypes] = useState({})

    useEffect(()=>{
        if(allPokemons.length === 0 ) {
            console.log("get pokemons");
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

    const modifyPage = (action)=>{
        dispatch(changePage(action))
    }

    //filtro db y api, traer todos los pokemons y filtrar si son de api o db de la misma manera que con los tipos.
    //Emprolijar y componentizar
    //Falta implementar redirect al hacer click en card y filtrar por API/DB
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
                        <PokemonCard img={pokemon.imagen} name={pokemon.nombre} types={pokemon.tipos} key={pokemon.id}/>
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