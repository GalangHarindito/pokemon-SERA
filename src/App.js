import React from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { routes } from "./configs";

import pages from './Pages';
import 'react-toastify/dist/ReactToastify.css';

function App({ history, store }) {

  return (
    <Provider store={store} >
      <Router history={history}>
    
      <Switch>
        <Route exact path={ routes.HOME() } component={pages.Home} />
        <Route exact path={ routes.POKEMONLIST() } component={pages.PokemonList} />
      </Switch>

    </Router>
    </Provider>

  );
}

export default App;
