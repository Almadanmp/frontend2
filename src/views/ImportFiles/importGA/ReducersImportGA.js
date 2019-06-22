import {POST_FILE_FAILURE, POST_FILE_STARTED, POST_FILE_SUCCESS} from "./ImportGAActions";

const initialState = {
  loading: false,
  error: null,
  fileResults: null,
};


export default function ReducersImportGA(state = initialState, action) {
  switch (action.type) {
    case POST_FILE_STARTED:
      return {
        ...state,
        loading: true,
        error: null,
        fileResults: null,
      };
    case POST_FILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        fileResults: action.payload.fileResults,
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
