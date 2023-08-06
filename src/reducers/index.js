import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import pokemonList from '../Pages/PokemonList/reducer';
import detailPokemon from '../Pages/DetailPokemon/reducer';
import myList from '../Pages/MyList/reducer';

const rootReducer = combineReducers({
  pokemonList,
  detailPokemon,
  myList,
  routing: routerReducer
});

export default rootReducer;
