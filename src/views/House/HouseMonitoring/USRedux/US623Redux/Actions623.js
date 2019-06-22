import axios from 'axios';

export const FETCH_RAINFALL_STARTED = 'FETCH_RAINFALL_STARTED';
export const FETCH_RAINFALL_SUCCESS = 'FETCH_RAINFALL_SUCCESS';
export const FETCH_RAINFALL_FAILURE = 'FETCH_RAINFALL_FAILURE';


export const fetchRainfall = ({ from, to }) => {
  const token = localStorage.getItem('loginToken')
  return dispatch => {
    dispatch(fetchRainfallStarted(from, to)); // antes de fazer o get, coloca o loading a true
    axios
      .get(`https://smarthome-g2-server.herokuapp.com/houseMonitoring/averageRainfall?initialDate=`+from+`&finalDate=`+to, {
        headers: {
          'Authorization': token,
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"}}
      )
      .then(res => {
        dispatch(fetchRainfallSuccess(res.data)); // chegaram os resultados (dados) , loading fica a falso
      })
      .catch(err => {
        dispatch(fetchRainfallFailure(err.message));
      });

  };
}
export function fetchRainfallStarted (from, to) {
  return {
    type: FETCH_RAINFALL_STARTED,
    payload: {
      from: from,
      to: to//passa o array com os dados
    }
  }
}

export function fetchRainfallSuccess (data) { // cria uma açao
  return {
    type: FETCH_RAINFALL_SUCCESS,
    payload: {
      rainfall: data //passa o array com os dados
    }
  }
}

export function fetchRainfallFailure (message) {
return {
  type: FETCH_RAINFALL_FAILURE,
  payload: {
    errorRainfall: message
  }
}
}



