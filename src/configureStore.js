import { createStore, applyMiddleware } from 'redux/index';
import thunk from 'redux-thunk';
import combineReducers from "./reducers.js";

export default function configureStore() {
  return createStore(
    combineReducers,
    applyMiddleware(thunk));
}
