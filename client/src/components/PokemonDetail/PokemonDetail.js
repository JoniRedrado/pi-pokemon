import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";

import axios from "axios";

import { useParams } from "react-router-dom";

import './PokemonDetail.css'

const PokemonDetail = () => {
    const { id } = useParams();

    const [pokemon, setPokemon] = useState();

    useEffect(() => {
        axios.get(`http://localhost:3001/pokemon/${id}`)
          .then((res) => {
            setPokemon(res.data);
        });
    }, []);

    if (id.length <= 4 ){
      
      return (
        <>
          <Navbar />
          <div className="pokemon-detail">
          {pokemon ? (
            <div className="card-detail">
              <img src={pokemon.imagen} alt="pokemon-img" />
              <h3>{pokemon.nombre.toUpperCase()}</h3>
              <div className="detail-types-container">
                  {pokemon.tipos?.map((type) => {
                    console.log(33);
                    return (
                          <p key={type.slot}>
                              {type.type.name.toUpperCase()}
                          </p>
                      );
                    })}
              </div>
              <div className="stats-container">
                <div>
                  <label>HP</label>
                  <p>{pokemon.vida}</p>
                </div>
                <div>
                  <label>ATTACK</label>
                  <p>{pokemon.ataque}</p>
                </div>
                <div>
                  <label>DEFENSE</label>
                  <p>{pokemon.defensa}</p>
                </div>
                <div>
                  <label>SPEED</label>
                  <p>{pokemon.velocidad}</p>
                </div>
                <div>
                  <label>HEIGTH</label>
                  <p>{pokemon.altura}</p>
                </div>
                <div>
                  <label>WEIGTH</label>
                  <p>{pokemon.peso}</p>
                </div>
              </div>
            </div>
          ) : (
            <></>
            )}
          </div>
      </>
    );
  } else {
    return (
      <>
      <Navbar />
      <div className="pokemon-detail">
        { pokemon ?
            <div className='card-detail'>
              <img src={pokemon.imagen} alt='pokemon-img'/>
              <h3>{pokemon.nombre.toUpperCase()}</h3>
              <div className='detail-types-container'>
                  {pokemon.tipos?.map(type => {
                    console.log(pokemon);
                      return (
                          <p key={type.id}>{type.nombre.toUpperCase()}</p>
                          )
                      })}
              </div>
              <div className="stats-container">
                <label>HP</label>
                <p>{pokemon.vida}</p>
                <label>ATACK</label>
                <p>{pokemon.ataque}</p>
                <label>DEFENSE</label>
                <p>{pokemon.defensa}</p>
                <label>SPEED</label>
                <p>{pokemon.velocidad}</p>
                <label>HEIGTH</label>
                <p>{pokemon.altura}</p>
                <label>WEIGTH</label>
                <p>{pokemon.peso}</p>
              </div>
            </div>
            :
            <></>  
          }
        </div>
      </>
    )
  }
};

export default PokemonDetail;
