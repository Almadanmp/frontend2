import {
  FETCH_SENSOR_INFO_STARTED,
  FETCH_SENSOR_INFO_SUCCESS,
  FETCH_SENSOR_INFO_FAILURE,

} from './Actions'

const initialstate = {
  loading: false,
  error: null,
  sensor: []
};


export default function Reducers600 (state = initialstate, action) {
  switch (action.type) {
    case FETCH_SENSOR_INFO_STARTED:
      return {
        ...state,
        loading: true,
        error: null,
        sensor: []
      };
    case FETCH_SENSOR_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        sensor: [...action.payload.room]
      };
    case FETCH_SENSOR_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        sensor: "ERROR: " + action.payload.error,
      };
    default:
      return state;
  }
}
