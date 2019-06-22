import axios from 'axios';
import {fetchNoData} from "../../../EnergyGrid/US147/Actions";

export const FETCH_SENSOR_INFO_STARTED = 'FETCH_SENSOR_INFO_STARTED';
export const FETCH_SENSOR_INFO_SUCCESS = 'FETCH_SENSOR_INFO_SUCCESS';
export const FETCH_SENSOR_INFO_FAILURE = 'FETCH_SENSOR_INFO_FAILURE';


export const fetchSensor = ({link, typeSensor,name,sensorId,dateStartedFunctioning}) => {
  const token = localStorage.getItem('loginToken')
  return dispatch => {
    dispatch(fetchSensorInfo(link, typeSensor, name, sensorId, dateStartedFunctioning)); // antes de fazer o get, coloca o loading a true
    console.log(typeSensor)
    const data = {link, typeSensor, name, sensorId, dateStartedFunctioning};
    axios
      .post(link, data, //falta autorização
        {
          headers: {
            'Authorization': token,
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          },
          body: { sensorId,name, dateStartedFunctioning, typeSensor}
        })
      .then(res => {
        dispatch(fetchSensorInfoSuccess(res.data)); // chegaram os resultados (dados) , loading fica a falso
      })
      .catch(err => {
        if (err.response === 400) {
          dispatch(fetchNoData(err.message))
        }
        else {
          if (err.response !== undefined) {
            dispatch(fetchSensorInfoFailure(err.response.data));
          }
        }
      });
  };
};


export function fetchSensorInfo(link, typeSensor,name,sensorId,dateStartedFunctioning) {
  return {
    type: FETCH_SENSOR_INFO_STARTED,
    payload: {
      link : link,
      typeSensor:typeSensor,
      name: name,
      sensorId: sensorId,
      dateStartedFunctioning: dateStartedFunctioning,
    }
  }
}

export function fetchSensorInfoSuccess(data) { // cria uma açao
  return {
    type: FETCH_SENSOR_INFO_SUCCESS,
    payload: {
      sensor: data //passa o array com os dados
    }
  }
}

export function fetchSensorInfoFailure(response) {
  return {
    type: FETCH_SENSOR_INFO_FAILURE,
    payload: {
      error: response
    }
  }
}



