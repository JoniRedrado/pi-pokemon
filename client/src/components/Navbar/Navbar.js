import React from 'react'
//Components
import SearchBar from '../SearchBar/SearchBar';
//CSS
import './Navbar.css';
import logo from '../../assets/pokemonIcon.png'
//Libraries
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
        <SearchBar />
        {/*<input type='text'/>
        <button>🔍</button>*/}
    </nav>
  )
}

export default Navbar