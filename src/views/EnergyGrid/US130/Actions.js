import axios from 'axios';

export const FETCH_ENERGYGRID_INFO_STARTED = 'FETCH_ENERGYGRID_INFO_STARTED';
export const FETCH_ENERGYGRID_INFO_SUCCESS = 'FETCH_ENERGYGRID_INFO_SUCCESS';
export const FETCH_ENERGYGRID_INFO_FAILURE = 'FETCH_ENERGYGRID_INFO_FAILURE';


export const fetchEnergyGrid = ({name, maxContractedPower}) => {
  const token = localStorage.getItem('loginToken');
  return dispatch => {
    dispatch(fetchEnergyGridInfo(name, maxContractedPower));
    const houseID = "01";
    const data = {name, houseID, maxContractedPower};
    axios
      .post('https://smart-home-server-g2.herokuapp.com/grids/', data,
        {
          headers: {
            'Authorization': token,
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          },
          body: {name, houseID, maxContractedPower}
        })
      .then(res => {
        dispatch(fetchEnergyGridInfoSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchEnergyGridInfoFailure(err.message));
      });
  };
};


export function fetchEnergyGridInfo(name, maxContractedPower) {
  return {
    type: FETCH_ENERGYGRID_INFO_STARTED,
    payload: {
      name: name,
      houseID: "01",
      maxContractedPower: maxContractedPower
    }
  }
}

export function fetchEnergyGridInfoSuccess(data) {
  return {
    type: FETCH_ENERGYGRID_INFO_SUCCESS,
    payload: {
      room: data
    }
  }
}

export function fetchEnergyGridInfoFailure(message) {
  return {
    type: FETCH_ENERGYGRID_INFO_FAILURE,
    payload: {
      error: message
    }
  }
}
