import axios from 'axios';

export const FETCH_MOTHERCHILD_STARTED = 'FETCH_MOTHERCHILD_STARTED';
export const FETCH_MOTHERCHILD_SUCCESS = 'FETCH_MOTHERCHILD_SUCCESS';
export const FETCH_MOTHERCHILD_FAILURE = 'FETCH_MOTHERCHILD_FAILURE';


export const fetchMotherChild = ({geographicAreaId, id}) => {
  const token = localStorage.getItem('loginToken');
  return dispatch => {
    dispatch(fetchMotherChildStarted(geographicAreaId, id));
    console.log(id)
    console.log(geographicAreaId)
    const data = {geographicAreaId, id};
    axios
      .put('https://smarthome-g2-server.herokuapp.com/geoAreas/' + geographicAreaId + '/' + id, data, {
          headers: {
            'Authorization': token,
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          },
          body:{areaChild:id},

        }
      )
      .then(res => {
        dispatch(fetchMotherChildSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchMotherChildFailure(err.message))
      })

  };
};

export function fetchMotherChildStarted(geographicAreaId, id) {
  return {
    type: FETCH_MOTHERCHILD_STARTED,
    payload: {
      geographicAreaId: geographicAreaId,
      areaChild: id
    }
  }
}

export function fetchMotherChildSuccess(data) {
  return {
    type: FETCH_MOTHERCHILD_SUCCESS,
    payload: {
      added: data
    }
  }
}

export function fetchMotherChildFailure(response) {
  return {
    type: FETCH_MOTHERCHILD_FAILURE,
    payload: {
      error: response
    }
  }
}



