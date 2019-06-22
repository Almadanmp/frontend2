import axios from 'axios';

export const POST_AREATYPE_STARTED = 'POST_AREATYPE_STARTED';
export const POST_AREATYPE_SUCCESS = 'POST_AREATYPE_SUCCESS';
export const POST_AREATYPE_FAILURE = 'POST_AREATYPE_FAILURE';


export function addAreaType(typeName) {
  const token = localStorage.getItem('loginToken');
  const data = typeName;
  return dispatch => {
    dispatch(addAreaTypeStarted(typeName));
    axios
      .post(`https://smart-home-server-g2.herokuapp.com/geoAreas/areaTypes`, data, {
          headers: {
            'Authorization': token,
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          },
          body: {
            typeName
          }
        }
      )
      .then(res => {
        dispatch(addAreaTypeSuccess(res.data));
      })
      .catch(err => {
        dispatch(addAreaTypeFailure(err.message));
      });

  };
}

export function addAreaTypeStarted(typeName) {
  return {
    type: POST_AREATYPE_STARTED,
    payload: {
      name: typeName
    }
  }
}

export function addAreaTypeSuccess(data) {
  return {
    type: POST_AREATYPE_SUCCESS,
    payload: {
      addedArea: data
    }
  }
}

export function addAreaTypeFailure(message) {
  return {
    type: POST_AREATYPE_FAILURE,
    payload: {
      error: message
    }
  }
}
