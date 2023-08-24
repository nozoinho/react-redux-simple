import axios from "axios";

/* pide tres elementos básicos
1) constantes: con la constantes y/o estados ya es posible ser consumidos por algun componente
2) reducer : recibe la lista de datos de la api y las envia a constantes o estados
3) acciones: van a consumir la api

*/

// constantes

const dataInicial = {
  /* array: [],
  offset: 0, */
  count: 0,
  next: null,
  previous: null,
  results: [],
};

// types
const OBTENER_POKEMONES_EXITO = "OBTENER_POKEMONES_EXITO";
const SIGUIENTE_POKEMONES_EXITO = "SIGUIENTE_POKEMONES_EXITO";
const POKE_INFO_EXITO = "POKE_INFO_EXITO";

// reducer - procesa acciones

export default function pokeReducer(state = dataInicial, action) {
  switch (action.type) {
    case OBTENER_POKEMONES_EXITO:
      //return { ...state, array: action.payload }; // retorna accion de modificacion en el state
      return { ...state, ...action.payload }; // ahora que retorna res.data, vienen datos adicionales como el count, next page, previous page y results que necesitan ser capturados
    case SIGUIENTE_POKEMONES_EXITO:
      /* return {
        ...state,
        array: action.payload.array,
        offset: action.payload.offset,
      }; */
      return { ...state, ...action.payload }; // ahora retorna res.data
    case POKE_INFO_EXITO:
      return { ...state, unPokemon: action.payload };
    default:
      return state;
  }
}

// acciones

// doble funcion de fecha porque la primera recibe parámetros que se requieren para obtenerPokemonesAccion para la segunda función de flecha
// la segunda funcion requiere dispatch (activa el reducer)
// y requiere getState (se obtiene la dataInicial o la informacion que se este almacenando en este state)

export const unPokeDetalleAccion =
  (url = "https://pokeapi.co/api/v2/pokemon/1/") =>
  async (dispatch, getState) => {
    //console.log({ ver_url: url });

    if (localStorage.getItem(url)) {
      //console.log("pokemon recuperado");
      dispatch({
        type: POKE_INFO_EXITO,
        payload: JSON.parse(localStorage.getItem(url)),
      });
      return;
    }

    try {
      const res = await axios.get(url);
      //console.log(res.data);
      dispatch({
        type: POKE_INFO_EXITO,
        payload: {
          nombre: res.data.name,
          peso: res.data.weight,
          alto: res.data.height,
          foto: res.data.sprites.front_default,
        },
      });
      localStorage.setItem(
        url,
        JSON.stringify({
          nombre: res.data.name,
          peso: res.data.weight,
          alto: res.data.height,
          foto: res.data.sprites.front_default,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

export const obtenerPokemonesAccion = () => async (dispatch) => {
  //console.log("getState", getState().pokemones.offset); // getState es un metodo que obtiene a los pokemones
  // primero lee la tienda donde lee a los pokemones del PokeReducer
  // lo que aparece en consola es el contenido del objeto "dataInicial"

  //const offset = getState().pokemones.offset; // similar a = const {offset} = getState().pokemones;

  if (localStorage.getItem("offset=0")) {
    //console.log("datos guardados");
    dispatch({
      type: OBTENER_POKEMONES_EXITO,

      payload: JSON.parse(localStorage.getItem("offset=0")),
    });
    return;
  }

  try {
    /* const res = await axios.get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20"); */

    const res = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?offset=0&limit=10" // partimos de offset=0
      /* `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20` */
    );
    //console.log(res);
    //console.log(res.data);

    dispatch({
      type: OBTENER_POKEMONES_EXITO,
      //payload: res.data.results,
      payload: res.data, // aqui obtenemos datos adicionales al results como el count, next y previous page
    });

    localStorage.setItem("offset=0", JSON.stringify(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const siguientePokemonAccion = () => async (dispatch, getState) => {
  //const offset = getState().pokemones.offset;

  //primera alternativa
  //const siguiente = offset + 20;

  //segunda alternativa: el valor 20 recibirlo como parametro
  //const siguiente = offset + numero;

  // como next ahora viene en el array pokemones
  const next = getState().pokemones.next;

  if (localStorage.getItem(next)) {
    //console.log("datos guardados");
    dispatch({
      type: SIGUIENTE_POKEMONES_EXITO,
      payload: JSON.parse(localStorage.getItem(next)),
    });
    return;
  }

  try {
    const res = await axios.get(
      /* `https://pokeapi.co/api/v2/pokemon?offset=${siguiente}&limit=20` */
      next
    );
    dispatch({
      type: SIGUIENTE_POKEMONES_EXITO,
      /* payload: {
          array: res.data.results,
          offset: siguiente,
        }, */
      payload: res.data,
    });
    localStorage.setItem(next, JSON.stringify(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const anteriorPokemonAccion = () => async (dispatch, getState) => {
  const { previous } = getState().pokemones;

  if (localStorage.getItem(previous)) {
    //console.log("datos guardados");
    dispatch({
      type: SIGUIENTE_POKEMONES_EXITO,
      payload: JSON.parse(localStorage.getItem(previous)),
    });
    return;
  }

  try {
    const res = await axios.get(previous);
    dispatch({
      type: SIGUIENTE_POKEMONES_EXITO,
      payload: res.data,
    });
    localStorage.setItem(previous, JSON.stringify(res.data));
  } catch (error) {
    console.log(error);
  }
};
