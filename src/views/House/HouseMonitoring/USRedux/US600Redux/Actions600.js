import axios from 'axios';

export const FETCH_T_STARTED = 'FETCH_T_STARTED';
export const FETCH_T_SUCCESS = 'FETCH_T_SUCCESS';
export const FETCH_T_FAILURE = 'FETCH_T_FAILURE';
export const FETCH_NO_DATA = 'FETCH_NO_DATA';


export function fetchTemp() {
  const token = localStorage.getItem('loginToken');
  return dispatch => {
    dispatch(fetchTempStarted()); // antes de fazer o get, coloca o loading a true
    axios
      .get(`https://smart-home-server-g2.herokuapp.com/house/currentHouseAreaTemperature`, {
          headers: {
            'Authorization': token,
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          }
        }
      )
      .then(res => {
        dispatch(fetchTempSuccess(res.data)); // chegaram os resultados (dados) , loading fica a falso
      })
      .catch(err => {
        if (err.response === 400) {
          dispatch(fetchNoData(err.message))
        }
          else{
          dispatch(fetchTempFailure(err.message));
        }
      });
  };
}

export function fetchTempStarted() {
  return {
    type: FETCH_T_STARTED
  }
}

export function fetchTempSuccess(data) { // cria uma açao
  return {
    type: FETCH_T_SUCCESS,
    payload: {
      temp: data //passa o array com os dados
    }
  }
}

export function fetchTempFailure(message) {
  return {
    type: FETCH_T_FAILURE,
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




