import React from 'react'

//CSS
import './PokemonCard.css'
//Libraries
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const PokemonCard = ({id, img, name, types}) => {

  if(typeof id === "number"){

    return (
      <div className='card'>
          <img src={img} alt='pokemon-img'/>
          <h3>{name.toUpperCase()}</h3>
          <div className='types-container'>
              {types?.map(type => {
                  return (
                      <p key={type.slot}>{type.type.name.toUpperCase()}</p>
                      )
                  })}
          </div>
          <Link to={`/detail/${id}`} className={"link"}>SEE MORE</Link>
      </div>
    )
  } else {
    return (
      <div className='card'>
          <img src={img} alt='pokemon-img'/>
          <h3>{name.toUpperCase()}</h3>
          <div className='types-container'>
              {types?.map(type => {
                  return (
                      <p key={type.id}>{type.nombre.toUpperCase()}</p>
                      )
                  })}
          </div>
          <Link to={`/detail/${id}`} className={"link"}>SEE MORE</Link>
      </div>
    )

  }


}

export default PokemonCard