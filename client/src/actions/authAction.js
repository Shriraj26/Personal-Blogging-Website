import {
  USER_LOGOUT,
  USER_AUTH,
  SET_CLIENT_ID,
} from "../actions/actionVariables";

export function authLogin(result, token) {
  return {
    type: USER_AUTH,
    data: { result, token },
  };
}

export function authLogout() {
  return {
    type: USER_LOGOUT,
  };
}

export function setClientID(clientID) {
  return {
    type: SET_CLIENT_ID,
    clientID: clientID,
  };
}
