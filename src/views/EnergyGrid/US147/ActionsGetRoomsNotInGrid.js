import axios from 'axios';
import {fetchTotalRainfallStarted} from "../../House/HouseMonitoring/USRedux/US620Redux/Actions620";

export const FETCH_ROOMS_NOT_IN_GRID_STARTED = 'FETCH_ROOMS_NOT_IN_GRID_STARTED';
export const FETCH_ROOMS_NOT_IN_GRID_SUCCESS = 'FETCH_ROOMS_NOT_IN_GRID_SUCCESS';
export const FETCH_ROOMS_NOT_IN_GRID_FAILURE = 'FETCH_ROOMS_NOT_IN_GRID_FAILURE';
export const FETCH_NO_DATA = 'FETCH_NO_DATA';


export const fetchRoomsNotInGrid = ({ grid }) => {
  const token = localStorage.getItem('loginToken');
  return dispatch => {
    dispatch(fetchRoomsNotInGridStarted(grid)); // antes de fazer o get, coloca o loading a true
    axios
      .get('https://smarthome-g2-server.herokuapp.com/gridSettings/grids/' + grid + '/notAttached',  {
        headers: {
          'Authorization': token,
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"}}
      )
      .then(res => {
        dispatch(fetchRoomsNotInGridSuccess(res.data)); // chegaram os resultados (dados) , loading fica a falso
      })
      .catch(err => {
        if (err.response === 500) {
          dispatch(fetchNoData(err.message))
        }
        else{
        dispatch(fetchRoomsNotInGridFailure(err.message));
      }});

  };
}

export function fetchRoomsNotInGridStarted (grid) {
  return {
    type: FETCH_ROOMS_NOT_IN_GRID_STARTED,
    payload: {
      grid: grid
    }
  }
}

export function fetchRoomsNotInGridSuccess (data) { // cria uma açao
  return {
    type: FETCH_ROOMS_NOT_IN_GRID_SUCCESS,
    payload: {
      roomsNotInGrid: [...data] //passa o array com os dados
    }
  }
}

export function fetchRoomsNotInGridFailure (message) {
return {
  type: FETCH_ROOMS_NOT_IN_GRID_FAILURE,
  payload: {
    error: message
  }
}
}



export function fetchNoData(response) {
  return {
    type: FETCH_NO_DATA,
    payload: {
      error: response
    }
  }
}
