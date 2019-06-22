import axios from 'axios';

export const FETCH_LOCATION_STARTED = 'FETCH_LOCATION_STARTED';
export const FETCH_LOCATION_SUCCESS = 'FETCH_LOCATION_SUCCESS';
export const FETCH_LOCATION_FAILURE = 'FETCH_LOCATION_FAILURE';


export const fetchLocation = ({geographicAreaId, street, number, zip, town, country, latitude, longitude, altitude}) => {
  const token = localStorage.getItem('loginToken');
  return dispatch => {
    dispatch(fetchLocationStarted(geographicAreaId, street, number, zip, town, country, latitude, longitude, altitude));
    const data = {geographicAreaId, street, number, zip, town, country, latitude, longitude, altitude};
    axios
      .put('https://smart-home-server-g2.herokuapp.com/house/', data, {
          headers: {
            'Authorization': token,
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          },
          body: {geographicAreaId, street, number, zip, town, country, latitude, longitude, altitude}
        }
      )
      .then(res => {
        dispatch(fetchLocationSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchLocationFailure(err.message))
      })

  };
};

export function fetchLocationStarted(geographicAreaId, street, number, zip, town, country, latitude, longitude, altitude) {
  return {
    type: FETCH_LOCATION_STARTED,
    payload: {
      geographicAreaId: geographicAreaId,
      street: street,
      number: number,
      zip: zip,
      town: town,
      country: country,
      latitude: latitude,
      longitude: longitude,
      altitude: altitude,
    }
  }
}

export function fetchLocationSuccess(data) {
  return {
    type: FETCH_LOCATION_SUCCESS,
    payload: {
      location: data
    }
  }
}

export function fetchLocationFailure(response) {
  return {
    type: FETCH_LOCATION_FAILURE,
    payload: {
      error: response
    }
  }
}



