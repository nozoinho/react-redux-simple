import { useDispatch, useSelector } from "react-redux";
import { unPokeDetalleAccion } from "../redux/pokeDucks";
import { useEffect } from "react";

const Detalle = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const FechData = () => {
      dispatch(unPokeDetalleAccion());
    };
    FechData();
  }, [dispatch]);

  const pokemon = useSelector((store) => store.pokemones.unPokemon);
  //console.log(pokemon);

  return pokemon ? (
    <div className="card mt-4 text-center">
      <div className="card-body">
        <img src={pokemon.foto} className="img-fluid" alt={pokemon.name} />
        <div className="card-title text-uppercase">{pokemon.nombre}</div>
        <p className="card-text">
          Alto: {pokemon.alto}| Peso: {pokemon.peso}
        </p>
      </div>
    </div>
  ) : null;
};
export default Detalle;
