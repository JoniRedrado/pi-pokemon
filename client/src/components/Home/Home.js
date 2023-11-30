//LIBRARIES
import React, { useEffect } from 'react'
import {Select} from 'react-dropdown-select'
import { useState } from 'react'
import axios from 'axios'
//COMPONENTS
import Navbar from '../Navbar/Navbar'
//CSS
import './Home.css'


const Home = () => {

    var options = [{name:"Fuego",id:1},{name:"Agua",id:2},{name:"Tierra",id:3},{name:"Aire",id:4}]

    const [pokemons, setPokemons] = useState()


    useEffect(()=>{

        axios.get('http://localhost:3001/pokemon')
            .then( data => {
                setPokemons(data.data);
                console.log(data);
            })
    },[])

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
                <button>A-Z</button>
            </article>
            <article>
                <p>POWER</p>
                <button>ASC</button>
            </article>
            <article>
                <p>TYPE</p>
                <Select
                    options={options}
                    labelField="name" valueField="id"
                    onChange={(value) => console.log(value)}
                />
            </article>
        </div>
        <div className='card-container'>
            {pokemons ? pokemons.map(pokemon => {
                return (
                    <p key={pokemon.id}>{pokemon.nombre}</p>
                )
            }) : <></>}
        </div>
    </main>
  )
}

export default Home