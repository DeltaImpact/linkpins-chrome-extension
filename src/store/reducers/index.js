import { combineReducers } from "redux";

import { backgroundCounter, uiCounter } from "./counter.reducer";
import account from "./account.reducer";
import parse from "./parse.reducer";
import board from "./board.reducer";
import pin from "./pin.reducer";

const rootReducer = combineReducers({
  account,
  parse,
  board,
  pin,
  backgroundCounter,
  uiCounter
});

export default rootReducer;
