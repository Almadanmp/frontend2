import {
  FETCH_RAINFALL_STARTED,
  FETCH_RAINFALL_SUCCESS,
  FETCH_RAINFALL_FAILURE,

} from './Actions620'
import {FETCH_NO_DATA} from "../US600Redux/Actions600";


const initialstate = {
  loading: false,
  error: null,
  totalRainfall: 0
};


export default function Reducers620(state = initialstate, action) {
  switch (action.type) {
    case FETCH_RAINFALL_STARTED:
      return {
        ...state,
        loading: true,
        error: null,
        totalRainfall: 0
      };
    case FETCH_RAINFALL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        totalRainfall: action.payload.totalRainfall
      };
    case FETCH_RAINFALL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        totalRainfall: 0
      };
    case FETCH_NO_DATA:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        totalRainfall: "ERROR: " + action.payload.error
      };
    default:
      return state;
  }
}


