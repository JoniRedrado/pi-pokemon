import React from 'react'

import './Filter.css'

import { useDispatch } from 'react-redux'
import { orderBy } from '../../Redux/Actions/actions'

const Filter = ({title, filters}) => {

  const dispatch = useDispatch()

  const orderPokemons = (action)=>{
    dispatch(orderBy(action))
  }

  return (
    <article>
        <p>{title}</p>
        {filters.map(filter =><button onClick={()=>orderPokemons(filter)}>{filter}</button>)}
    </article>
  )
}

export default Filter