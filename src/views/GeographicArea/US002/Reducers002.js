import {
  FETCH_GATS_STARTED,
  FETCH_GATS_SUCCESS,
  FETCH_GATS_FAILURE,

} from './Actions002'

const initialstate = {
  loading: false,
  error: null,
  listGATypes: []
};

export default function Reducer002(state = initialstate, action) {
  switch (action.type) {
    case FETCH_GATS_STARTED:
      return {
        ...state,
        loading: true,
        error: null,
        listGATypes: []
      };
    case FETCH_GATS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        listGATypes: [...action.payload.listGATypes]
      };
    case FETCH_GATS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        listGATypes: " ERROR: NO DATA Available"
      };

    default:
      return state;
  }
}


