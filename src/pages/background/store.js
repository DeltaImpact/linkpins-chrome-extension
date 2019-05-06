// import { createStore } from "redux";
import { createBackgroundStore } from "redux-webext";
// import {INCREMENT_UI_COUNTER, DECREMENT_UI_COUNTER} from '../constants';
// import reducer from './reducers';
import { incrementUICounter, decrementUICounter } from "./actions";

// const countersStore = createStore(reducer);

// export default createBackgroundStore({
//     store: countersStore,
//     actions: {
//         INCREMENT_UI_COUNTER: incrementUICounter,
//         DECREMENT_UI_COUNTER: decrementUICounter
//     }
// });
//////////////////////////////////////////////////////////////////////
import { createLogger } from "redux-logger";
import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";

import { authActions } from "../actions";
import rootReducer from "../reducers";
import { userConstants } from "../constants/user.constants";

const loggerMiddleware = createLogger();

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);
export const combinedStore = createStore(rootReducer, enhancer);

export default createBackgroundStore({
  store: combinedStore,
  actions: {
    LOGIN_USER_REQUEST: authActions.login,
    LOGOUT_USER: authActions.logout,
    INCREMENT_UI_COUNTER: incrementUICounter,
    DECREMENT_UI_COUNTER: decrementUICounter
  }
});
