import {
  ADD_ROOM_INFO_FAILURE,
  ADD_ROOM_INFO_SUCCESS,
  ADD_ROOM_INFO_STARTED,
  ADD_ROOM_DATA,

} from './Actions'

const initialstate = {
  loading: false,
  error: null,
  room: []
};


export default function Reducers105(state = initialstate, action) {
  switch (action.type) {
    case ADD_ROOM_INFO_STARTED:
      return {
        ...state,
        loading: true,
        error: null,
        room: []
      };
    case ADD_ROOM_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        room: [...action.payload.room]
      };
    case ADD_ROOM_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        room: "ERROR: " + action.payload.error,
      };
    case ADD_ROOM_DATA:
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
