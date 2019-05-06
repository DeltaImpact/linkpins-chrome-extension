import { combineReducers } from "redux";

import { backgroundCounter, uiCounter } from "./counter.reducer";
import account from "./account.reducer";

const rootReducer = combineReducers({
  account,
  backgroundCounter,
  uiCounter
});
export default rootReducer;
