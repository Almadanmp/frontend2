import {
  FETCH_ROOMS_NOT_IN_GRID_STARTED,
  FETCH_ROOMS_NOT_IN_GRID_SUCCESS,
  FETCH_ROOMS_NOT_IN_GRID_FAILURE,

} from './ActionsGetRoomsNotInGrid'
import {FETCH_NO_DATA} from "./ActionsGetRoomsNotInGrid";


const initialstate = {
  loading: false,
  error: null,
  roomsNotInGrid: []
};


export default function ReducersGetRoomsNotInGrid(state = initialstate, action) {
  switch (action.type) {
    case FETCH_ROOMS_NOT_IN_GRID_STARTED:
      return {
        ...state,
        loading: true,
        error: null,
        roomsNotInGrid: []
      };
    case FETCH_ROOMS_NOT_IN_GRID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        roomsNotInGrid: [... action.payload.roomsNotInGrid]
      };
    case FETCH_ROOMS_NOT_IN_GRID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        roomsNotInGrid: []
      };
    case FETCH_NO_DATA:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        roomsNotInGrid: "ERROR: " + action.payload.error
      };
    default:
      return state;
  }
}


