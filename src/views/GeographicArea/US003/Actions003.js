import axios from 'axios';

export const FETCH_GA_STARTED = 'FETCH_GA_STARTED';
export const FETCH_GA_SUCCESS = 'FETCH_GA_SUCCESS';
export const FETCH_GA_FAILURE = 'FETCH_GA_FAILURE';


export const fetchGA = ({name, typeArea, length, width, latitude, longitude, altitude, description}) => {
  const token = localStorage.getItem('loginToken');
  return dispatch => {
    dispatch(fetchGAStarted(name, typeArea, length, width, latitude, longitude, altitude, description));
    const data = {name, typeArea, length, width, latitude, longitude, altitude, description};
    axios
      .post(`https://smart-home-server-g2.herokuapp.com/geoAreas/`, data, {
          headers: {
            'Authorization': token,
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          },
          body: {
            name, typeArea, length, width, latitude, longitude, altitude, description
          }
        }
      )
      .then(res => {
        dispatch(fetchGASuccess(res.data));
      })
      .catch(err => {
        if (err.response !== undefined) {
          dispatch(fetchGAFailure(err.response.data));
        }
      });
  };
};

export function fetchGAStarted(name, typeArea, length, width, latitude, longitude, altitude, description) {
  return {
    type: FETCH_GA_STARTED,
    payload: {
      name: name,
      typeArea: typeArea,
      length: length,
      width: width,
      local: {
        latitude: latitude,
        longitude: longitude,
        altitude: altitude
      },
      description: description
    }
  }
}

export function fetchGASuccess(data) {
  return {
    type: FETCH_GA_SUCCESS,
    payload: {
      geographicAreaInfo: data
    }
  }
}

export function fetchGAFailure(response) {
  return {
    type: FETCH_GA_FAILURE,
    payload: {
      error: response
    }
  }
}



