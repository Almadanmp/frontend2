import axios from 'axios/index';

export const FETCH_SENSOR_TYPES_STARTED = 'FETCH_SENSOR_TYPES_STARTED';
export const FETCH_SENSOR_TYPES_SUCCESS = 'FETCH_SENSOR_TYPES_SUCCESS';
export const FETCH_SENSOR_TYPES_FAILURE = 'FETCH_SENSOR_TYPES_FAILURE';


export function fetchSensorTypes() {
  const token = localStorage.getItem('loginToken');
  return dispatch => {
    dispatch(fetchSensorTypesStarted());
    axios
      .get(`https://smart-home-server-g2.herokuapp.com/sensors/sensorTypes`, {
          headers: {
            'Authorization': token,
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          }
        }
      )
      .then(res => {
        dispatch(fetchSensorTypesSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchSensorTypesFailure(err.message));
      });

  };
}

export function fetchSensorTypesStarted() {
  return {
    type: FETCH_SENSOR_TYPES_STARTED
  }
}

export function fetchSensorTypesSuccess(data) {
  return {
    type: FETCH_SENSOR_TYPES_SUCCESS,
    payload: {
      listSensorTypes: data
    }
  }
}

export function fetchSensorTypesFailure(message) {
  return {
    type: FETCH_SENSOR_TYPES_FAILURE,
    payload: {
      error: message
    }
  }
}



