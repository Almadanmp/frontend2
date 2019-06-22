import axios from 'axios';

export const ADD_ROOM_INFO_STARTED = 'ADD_ROOM_INFO_STARTED';
export const ADD_ROOM_INFO_SUCCESS = 'ADD_ROOM_INFO_SUCCESS';
export const ADD_ROOM_INFO_FAILURE = 'ADD_ROOM_INFO_FAILURE';
export const ADD_ROOM_DATA = 'ADD_ROOM_DATA';


export const fetchRoom = ({name, floor, width, length, height}) => {
  const token = localStorage.getItem('loginToken');
  return dispatch => {
    dispatch(fetchRoomInfo(name, floor, width, length, height));
    const data = {name, floor, width, length, height};
    axios
      .post('https://smarthome-g2-server.herokuapp.com/rooms/', data,
        {
          headers: {
            'Authorization': token,
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          },
          body: {name, floor, width, length, height}
        })
      .then(res => {
        dispatch(fetchRoomInfoSuccess(res.data));
      })
      .catch(err => {
        if (err.response === 400) {
          dispatch(fetchRoomNoData(err.message))
        } else {
          if (err.response !== undefined) {
            dispatch(fetchInfoFailure(err.response.data));
          }
        }
      });
  };
};


export function fetchRoomInfo(name, floor, width, length, height) {
  return {
    type: ADD_ROOM_INFO_STARTED,
    payload: {
      name: name,
      floor: floor,
      width: width,
      length: length,
      height: height
    }
  }
}

export function fetchRoomInfoSuccess(data) {
  return {
    type: ADD_ROOM_INFO_SUCCESS,
    payload: {
      room: data
    }
  }
}

export function fetchInfoFailure(response) {
  return {
    type: ADD_ROOM_INFO_FAILURE,
    payload: {
      error: response
    }
  }
}

export function fetchRoomNoData(response) {
  return {
    type: ADD_ROOM_DATA,
    payload: {
      errorData: response
    }
  }
}
