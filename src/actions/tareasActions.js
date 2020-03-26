import axios from "axios";
import {
  TRAER_TODAS,
  CARGANDO,
  ERROR,
  CAMBIO_USUARIO,
  CAMBIO_TITULO,
  AGREGADA
} from "../types/tareasTypes";

export const traerTodas = () => async dispatch => {
  dispatch({
    type: CARGANDO
  });

  try {
    const respuesta = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );

    const tareas = {};
    respuesta.data.map(
      tarea =>
        (tareas[tarea.userId] = {
          ...tareas[tarea.userId],
          [tarea.id]: {
            ...tarea
          }
        })
    );

    dispatch({
      type: TRAER_TODAS,
      // payload: respuesta.data
      payload: tareas
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: ERROR,
      payload: "Tareas no disponibles."
    });
  }
};

export const cambioUsuarioId = valor => dispatch => {
  dispatch({
    type: CAMBIO_USUARIO,
    payload: valor
  });
};

export const cambioTitulo = valor => dispatch => {
  dispatch({
    type: CAMBIO_TITULO,
    payload: valor
  });
};

export const agregar = nueva_tarea => async dispatch => {
  dispatch({
    type: CARGANDO
  });

  try {
    const respuesta = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      nueva_tarea
    );
    dispatch({
      type: AGREGADA
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: ERROR,
      payload: "Servicio no disponible en este momento."
    });
  }
};
