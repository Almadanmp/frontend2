import axios from 'axios';

export const FETCH_AREA_SENSORS_STARTED = 'FETCH_AREA_SENSORS_STARTED';
export const FETCH_AREA_SENSORS_SUCCESS = 'FETCH_AREA_SENSORS_SUCCESS';
export const FETCH_AREA_SENSORS_FAILURE = 'FETCH_AREA_SENSORS_FAILURE';


export function inactivateSensorFromArea({id, sensorId}) {
  const token = localStorage.getItem('loginToken');
  return dispatch => {
    dispatch(inactivateSensorStarted());
    const data = {id, sensorId};
    axios
      .put('https://smart-home-server-g2.herokuapp.com/geoAreas/' + id + '/sensors/' + sensorId, data, {
          headers: {
            'Authorization': token,
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          }
        }
      )
      .then(res => {
        dispatch(inactivateSensorSuccess(res.data));
      })
      .catch(err => {
        dispatch(inactivateSensorFailure(err.message));
      });

  };
}

export function inactivateSensorStarted() {
  return {
    type: FETCH_AREA_SENSORS_STARTED
  }
}

export function inactivateSensorSuccess(data) {
  return {
    type: FETCH_AREA_SENSORS_SUCCESS,
    payload: {
      sensor: [...data]
    }
  }
}

export function inactivateSensorFailure(message) {
  return {
    type: FETCH_AREA_SENSORS_FAILURE,
    payload: {
      error: message
    }
  }
}



