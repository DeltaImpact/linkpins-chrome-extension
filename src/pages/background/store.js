import { createBackgroundStore } from "redux-webext";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

// import {
//   INCREMENT_UI_COUNTER,
//   DECREMENT_UI_COUNTER
// } from "../../store/constants/constants";
import rootReducer from "../../store/reducers";
import {
  incrementUICounter,
  decrementUICounter
} from "../../store/actions/background/actions";

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

export default createBackgroundStore({
  store,
  actions: {
    INCREMENT_UI_COUNTER: incrementUICounter,
    DECREMENT_UI_COUNTER: decrementUICounter
  }
});
