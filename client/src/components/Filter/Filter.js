import React from 'react'
//CSS
import './Filter.css'
//LIBRARIES
import { useDispatch } from 'react-redux'
//REDUX
import { orderBy } from '../../Redux/Actions/actions'

const Filter = ({title, filters}) => {

  const dispatch = useDispatch()

  const orderPokemons = (action)=>{
    dispatch(orderBy(action))
  }

  return (
    <article>
        <p>{title}</p>
        {filters.map(filter =><button onClick={()=>orderPokemons(filter)} key={filter}>{filter}</button>)}
    </article>
  )
}

export default Filter