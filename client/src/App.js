//REACT
import { Route, Switch} from 'react-router-dom';

//Componentes
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import CreatePokemon from './components/CreatePokemon/CreatePokemon';
import PokemonDetail from './components/PokemonDetail/PokemonDetail';
import About from './components/About/About'

//CSS
import './App.css';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/create">
          <CreatePokemon />
        </Route>
        <Route path="/detail/:id">
          <PokemonDetail />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
