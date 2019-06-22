import {
  FETCH_HOT_STARTED,
  FETCH_HOT_SUCCESS,
  FETCH_HOT_FAILURE,

} from './Actions631'


const initialstate = {
  loading: false,
  errorHot: null,
  hottestDay: {}
};


export default function Reducers631(state = initialstate, action) {
  switch (action.type) {
    case FETCH_HOT_STARTED:
      return {
        ...state,
        loading: true,
        errorHot: null,
        hottestDay: {}
      };
    case FETCH_HOT_SUCCESS:
      return {
        ...state,
        loading: false,
        errorHot: null,
        hottestDay: {...action.payload.hottestDay}
      };
    case FETCH_HOT_FAILURE:
      return {
        ...state,
        loading: false,
        errorHot: action.payload.error,
        hottestDay: " ERROR: NO DATA Available"
      };

    default:
      return state;
  }
}


