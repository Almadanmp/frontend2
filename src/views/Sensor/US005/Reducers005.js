import {
  POST_SENSOR_TYPE_STARTED,
  POST_SENSOR_TYPE_SUCCESS,
  POST_SENSOR_TYPE_FAILURE,
  POST_SENSOR_TYPE_DATA,


} from './Actions005'

const initialstate = {
  loading: false,
  error: null,
  listSensorTypes: []
};

export default function Reducers005(state = initialstate, action) {
  switch (action.type) {
    case POST_SENSOR_TYPE_STARTED:
      return {
        ...state,
        loading: true,
        error: null,
        listSensorTypes: []
      };
    case POST_SENSOR_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        listSensorTypes: [...action.payload.listSensorTypes]
      };
    case POST_SENSOR_TYPE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        listSensorTypes: "ERROR: " + action.payload.error
      };
    case POST_SENSOR_TYPE_DATA:
      return {
        ...state,
        loading: false,
        errorData: action.payload.error,
        listSensorTypes: "ERROR: " + action.payload.error
      };
    default:
      return state;
  }
}


