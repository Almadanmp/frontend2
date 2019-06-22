import {
  FETCH_COLD_STARTED,
  FETCH_COLD_SUCCESS,
  FETCH_COLD_FAILURE,

} from './Actions630'


const initialstate = {
  loading: false,
  errorCold: null,
  cold: {}
};


export default function Reducers630(state = initialstate, action) {
  switch (action.type) {
    case FETCH_COLD_STARTED:
      return {
        ...state,
        loading: true,
        errorCold: null,
        cold: {}
      };
    case FETCH_COLD_SUCCESS:
      return {
        ...state,
        loading: false,
        errorCold: null,
        cold: {...action.payload.cold}
      };
    case FETCH_COLD_FAILURE:
      return {
        ...state,
        loading: false,
        errorCold: action.payload.error,
        cold: " ERROR: NO DATA Available"
      };

    default:
      return state;
  }
}


