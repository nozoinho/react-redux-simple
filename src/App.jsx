import React from "react";
import Pokemones from "./components/pokemones";

import { Provider } from "react-redux"; // permite a los componentes leer la tienda y los ducks
// envuelve a todos los componentes, de momento solo existe uno, pokemones

import generateStore from "./redux/store";

function App() {
  const store = generateStore();

  return (
    <Provider store={store}>
      <div className="container mt-3">
        <Pokemones />
      </div>
    </Provider>
  );
}

export default App;
