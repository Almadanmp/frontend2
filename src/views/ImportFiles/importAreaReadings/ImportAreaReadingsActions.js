import axios from "axios";

export const POST_FILE_STARTED = 'POST_FILE__STARTED';
export const POST_FILE_SUCCESS = 'POST_FILE__SUCCESS';
export const POST_FILE_FAILURE = 'POST_FILE__FAILURE';


export function uploadFile(fileToUpload) {
  const token = localStorage.getItem('loginToken');
  return dispatch => {
    dispatch(postFileStarted()); // antes de fazer o get, coloca o loading a true
    axios
       .post('https://smart-home-server-g2.herokuapp.com/import/importAreaReadings', fileToUpload, {
        headers: {
          'Authorization': token,
                "Access-Control-Allow-Credentials": true,
                 "Access-Control-Allow-Origin": "*",
          'Content-Type': 'multipart/form-data'
        },
        body: {
          fileToUpload
        }
      })
      .then(response => dispatch(postFileSuccess(response.data))

      )
      .catch(error => dispatch(postFileFailure(error.message.data))
      );
  }
}

export function postFileStarted() {
  return {
    type: POST_FILE_STARTED,
  }
}

export function postFileSuccess(data) { // cria uma açao
  return {
    type: POST_FILE_SUCCESS,
    payload: {
      importGAReadingsResults: data //passa o array com os dados
    }
  }
}

export function postFileFailure(message) {
  return {
    type: POST_FILE_FAILURE,
    payload: {
      error: message
    }
  }
}
