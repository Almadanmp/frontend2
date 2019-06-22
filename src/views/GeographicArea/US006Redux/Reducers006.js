import {
  ADD_AREA_SENSOR_STARTED,
  ADD_AREA_SENSOR_SUCCESS,
  ADD_AREA_SENSOR_FAILURE,

} from './Actions006'

const initialstate = {
  loading: false,
  error: null,
  addedSensor: []
};

export default function Reducers006(state = initialstate, action) {
  switch (action.type) {
    case ADD_AREA_SENSOR_STARTED:
      return {
        ...state,
        loading: true,
        error: null,
        addedSensor: []
      };
    case ADD_AREA_SENSOR_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        addedSensor: [action.payload.addedSensor]
      };
    case ADD_AREA_SENSOR_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        addedSensor: "ERROR: " + action.payload.error
      };

    default:
      return state;
  }
}
