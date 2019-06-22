import {
  FETCH_LOCATION_STARTED,
  FETCH_LOCATION_SUCCESS,
  FETCH_LOCATION_FAILURE,

} from './ActionsUS101'

const initialstate = {
  loading: false,
  error: null,
  location: []
};

export default function Reducers101(state = initialstate, action) {
  switch (action.type) {
    case FETCH_LOCATION_STARTED:
      return {
        ...state,
        loading: true,
        error: null,
        location: []
      };
    case FETCH_LOCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        location: [action.payload.location]
      };
    case FETCH_LOCATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        location: "ERROR: " + action.payload.error
      };

    default:
      return state;
  }
}


