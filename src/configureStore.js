import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import combineReducers from  "./reducers.js";

export default function configureStore() {
  return createStore(
    combineReducers,
    applyMiddleware(thunk));
}
