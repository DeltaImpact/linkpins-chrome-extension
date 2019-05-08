import { combineReducers } from "redux";

import { backgroundCounter, uiCounter } from "./counter.reducer";
import account from "./account.reducer";
import parse from "./parse.reducer";
import board from "./board.reducer";

const rootReducer = combineReducers({
  account,
  parse,
  board,
  backgroundCounter,
  uiCounter
});

export default rootReducer;
