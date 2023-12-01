import React from 'react'

import './PokemonCard.css'

const PokemonCard = ({img, name, types}) => {
  return (
    <div className='card'>
        <img src={img} alt='pokemon-img'/>
        <h3>{name.toUpperCase()}</h3>
        <div className='types-container'>
            {types.map(type => {
                return (
                    <p key={type.slot}>{type.type.name.toUpperCase()}</p>
                    )
                })}
        </div>
    </div>
  )
}

export default PokemonCard