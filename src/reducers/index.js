import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import pokemonList from '../Pages/PokemonList/reducer';
import detailPokemon from '../Pages/DetailPokemon/reducer';

const rootReducer = combineReducers({
  pokemonList,
  detailPokemon,
  routing: routerReducer
});

export default rootReducer;
