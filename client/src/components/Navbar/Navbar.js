import React from 'react'

//CSS
import './Navbar.css';
import logo from '../../assets/pokemonIcon.png'

import { Link } from 'react-router-dom/cjs/react-router-dom';

const Navbar = () => {
  return (
    <nav>
        <Link to="/home">
          <img className='logo' alt='logo' src={logo}/>
        </Link>
        <ul>
            <Link to="/about" className="link">ABOUT</Link>
            <Link to="/create" className="link">CREATE POKEMON</Link>
        </ul>
        <input type='text'/>
        <button>🔍</button>
    </nav>
  )
}

export default Navbar