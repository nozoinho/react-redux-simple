/* import { createStore, combineReducers, applyMiddleware, compose } from "redux"; */
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import pokeReducer from "./pokeDucks";

const rootReducer = combineReducers({
  pokemones: pokeReducer,
  // aqui van todos los reducer
  // por ejemplo =  usuarios: usuarioReducer
});

//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// configura extension de google chrome

export default function generateStore() {
  const store = createStore(
    rootReducer,
    //composeEnhancers(applyMiddleware(thunk))
    composeWithDevTools(applyMiddleware(thunk))
  );
  return store;
}
