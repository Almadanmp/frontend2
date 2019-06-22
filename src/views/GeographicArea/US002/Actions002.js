import axios from 'axios';

export const FETCH_GATS_STARTED = 'FETCH_GATS_STARTED';
export const FETCH_GATS_SUCCESS = 'FETCH_GATS_SUCCESS';
export const FETCH_GATS_FAILURE = 'FETCH_GATS_FAILURE';


export function fetchGATs() {
  const token = localStorage.getItem('loginToken');
  return dispatch => {
    dispatch(fetchGATsStarted());
    axios
      .get(`https://smarthome-g2-server.herokuapp.com/geoAreas/areaTypes`, {
          headers: {
            'Authorization': token,
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          }
        }
      )
      .then(res => {
        dispatch(fetchGATsSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchGATsFailure(err.message));
      });

  };
}

export function fetchGATsStarted() {
  return {
    type: FETCH_GATS_STARTED
  }
}

export function fetchGATsSuccess(data) {
  return {
    type: FETCH_GATS_SUCCESS,
    payload: {
      listGATypes: data
    }
  }
}

export function fetchGATsFailure(message) {
  return {
    type: FETCH_GATS_FAILURE,
    payload: {
      error: message
    }
  }
}



