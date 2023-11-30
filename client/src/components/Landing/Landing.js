import React from 'react'

import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div>
        <h1>Landing</h1>
        <Link to="/home">
          <button>Ingresar a la web</button>
        </Link>
    </div>
  )
}

export default Landing