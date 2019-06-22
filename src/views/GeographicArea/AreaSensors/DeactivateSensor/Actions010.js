import axios from 'axios';

export const FETCH_AREA_SENSORS_STARTED = 'FETCH_AREA_SENSORS_STARTED';
export const FETCH_AREA_SENSORS_SUCCESS = 'FETCH_AREA_SENSORS_SUCCESS';
export const FETCH_AREA_SENSORS_FAILURE = 'FETCH_AREA_SENSORS_FAILURE';


export function inactivateSensorFromArea({link}) {
  const token = localStorage.getItem('loginToken');
  console.log(link)
  return dispatch => {
    dispatch(inactivateSensorStarted());
    const data = {link};
    axios
      .put(link, data, {
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



