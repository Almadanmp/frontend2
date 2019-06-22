import axios from 'axios';

export const FETCH_ROOMS_STARTED = 'FETCH_ROOMS_STARTED';
export const FETCH_ROOMS_SUCCESS = 'FETCH_ROOMS_SUCCESS';
export const FETCH_ROOMS_FAILURE = 'FETCH_ROOMS_FAILURE';


export function fetchRooms() {
  const token = localStorage.getItem('loginToken');
  return dispatch => {
    dispatch(fetchRoomsStarted());
    axios
      .get(`https://smart-home-server-g2.herokuapp.com/rooms/`, {
        headers: {
          'Authorization': token,
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        dispatch(fetchRoomsSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchRoomsFailure(err.message));
      });

  };
}

export function fetchRoomsStarted() {
  return {
    type: FETCH_ROOMS_STARTED
  }
}

export function fetchRoomsSuccess(data) {
  return {
    type: FETCH_ROOMS_SUCCESS,
    payload: {
      rooms: [...data]
    }
  }
}

export function fetchRoomsFailure(message) {
  return {
    type: FETCH_ROOMS_FAILURE,
    payload: {
      error: message
    }
  }
}



