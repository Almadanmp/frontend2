import axios from 'axios';

export const POST_SENSOR_TYPE_STARTED = 'POST_SENSOR_TYPE_STARTED';
export const POST_SENSOR_TYPE_SUCCESS = 'POST_SENSOR_TYPE_SUCCESS';
export const POST_SENSOR_TYPE_FAILURE = 'POST_SENSOR_TYPE_FAILURE';
export const POST_SENSOR_TYPE_DATA = 'POST_SENSOR_TYPE_DATA';



export const addSensorType = (name, units)=> {
  const token = localStorage.getItem('loginToken');
  const data = {name, units};
  return dispatch => {
    dispatch(addSensorTypeStarted(name, units));
    axios
      .post(`https://smarthome-g2-server.herokuapp.com/sensors/sensorTypes`, data, {
          headers: {
            'Authorization': token,
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          },
          body: {
            name, units
          }
        }
      )
      .then(res => {
        dispatch(addSensorTypeSuccess(res.data));
      })
      .catch(err => {
        if (err.response === 400) {
          dispatch(addSensorTypeNoData(err.message))
        } else {
          if (err.response !== undefined) {
            dispatch(addSensorTypeFailure(err.response.data));
          }
        }
      });
  };
};

export function addSensorTypeStarted(name, units) {
  return {
    type: POST_SENSOR_TYPE_STARTED,
    payload: {
      name: name,
      units: units
    }
  }
}

export function addSensorTypeSuccess(data) {
  return {
    type: POST_SENSOR_TYPE_SUCCESS,
    payload: {
      addedType: data
    }
  }
}

export function addSensorTypeFailure(response) {
  return {
    type: POST_SENSOR_TYPE_FAILURE,
    payload: {
      error: response
    }
  }
}

export function addSensorTypeNoData(response) {
  return {
    type: POST_SENSOR_TYPE_DATA,
    payload: {
      errorData: response
    }
  }
}
