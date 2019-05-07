import { authService } from "../services";
import { userConstants } from "../constants";
import store from "../store";

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

  // return function(dispatch) {
  //   let user = {
  //     email: email,
  //     password: password
  //   };
  //   dispatch(loginUserRequest(user));
  //   debugger
  //   store.dispatch(loginUserRequest(user));
  //   return authService.login(email, password).then(
  //     user => {
  //       store.dispatch(loginUserSuccess(user));
  //     },
  //     error => {
  //       store.dispatch(loginUserFailure(error));
  //     }
  //   );
  // };
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
    store.dispatch(logoutUserExecution());
    authService.logout();
    // window.location.reload();
  };
}

export function logoutUserExecution() {
  return {
    type: userConstants.LOGOUT_USER
  };
}
