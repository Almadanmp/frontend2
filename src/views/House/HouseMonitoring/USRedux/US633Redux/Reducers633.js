import {
  FETCH_AMP_STARTED,
  FETCH_AMP_SUCCESS,
  FETCH_AMP_FAILURE,

} from './Actions633'


const initialstate = {
  loading: false,
  error: null,
  amplitude: {}
};


export default function Reducers633(state = initialstate, action) {
  switch (action.type) {
    case FETCH_AMP_STARTED:
      return {
        ...state,
        loading: true,
        errorAmplitude: null,
        amplitude: {}
      };
    case FETCH_AMP_SUCCESS:
      return {
        ...state,
        loading: false,
        errorAmplitude: null,
        amplitude: {...action.payload.amplitude}
      };
    case FETCH_AMP_FAILURE:
      return {
        ...state,
        loading: false,
        errorAmplitude: action.payload.error,
        amplitude: " ERROR: NO DATA Available"
      };

    default:
      return state;
  }
}


