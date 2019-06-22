import {
  FETCH_SENSOR_TYPES_STARTED,
  FETCH_SENSOR_TYPES_SUCCESS,
  FETCH_SENSOR_TYPES_FAILURE,

} from './Actions005extra'

const initialstate = {
  loading: false,
  error: null,
  listSensorTypes: []
};

export default function Reducer005extra(state = initialstate, action) {
  switch (action.type) {
    case FETCH_SENSOR_TYPES_STARTED:
      return {
        ...state,
        loading: true,
        error: null,
        listSensorTypes: []
      };
    case FETCH_SENSOR_TYPES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        listSensorTypes: [...action.payload.listSensorTypes]
      };
    case FETCH_SENSOR_TYPES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        listSensorTypes: " ERROR: NO DATA Available"
      };

    default:
      return state;
  }
}


