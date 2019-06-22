import axios from 'axios';

export const FETCH_RAINFALL_STARTED = 'FETCH_RAINFALL_STARTED';
export const FETCH_RAINFALL_SUCCESS = 'FETCH_RAINFALL_SUCCESS';
export const FETCH_RAINFALL_FAILURE = 'FETCH_RAINFALL_FAILURE';
export const FETCH_NO_DATA = 'FETCH_NO_DATA';

export const fetchTotalRainfallDay = ({ selectedDay }) => {
  const token = localStorage.getItem('loginToken');
  return dispatch => {
    dispatch(fetchTotalRainfallStarted(selectedDay)); // antes de fazer o get, coloca o loading a true
    axios
      .get(`https://smarthome-g2-server.herokuapp.com/houseMonitoring/totalRainfall?date=`+selectedDay,  {
        headers: {
          'Authorization': token,
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"}}
      )
      .then(res => {
        dispatch(fetchTotalRainfallSuccess(res.data)); // chegaram os resultados (dados) , loading fica a falso
      })
      .catch(err => {
        if (err.response === 400) {
          dispatch(fetchNoData(err.message))
        }

        else{
        dispatch(fetchTotalRainfallFailure(err.message));
      }});

  };
}

export function fetchTotalRainfallStarted (selectedDay) {
  return {
    type: FETCH_RAINFALL_STARTED,
    payload: {
      selectedDay: selectedDay
    }
  }
}

export function fetchTotalRainfallSuccess (data) { // cria uma açao
  return {
    type: FETCH_RAINFALL_SUCCESS,
    payload: {
      totalRainfall: data //passa o array com os dados
    }
  }
}

export function fetchTotalRainfallFailure (message) {
  return {
    type: FETCH_RAINFALL_FAILURE,
    payload: {
      error: message
    }
  }
}

  export function fetchNoData(response) {
    return {
      type: FETCH_NO_DATA,
      payload: {
        error: response
      }
    }
}
