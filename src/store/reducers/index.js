import { combineReducers } from "redux";

import { backgroundCounter, uiCounter } from "./counter.reducer";

const rootReducer = combineReducers({
  backgroundCounter,
  uiCounter
});
export default rootReducer;
