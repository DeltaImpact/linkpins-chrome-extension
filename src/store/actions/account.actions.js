import { userConstants } from "../constants";
import { authService } from "../services";

export const authActions = {
  login,
  logout,
};

function login(email, password) {
  debugger
  return function(dispatch) {
    let user = {
      email: email,
      password: password
    };
  debugger

    dispatch(loginUserRequest(user));
    return authService.login(email, password).then(
      user => {
        dispatch(loginUserSuccess(user));
        // history.push("/");
      },
      error => {
        dispatch(loginUserFailure(error));
      }
    );
  };
}

export function loginUserRequest(user) {
  return {
    type: userConstants.LOGIN_USER_REQUEST,
    payload: {
      user
    }
  };
}

export function loginUserSuccess(user) {
  return {
    type: userConstants.LOGIN_USER_SUCCESS,
    payload: user
  };
}

export function loginUserFailure(error) {
  return {
    type: userConstants.LOGIN_USER_FAILURE,
    payload: error,
    error
  };
}

function logout() {
  return dispatch => {
    dispatch(logoutUserExecution());
    authService.logout();
    // window.location.reload();
  };
}

export function logoutUserExecution() {
  return {
    type: userConstants.LOGOUT_USER
  };
}