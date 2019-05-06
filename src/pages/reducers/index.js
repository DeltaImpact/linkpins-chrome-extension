import { combineReducers } from "redux";

import account from "./account.reducer";
import reducer from "../background/reducers";

const rootReducer = combineReducers({
  account,
  reducer
});
export default rootReducer;
