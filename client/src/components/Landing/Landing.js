import React from 'react'
//Libraries
import { Link } from 'react-router-dom'
//CSS
import './Landing.css'

const Landing = () => {
  return (
    <div className='landing-container'>
      
        <h1>WELCOME TO MI INDIVIDUAL PROJECT FOR HENRY!</h1>
        <Link to="/home">
          <button>Begin your journey</button>
        </Link>
    </div>
  )
}

export default Landing