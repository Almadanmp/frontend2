import {
  FETCH_ROOM_GRID_INFO_STARTED,
  FETCH_ROOM_GRID_INFO_SUCCESS,
  FETCH_ROOM_GRID_INFO_FAILURE, FETCH_NO_ROOM_GRID_DATA,

} from './Actions'

const initialstate = {
  loading: false,
  error: null,
  room: []
};


export default function Reducers600 (state = initialstate, action) {
  switch (action.type) {
    case FETCH_ROOM_GRID_INFO_STARTED:
      return {
        ...state,
        loading: true,
        error: null,
        room: []
      };
    case FETCH_ROOM_GRID_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        room: [...action.payload.room]
      };
    case FETCH_ROOM_GRID_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        room: "ERROR: " + action.payload.error,
      };
    case FETCH_NO_ROOM_GRID_DATA:
      return {
        ...state,
        loading: false,
        errorData: action.payload.error,
        room: "ERROR: " + action.payload.error
      };
    default:
      return state;
  }
}
