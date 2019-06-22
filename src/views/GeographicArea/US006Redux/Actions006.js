import axios from 'axios';

export const ADD_AREA_SENSOR_STARTED = 'ADD_AREA_SENSOR_STARTED';
export const ADD_AREA_SENSOR_SUCCESS = 'ADD_AREA_SENSOR_SUCCESS';
export const ADD_AREA_SENSOR_FAILURE = 'ADD_AREA_SENSOR_FAILURE';


export const fetchLocation = ({linkAdd, typeSensor, name, sensorId, dateStartedFunctioning, latitude, longitude, altitude}) => {
  const token = localStorage.getItem('loginToken');
  return dispatch => {
    dispatch(fetchLocationStarted(linkAdd, typeSensor, name, sensorId, dateStartedFunctioning, latitude, longitude, altitude));
    const data = {linkAdd, typeSensor, name, sensorId, dateStartedFunctioning, latitude, longitude, altitude};
    console.log(linkAdd)
    axios
      .post(linkAdd, data, {
          headers: {
            'Authorization': token,
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          },
          body: {typeSensor, name, sensorId, dateStartedFunctioning, latitude, longitude, altitude}
        }
      )
      .then(res => {
        dispatch(fetchLocationSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchLocationFailure(err.message))
      })

  };
};

export function fetchLocationStarted(linkAdd, typeSensor, name, sensorId, dateStartedFunctioning, latitude, longitude, altitude) {
  return {
    type: ADD_AREA_SENSOR_STARTED,
    payload: {
      linkAdd: linkAdd,
      typeSensor: typeSensor,
      name: name,
      sensorId: sensorId,
      dateStartedFunctioning: dateStartedFunctioning,
      latitude: latitude,
      longitude: longitude,
      altitude: altitude,
    }
  }
}

export function fetchLocationSuccess(data) {
  return {
    type: ADD_AREA_SENSOR_SUCCESS,
    payload: {
      addedSensor: data
    }
  }
}

export function fetchLocationFailure(response) {
  return {
    type: ADD_AREA_SENSOR_FAILURE,
    payload: {
      error: response
    }
  }
}



