import {FETCH_U_FAILURE, FETCH_U_STARTED, FETCH_U_SUCCESS,} from './ActionsUserRole'

const initialState = {
  loading: false,
  error: null,
  userRole: null,
};


export default function ReducersUserRole(state = initialState, action) {
  switch (action.type) {
    case FETCH_U_STARTED:
      return {
        ...state,
        loading: true,
        error: null,
        userRole: null,
      };
    case FETCH_U_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        userRole: action.payload.userRole
      };
    case FETCH_U_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        userRole: "ERROR: NO Role Available"
      };
    default:
      return state;
  }
}
