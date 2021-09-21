import { combineReducers } from "redux";
import blogReducer from "./blogReducer";
import displayReducer from "./displayReducer";
import authReducer from "./authReducer";

export default combineReducers({
  blogs: blogReducer,
  display: displayReducer,
  auth: authReducer,
});
