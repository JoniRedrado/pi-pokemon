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
import { getPokemons, filterPokemonType, orderBy, changePage } from '../../Redux/Actions/actions'

const Home = (props) => {

    var allPokemons = useSelector((state) => state.clientPokemons)
    //const filteredPokemons = useSelector((state)=> state.filteredPokemons)
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

    const orderPokemons = (action)=>{
        dispatch(orderBy(action))
        console.log(allPokemons);
    }

    const modifyPage = (action)=>{
        
        dispatch(changePage(action))
    }

    //NO ACTUALIZA EN TIEMPO REAL LOS ORDENAMIENTOS. VER ESO!!!!!
    //PROBAR CON UN MISMO USESTATE PARA TODOS
    //filtro db y api, traer todos los pokemons y filtrar si son de api o db de la misma manera que con los tipos.

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
                <button onClick={()=>orderPokemons("A-Z")}>A-Z</button>
                <button onClick={()=>orderPokemons("Z-A")}>Z-A</button>
            </article>
            <article>
                <p>POWER</p>
                <button onClick={()=>orderPokemons("ASC")}>ASC</button>
                <button onClick={()=>orderPokemons("DES")}>DES</button>
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
            {/*filteredPokemons.length !== 0 ? filteredPokemons.map(pokemon => {
                return (
                    <PokemonCard img={pokemon.imagen} name={pokemon.nombre} types={pokemon.tipos} key={pokemon.id}/>
                )
            })
            
            
            :  
            
            allPokemons.map(pokemon => {
                return (
                    <PokemonCard img={pokemon.imagen} name={pokemon.nombre} types={pokemon.tipos} key={pokemon.id}/>
                )
            })*/}
            {
                allPokemons ? allPokemons.map(pokemon => {
                    return (
                        <PokemonCard img={pokemon.imagen} name={pokemon.nombre} types={pokemon.tipos} key={pokemon.id}/>
                    )
                })
                :
                <></>
            }
            <button onClick={()=>modifyPage("PREV")}>PREV</button>
            <button onClick={()=>modifyPage("NEXT")}>NEXT</button>
        </div>
    </main>
  )
}

export default Home