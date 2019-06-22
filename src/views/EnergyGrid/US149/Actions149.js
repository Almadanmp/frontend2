import axios from 'axios';

export const DETACH_GRID_ROOM_INFO_STARTED = 'DETACH_GRID_ROOM_INFO_STARTED';
export const DETACH_GRID_ROOM_INFO_SUCCESS = 'DETACH_GRID_ROOM_INFO_SUCCESS';
export const DETACH_GRID_ROOM_INFO_FAILURE = 'DETACH_GRID_ROOM_INFO_FAILURE';


export const detachRoomFromGrid = ({name, grid}) => {
  console.log({name, grid});
  const token = localStorage.getItem('loginToken');
  return dispatch => {
    dispatch(fetchRoomFromGridInfo(name, grid));
    axios
      .delete('https://smarthome-g2-server.herokuapp.com/grids/' + grid,
        {
          headers: {
            'Authorization': token,
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          },
          data: {name: name}
        })
      .then(res => {
        dispatch(fetchRoomFromGridInfoSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchRoomFromGridInfoFailure(err.message));
      });
  };
};


export function fetchRoomFromGridInfo(name, grid) {
  return {
    type: DETACH_GRID_ROOM_INFO_STARTED,
    payload: {
      name: name,
      grid: grid,
    }
  }
}

export function fetchRoomFromGridInfoSuccess(data) {
  return {
    type: DETACH_GRID_ROOM_INFO_SUCCESS,
    payload: {
      message: data,
    }
  }
}

export function fetchRoomFromGridInfoFailure(message) {
  return {
    type: DETACH_GRID_ROOM_INFO_FAILURE,
    payload: {
      error: message
    }
  }
}
