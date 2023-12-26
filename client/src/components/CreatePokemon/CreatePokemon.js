//Libraries
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Select} from 'react-dropdown-select'
//Components
import Navbar from '../Navbar/Navbar'
//Helpers
import { formValidation } from '../../helpers/formValidation'

const CreatePokemon = () => {

  const [types, setTypes] = useState({})
  const [inputs, setInputs] = useState({
    nombre: '',
    vida: '',
    ataque: '',
    defensa: '',
    velocidad: '',
    altura: '',
    peso: '',
    tipos: []
  })

  const [errors, setErrors] = useState({})


  useEffect(()=>{
    getTypes()
  },[])

  const getTypes =()=>{
    axios.get('http://localhost:3001/types')
      .then(({data}) => {
          setTypes(data)
      })
  }

  const handleChange = (e)=>{
    setInputs({...inputs, [e.target.name]: e.target.value})
    
    setErrors(
      formValidation({
        ...inputs,
        [e.target.name]: e.target.value
      })
    )
  }

  const submitPokemon = (e)=>{
    e.preventDefault()
    console.log(inputs);
  }

  return (
    <>
      <Navbar />
      <div>
        <form>
          <label>NAME:</label>
          <input type='text'  name='nombre' value={inputs.nombre} onChange={handleChange} required minLength='4' maxLength='20'/>
          <label>IMAGE:</label>
          <input type='file'  name='imagen' value={inputs.imagen} onChange={handleChange} accept='image/*' />
          <label>HP:</label>
          <input type='number' name='vida' value={inputs.vida} onChange={handleChange} />
          <label>ATTACK:</label>
          <input type='number' name='ataque' value={inputs.ataque} onChange={handleChange} />
          <label>DEFENSE:</label>
          <input type='number' name='defensa' value={inputs.defensa} onChange={handleChange} />
          <label>SPEED:</label>
          <input type='number' name='velocidad' value={inputs.velocidad} onChange={handleChange} />
          <label>HEIGHT:</label>
          <input type='number' name='altura' value={inputs.altura} onChange={handleChange} />
          <label>WEIGHT:</label>
          <input type='number' name='peso' value={inputs.peso} onChange={handleChange} />
          <Select 
            options={types}
            labelField="nombre" valueField="nombre"
            multi
            onChange={(value)=>setInputs({...inputs, tipos: value})}
          />
          <input type='button' value='CREATE' onClick={submitPokemon}/>
        </form>
      </div>
    </>
  )
}

export default CreatePokemon