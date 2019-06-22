import {
  FETCH_MOTHERCHILD_STARTED,
  FETCH_MOTHERCHILD_SUCCESS,
  FETCH_MOTHERCHILD_FAILURE,

} from './Actions007'

const initialstate = {
  loading: false,
  error: null,
  added: []
};

export default function Reducers007(state = initialstate, action) {
  switch (action.type) {
    case FETCH_MOTHERCHILD_STARTED:
      return {
        ...state,
        loading: true,
        error: null,
        added: []
      };
    case FETCH_MOTHERCHILD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        added: [action.payload.added]
      };
    case FETCH_MOTHERCHILD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        added: "ERROR: " + action.payload.error
      };

    default:
      return state;
  }
}


