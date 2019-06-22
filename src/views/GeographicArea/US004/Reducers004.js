import {
  FETCH_GABTS_STARTED,
  FETCH_GABTS_SUCCESS,
  FETCH_GABTS_FAILURE,

} from './Actions004'

const initialstate = {
  loading: false,
  error: null,
  areas: []
};

export default function Reducer004(state = initialstate, action) {
  switch (action.type) {
    case FETCH_GABTS_STARTED:
      return {
        ...state,
        loading: true,
        error: null,
        areas: []
      };
    case FETCH_GABTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        areas: [...action.payload.areas]
      };
    case FETCH_GABTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        areas: " ERROR: NO DATA Available"
      };

    default:
      return state;
  }
}


