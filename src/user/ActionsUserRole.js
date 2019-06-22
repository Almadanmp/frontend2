import axios from 'axios';

export const FETCH_U_STARTED = 'FETCH_U_STARTED';
export const FETCH_U_SUCCESS = 'FETCH_U_SUCCESS';
export const FETCH_U_FAILURE = 'FETCH_U_FAILURE';


export function fetchUserRole() {
  const token = localStorage.getItem('loginToken');
  return dispatch => {
    dispatch(fetchUserRoleStarted()); // antes de fazer o get, coloca o loading a true
    axios
      .get(`https://smart-home-server-g2.herokuapp.com/loginWeb/getUserRole`, {
          headers: {
            'Authorization': token,
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          }
        }
      )
      .then(res => {
        localStorage.setItem("userRole", res.data)
        dispatch(fetchUserRoleSuccess(res.data)); // chegaram os resultados (dados) , loading fica a falso
      })
      .catch(err => {
          dispatch(fetchUserRoleFailure(err.message));
        }
      );
  };
}

export function fetchUserRoleStarted() {
  return {
    type: FETCH_U_STARTED
  }
}

export function fetchUserRoleSuccess(data) { // cria uma açao
  return {
    type: FETCH_U_SUCCESS,
    payload: {
      userRole: data //passa o array com os dados
    }
  }
}

export function fetchUserRoleFailure(message) {
  return {
    type: FETCH_U_FAILURE,
    payload: {
      error: message
    }
  }
}




