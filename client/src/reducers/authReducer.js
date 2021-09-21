import {
  USER_AUTH,
  USER_LOGOUT,
  SET_CLIENT_ID,
} from "../actions/actionVariables";

const initialState = {
  authData: null,
  clientID: "",
};
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case USER_AUTH:
      //console.log("In user auth - action data is - ", action.data);
      //set the local storage to user data
      localStorage.setItem(
        "generalUserProfile",
        JSON.stringify({ ...action?.data })
      );
      return { ...state, authData: action?.data };

    case USER_LOGOUT:
      //clear our store from auth
      //this will do that
      localStorage.setItem("generalUserProfile", null);

      return { ...state, authData: null };

    case SET_CLIENT_ID:
      return { ...state, clientID: action?.clientID };

    default:
      return state;
  }
}
