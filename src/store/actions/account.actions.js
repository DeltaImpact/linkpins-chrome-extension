import { authService } from "../services";
import { userConstants } from "../constants";

export const authActions = {
  login,
  logout
};

function login(email, password, dispatch) {
  let user = {
    email: email,
    password: password
  };

  authService.login(email, password).then(
    user => {
      dispatch(loginUserSuccess(user));
    },
    error => {
      dispatch(loginUserFailure(error));
    }
  );

  return loginUserRequest(user);
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
  authService.logout();
  return logoutUserExecution();
}

export function logoutUserExecution() {
  return {
    type: userConstants.LOGOUT_USER
  };
}
