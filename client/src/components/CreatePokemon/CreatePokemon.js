//Libraries
import React, { useEffect, useState } from 'react'
import axios from 'axios'
//CSS
import './CreatePokemon.css'
//import {Select} from 'react-dropdown-select'
//REDUX
import { useDispatch } from 'react-redux'
import { getPokemons } from '../../Redux/Actions/actions'
//Components
import Navbar from '../Navbar/Navbar'
//Helpers
import { formValidation } from '../../helpers/formValidation'

const CreatePokemon = () => {

  const dispatch = useDispatch()

  const [types, setTypes] = useState({})
  const [inputs, setInputs] = useState({
    nombre: '',
    imagen: '',
    vida: '',
    ataque: '',
    defensa: '',
    velocidad: '',
    altura: '',
    peso: '',
    tipos: []
  })

  const [errors, setErrors] = useState({})
  const typesFilter = ["normal", "fighting", "flying", "poison", "ground", "rock", "bug", "ghost", "steel", "fire", "water", "grass", "electic", "psychic", "ice", "dragon", "dark", "fairy", "unknown", "shadow"]



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
    console.log(errors);
  }

  const submitPokemon = (e)=>{
    e.preventDefault()
    const types = []
    inputs.tipos.forEach(tipo=>{types.push(tipo.nombre)})
    //VALIDAR QUE NO ESTE VACIO ANTES DE MANDAR!

    if( inputs.nombre.length !== 0 && Object.keys(errors).length === 0 ) {
      console.log(inputs);
      axios.post('http://localhost:3001/pokemon', inputs)
      dispatch(getPokemons())
      setInputs({
        nombre: '',
        imagen: '',
        vida: '',
        ataque: '',
        defensa: '',
        velocidad: '',
        altura: '',
        peso: '',
        tipos: []
      })
    }
  }

  const handleTypeSelector = (e)=>{
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value)
    console.log(selectedOptions);
    setInputs({...inputs, tipos: selectedOptions})
  }

  return (
    <>
      <Navbar />
      <div className='new-pokemon-container'>
        <h3>CREATE YOUR OWN POKEMON!</h3>
        <form>
          <label>NAME:</label>
          <input type='text'  name='nombre' value={inputs.nombre} onChange={handleChange} required minLength='4' maxLength='20'/>
          {errors.nombre ? <p className="errors-p">{errors.nombre}</p> : <></>}
          <label>IMAGE: (url)</label>
          <input type='text'  name='imagen' value={inputs.imagen} onChange={handleChange} />
          <div className='attributes-container'>
            <div>
              <label>HP:</label>
              <input type='number' name='vida' value={inputs.vida} onChange={handleChange} />
              {errors.vida ? <p className="errors-p">{errors.vida}</p> : <></>}
            </div>
            <div> 
              <label>ATTACK:</label>
              <input type='number' name='ataque' value={inputs.ataque} onChange={handleChange} />
              {errors.ataque ? <p className="errors-p">{errors.ataque}</p> : <></>}
            </div>
          </div>
          <div className='attributes-container'>
            <div>
              <label>DEFENSE:</label>
              <input type='number' name='defensa' value={inputs.defensa} onChange={handleChange} />
              {errors.defensa ? <p className="errors-p">{errors.defensa}</p> : <></>}
            </div>
            <div>
              <label>SPEED:</label>
              <input type='number' name='velocidad' value={inputs.velocidad} onChange={handleChange} />
              {errors.velocidad ? <p className="errors-p">{errors.velocidad}</p> : <></>}
            </div>
          </div>
          <div className='attributes-container'>
            <div>
              <label>HEIGHT:</label>
              <input type='number' name='altura' value={inputs.altura} onChange={handleChange} />
              {errors.altura ? <p className="errors-p">{errors.altura}</p> : <></>}
            </div>
            <div>
              <label>WEIGHT:</label>
              <input type='number' name='peso' value={inputs.peso} onChange={handleChange} />
              {errors.peso ? <p className="errors-p">{errors.peso}</p> : <></>}
            </div>
          </div>
          {/*<Select 
            options={types}
            labelField="nombre" valueField="nombre"
            multi
            onChange={(value)=>setInputs({...inputs, tipos: value})}
  />*/}
          <label>TYPES: <p className='aclaration'>(you can select multiple types by holding "CTRL + LClick")</p></label>
          <select id="opciones" value={inputs.tipos} onChange={handleTypeSelector} multiple>
            <option value="" >Selecciona...</option>
            { typesFilter?.map(type => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))
            }   
          </select>
          <input type='button' value='CREATE' onClick={submitPokemon} className='create-button'/>
        </form>
      </div>
    </>
  )
}

export default CreatePokemon