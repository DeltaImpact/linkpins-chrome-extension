import { createBackgroundStore } from "redux-webext";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

// import {
//   INCREMENT_UI_COUNTER,
//   DECREMENT_UI_COUNTER
// } from "../../store/constants/constants";
import rootReducer from "./reducers";
import {
  incrementUICounter,
  decrementUICounter
} from "./actions/background/actions";

// import logger from "redux-logger";
function logger({ getState }) {
  return next => action => {
    console.log("will dispatch", action);

    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action);

    console.log("state after dispatch", getState());

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue;
  };
}

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, logger));

const store = createStore(rootReducer, applyMiddleware(logger));
// const store = createStore(rootReducer, enhancer);


// Apply middleware to proxy store
const middleware = [logger];
const storeWithMiddleware = applyMiddleware(store, ...middleware);

import {wrapStore} from 'webext-redux';

// const enhancer = composeEnhancers(
//     applyMiddleware(thunkMiddleware,
//         loggerMiddleware),
// );

export default wrapStore(createStore(rootReducer));
