import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import combineReducers from "../reducers/index";

let store;
export function configureStore() {
  store = createStore(combineReducers, applyMiddleware(thunk, logger));
  return store;
}
