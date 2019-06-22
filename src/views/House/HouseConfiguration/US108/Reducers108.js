import {
  FETCH_ROOMS_STARTED,
  FETCH_ROOMS_SUCCESS,
  FETCH_ROOMS_FAILURE,

} from './Actions108'

const initialstate = {
  loading: false,
  error: null,
  rooms: []
};

export default function Reducer108(state = initialstate, action) {
  switch (action.type) {
    case FETCH_ROOMS_STARTED:
      return {
        ...state,
        loading: true,
        error: null,
        rooms: []
      };
    case FETCH_ROOMS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        rooms: [...action.payload.rooms]
      };
    case FETCH_ROOMS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        rooms: []
      };

    default:
      return state;
  }
}


