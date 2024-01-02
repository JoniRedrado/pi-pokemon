//Libraries
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
//COMPONENTS
import Navbar from "../Navbar/Navbar";
//CSS
import './PokemonDetail.css'
//REDUX
import { useDispatch } from "react-redux";
import { getPokemons } from "../../Redux/Actions/actions";
import { Redirect } from "react-router-dom";

const PokemonDetail = () => {
  const dispatch = useDispatch()
    const { id } = useParams();

    const [pokemon, setPokemon] = useState();

    useEffect(() => {
        axios.get(`http://localhost:3001/pokemon/${id}`)
          .then((res) => {
            setPokemon(res.data);
        });
    }, []);

    const deletePokemon = ()=>{
      axios.delete(`http://localhost:3001/pokemon`, {data: {id : id}})
        .then(res => {
          dispatch(getPokemons())
          console.log(res);
          alert("Pokemon deleted succesfully")
          window.location.href = '/home'
        })
        .catch(error => {
          console.error(error);
        })
    }

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
                  <label>HEIGHT</label>
                  <p>{pokemon.altura}</p>
                </div>
                <div>
                  <label>WEIGHT</label>
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
          {pokemon ? (
            <div className="card-detail">
              <img src={pokemon.imagen} alt="pokemon-img" />
              <h3>{pokemon.nombre.toUpperCase()}</h3>
              <div className="detail-types-container">
                  {pokemon.tipos?.map((type) => {
                    return (
                          <p key={type.id}>
                              {type.nombre.toUpperCase()}
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
                  <label>HEIGHT</label>
                  <p>{pokemon.altura}</p>
                </div>
                <div>
                  <label>WEIGHT</label>
                  <p>{pokemon.peso}</p>
                </div>
              </div>
              <button onClick={deletePokemon}>DELETE POKEMON</button>
            </div>)
            :
            <></>  
          }
        </div>
      </>
    )
  }
};

export default PokemonDetail;
