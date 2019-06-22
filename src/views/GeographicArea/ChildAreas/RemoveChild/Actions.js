import axios from 'axios';

export const REMOVE_CHILD_AREA_STARTED = 'REMOVE_CHILD_AREA_STARTED';
export const REMOVE_CHILD_AREA_SUCCESS = 'REMOVE_CHILD_AREA_SUCCESS';
export const REMOVE_CHILD_AREA_FAILURE = 'REMOVE_CHILD_AREA_FAILURE';


export function removeChildFromArea ({link}){
  const token = localStorage.getItem('loginToken');
  console.log(link)
  return dispatch => {
    dispatch(fetchChildLink(link));
    const data = {link};
    axios
      .put(link, data,
        {
          headers: {
            'Authorization': token,
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          }
        })
      .then(res => {
        dispatch(fetchChildRemoveSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchChildRemoveFailure(err.message));
      });
  };
};


export function fetchChildLink(link) {
  return {
    type: REMOVE_CHILD_AREA_STARTED,
    payload: {
      link: link,
    }
  }
}

export function fetchChildRemoveSuccess(data) {
  return {
    type: REMOVE_CHILD_AREA_SUCCESS,
    payload: {
      message: data,
    }
  }
}

export function fetchChildRemoveFailure(message) {
  return {
    type: REMOVE_CHILD_AREA_FAILURE,
    payload: {
      error: message
    }
  }
}
