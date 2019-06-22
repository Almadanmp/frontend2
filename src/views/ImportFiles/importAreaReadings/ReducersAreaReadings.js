import {POST_FILE_FAILURE, POST_FILE_STARTED, POST_FILE_SUCCESS} from "./ImportAreaReadingsActions";

const initialState = {
  loading: false,
  error: null,
  importGAReadingsResults: null,
};


export default function ReducersAreaReadings(state = initialState, action) {
  switch (action.type) {
    case POST_FILE_STARTED:
      return {
        ...state,
        loading: true,
        error: null,
        importGAReadingsResults: null,
      };
    case POST_FILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        importGAReadingsResults: action.payload.importGAReadingsResults,
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
