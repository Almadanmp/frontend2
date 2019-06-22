import {
  FETCH_RAINFALL_STARTED,
  FETCH_RAINFALL_SUCCESS,
  FETCH_RAINFALL_FAILURE,

} from './Actions623'


const initialstate = {
  loading: false,
  error: null,
  rainfall: {}
};


export default function Reducers623(state = initialstate, action) {
  switch (action.type) {
    case FETCH_RAINFALL_STARTED:
      return {
        ...state,
        loading: true,
        errorRainfall: null,
        rainfall: {}
      };
    case FETCH_RAINFALL_SUCCESS:
      return {
        ...state,
        loading: false,
        errorRainfall: null,
        rainfall: {...action.payload.rainfall}
      };
    case FETCH_RAINFALL_FAILURE:
      return {
        ...state,
        loading: false,
        errorRainfall: action.payload.error,
        rainfall: " ERROR: NO DATA Available"
      };

    default:
      return state;
  }
}


