import axios from 'axios';
import {FETCH_NO_DATA} from "../../House/HouseMonitoring/USRedux/US600Redux/Actions600";

export const FETCH_ROOM_GRID_INFO_STARTED = 'FETCH_ROOM_GRID_INFO_STARTED';
export const FETCH_ROOM_GRID_INFO_SUCCESS = 'FETCH_ROOM_GRID_INFO_SUCCESS';
export const FETCH_ROOM_GRID_INFO_FAILURE = 'FETCH_ROOM_GRID_INFO_FAILURE';
export const FETCH_NO_ROOM_GRID_DATA = 'FETCH_NO_ROOM_GRID_DATA';


export const attachRoomGrid = ({name, link}) => {
  console.log({name, link});
  const token = localStorage.getItem('loginToken');
  return dispatch => {
    dispatch(fetchRoomGridInfo(name, link));
    const data = {name, link};
    axios
      .post(link, data,
        {
          headers: {
            'Authorization': token,
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          },
          body: {name}
        })
      .then(res => {
        dispatch(fetchRoomGridInfoSuccess(res.data));
      })
      .catch(err => {
        if (err.response === 400) {
          dispatch(fetchNoData(err.message))
        }
        else {
          if(err.response !== undefined){
          dispatch(fetchRoomGridInfoFailure(err.response.data));}
        }
      });
  };
};


export function fetchRoomGridInfo(name, link) {
  return {
    type: FETCH_ROOM_GRID_INFO_STARTED,
    payload: {
      name: name,
      link: link
    }
  }
}

export function fetchRoomGridInfoSuccess(data) {
  return {
    type: FETCH_ROOM_GRID_INFO_SUCCESS,
    payload: {
      room: data
    }
  }
}

export function fetchRoomGridInfoFailure(response) {
  return {
    type: FETCH_ROOM_GRID_INFO_FAILURE,
    payload: {
      error: response
    }
  }
}

export function fetchNoData(response) {
  return {
    type: FETCH_NO_ROOM_GRID_DATA,
    payload: {
      errorData: response
    }
  }
}


