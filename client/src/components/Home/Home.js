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
import { getPokemons, filterPokemonType, orderBy } from '../../Redux/Actions/actions'

const Home = (props) => {

    const allPokemons = useSelector((state) => state.allPokemons)
    const filteredPokemons = useSelector((state)=> state.filteredPokemons)
    const dispatch = useDispatch()

    const [types, setTypes] = useState({})

    useEffect(()=>{
        dispatch(getPokemons())
        getTypes()
    },[])

    const getTypes = ()=>{
        axios.get('http://localhost:3001/types')
            .then(({data}) => {
                setTypes(data)
                console.log(data);
            })
    }

    //NO ACTUALIZA EN TIEMPO REAL LOS ORDENAMIENTOS. VER ESO!!!!!
    //PROBAR CON UN MISMO USESTATE PARA TODOS
    
  return (
    <main>
        <Navbar />
        <div className='filter-container'>
            <article>
                <p>ORIGIN</p>
                <button>API</button>
            </article>
            <article>
                <p>ORDER</p>
                <button onClick={()=>dispatch(orderBy("A-Z"))}>A-Z</button>
            </article>
            <article>
                <p>POWER</p>
                <button onClick={()=>dispatch(orderBy("ASC"))}>ASC</button>
            </article>
            <article>
                <p>TYPE</p>
                <Select
                    options={types}
                    labelField="nombre" valueField="id"
                    onChange={(value) => dispatch(filterPokemonType(value[0].nombre))}
                />
            </article>
        </div>
        <div className='card-container'>
            {filteredPokemons.length !== 0 ? filteredPokemons.map(pokemon => {
                return (
                    <PokemonCard img={pokemon.imagen} name={pokemon.nombre} types={pokemon.tipos} key={pokemon.id}/>
                )
            })
            
            
            :  
            
            allPokemons.map(pokemon => {
                return (
                    <PokemonCard img={pokemon.imagen} name={pokemon.nombre} types={pokemon.tipos} key={pokemon.id}/>
                )
            })}
        </div>
    </main>
  )
}

export default Home