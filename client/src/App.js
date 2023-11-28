//REACT
import { useState, useEffect } from 'react';
//React-Router-Dom
import { Routes, Route, useNavigate, useLocation} from 'react-router-dom'

//Axios
import axios from 'axios'

//Componentes

//CSS
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route />{/*Landing*/}
        <Route />{/*Home*/}
        <Route />{/*Create*/}
        <Route />{/*Detail*/}
        <Route />{/*About?*/}
      </Routes>
    </div>
  );
}

export default App;
