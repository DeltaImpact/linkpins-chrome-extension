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

import logger from "redux-logger";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, logger));

// const store = createStore(rootReducer, enhancer);
// const store = createStore(rootReducer, enhancer);
import {wrapStore} from 'webext-redux';
export default wrapStore(createStore(rootReducer, enhancer));

// export default createBackgroundStore({
//   store,
//   actions: {
//     INCREMENT_UI_COUNTER: incrementUICounter,
//     DECREMENT_UI_COUNTER: decrementUICounter
//   }
// });
