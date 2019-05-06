import { combineReducers } from "redux";

import account from "./account.reducer";
import reducer from "../../store/reducers/reducers";

const rootReducer = combineReducers({
  account,
  reducer
});
export default rootReducer;
