import axios from 'axios';

export const REMOVE_AREA_SENSOR_INFO_STARTED = 'REMOVE_AREA_SENSOR_INFO_STARTED';
export const REMOVE_AREA_SENSOR_INFO_SUCCESS = 'REMOVE_AREA_SENSOR_INFO_SUCCESS';
export const REMOVE_AREA_SENSOR_INFO_FAILURE = 'REMOVE_AREA_SENSOR_INFO_FAILURE';


export const deleteSensorFromArea = ({href, sensorId}) => {
  const token = localStorage.getItem('loginToken');
  console.log(href)
  return dispatch => {
    dispatch(fetchSensorFromAreaInfo(href, sensorId));
    axios
      .delete(href,
        {
          headers: {
            'Authorization': token,
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          },
          data: {sensorId: sensorId}
        })
      .then(res => {
        dispatch(fetchSensorFromAreaInfoSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchSensorFromAreaInfoFailure(err.message));
      });
  };
};


export function fetchSensorFromAreaInfo(href, sensorId) {
  return {
    type: REMOVE_AREA_SENSOR_INFO_STARTED,
    payload: {
      href: href,
      sensorId: sensorId
    }
  }
}

export function fetchSensorFromAreaInfoSuccess(data) {
  return {
    type: REMOVE_AREA_SENSOR_INFO_SUCCESS,
    payload: {
      message: data,
    }
  }
}

export function fetchSensorFromAreaInfoFailure(message) {
  return {
    type: REMOVE_AREA_SENSOR_INFO_FAILURE,
    payload: {
      error: message
    }
  }
}
