import {POST_FILE_FAILURE, POST_FILE_STARTED, POST_FILE_SUCCESS} from "./ImportHouseActions";

const initialState = {
  loading: false,
  error: null,
  houseResults: null,
};


export default function ReducersImportGA(state = initialState, action) {
  switch (action.type) {
    case POST_FILE_STARTED:
      return {
        ...state,
        loading: true,
        error: null,
        houseResults: null,
      };
    case POST_FILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        houseResults: action.payload.houseResults,
      };
    case POST_FILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}
