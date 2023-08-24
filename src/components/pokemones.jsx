// hooks react redux

import { useDispatch, useSelector } from "react-redux";
import {
  anteriorPokemonAccion,
  obtenerPokemonesAccion,
  siguientePokemonAccion,
  unPokeDetalleAccion,
} from "../redux/pokeDucks";
import Detalle from "./Detalle";
import { useEffect } from "react";

// useDispatch sirve para consumir la acción "obtenerPokemonesAccion"
// useSelector permite leer el array "pokemones"

const Pokemones = () => {
  const dispatch = useDispatch();

  //const pokemones = useSelector((store) => store.pokemones.array); // devuelve todo lo que esta en store.js
  const pokemones = useSelector((store) => store.pokemones.results); // al cambiar dataInitial, ahora el array que trae a todos los pokemones se denomina results
  //console.log(pokemones);
  const next = useSelector((store) => store.pokemones.next);
  const previous = useSelector((store) => store.pokemones.previous);

  useEffect(() => {
    const FechData = () => {
      dispatch(obtenerPokemonesAccion());
    };
    FechData();
  }, [dispatch]);

  return (
    <div className="row">
      <div className="col-md-6">
        <h3>Lista de pokemones</h3>
        <br />
        <div className="d-flex justify-content-between">
          {pokemones.length === 0 && (
            <button
              onClick={() => dispatch(obtenerPokemonesAccion())}
              className="btn btn-dark"
            >
              Get Pokemones
            </button>
          )}
          {next && (
            <button
              onClick={() => dispatch(siguientePokemonAccion())}
              className="btn btn-dark"
            >
              Siguiente
            </button>
          )}
          {previous && (
            <button
              onClick={() => dispatch(anteriorPokemonAccion())}
              className="btn btn-dark"
            >
              Anterior
            </button>
          )}
        </div>
        <ul className="list-group mt-3">
          {pokemones.map((item) => (
            <li key={item.name} className="list-group-item text-uppercase">
              {item.name}
              <button
                className="btn btn-dark btn-sm float-end"
                onClick={() => dispatch(unPokeDetalleAccion(item.url))}
              >
                Info
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-md-6">
        <h3>Detalle Pokemon</h3>
        <Detalle />
      </div>
    </div>
  );
};
export default Pokemones;
