import axios from 'axios';

export const FETCH_GABTS_STARTED = 'FETCH_GABTS_STARTED';
export const FETCH_GABTS_SUCCESS = 'FETCH_GABTS_SUCCESS';
export const FETCH_GABTS_FAILURE = 'FETCH_GABTS_FAILURE';


export function fetchGABTs() {
  const token = localStorage.getItem('loginToken');
  return dispatch => {
    dispatch(fetchGABTsStarted());
    axios
      .get(`https://smart-home-server-g2.herokuapp.com/geoAreas/`, {
          headers: {
            'Authorization': token,
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          }
        }
      )
      .then(res => {
        dispatch(fetchGABTsSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchGABTsFailure(err.message));
      });

  };
}

export function fetchGABTsStarted() {
  return {
    type: FETCH_GABTS_STARTED
  }
}

export function fetchGABTsSuccess(data) {
  return {
    type: FETCH_GABTS_SUCCESS,
    payload: {
      areas: data
    }
  }
}

export function fetchGABTsFailure(message) {
  return {
    type: FETCH_GABTS_FAILURE,
    payload: {
      error: message
    }
  }
}



