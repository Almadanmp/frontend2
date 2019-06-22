import axios from 'axios';

export const FETCH_ROOM_T_STARTED = 'FETCH_ROOM_T_STARTED';
export const FETCH_ROOM_T_SUCCESS = 'FETCH_ROOM_T_SUCCESS';
export const FETCH_ROOM_T_FAILURE = 'FETCH_ROOM_T_FAILURE';
export const FETCH_NO_DATA = 'FETCH_NO_DATA';


export function fetchRoomTemp(href) {
  const token = localStorage.getItem('loginToken');
  return dispatch => {
    dispatch(fetchRoomTempStarted(href)); // antes de fazer o get, coloca o loading a true
    axios
      .get(href, {
          headers: {
            'Authorization': token,
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          }
        }
      )
      .then(res => {
        dispatch(fetchRoomTempSuccess(res.data)); // chegaram os resultados (dados) , loading fica a falso
      })
      .catch(err => {
        if (err.response === 400) {
          dispatch(fetchNoData(err.message))
        }
          else{
          dispatch(fetchRoomTempFailure(err.message));
        }
      });
  };
}

export function fetchRoomTempStarted(href) {
  return {
    type: FETCH_ROOM_T_STARTED,
    payload: {
      href: href,
    }
  }
}

export function fetchRoomTempSuccess(data) { // cria uma açao
  return {
    type: FETCH_ROOM_T_SUCCESS,
    payload: {
      roomTemp: [...data] //passa o array com os dados
    }
  }
}

export function fetchRoomTempFailure(message) {
  return {
    type: FETCH_ROOM_T_FAILURE,
    payload: {
      error: message
    }
  }
}

export function fetchNoData(response) {
  return {
    type: FETCH_NO_DATA,
    payload: {
      errorData: response
    }
  }
}




