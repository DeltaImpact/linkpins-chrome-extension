import { createReducer } from "../../utils/misc";

const reducerInitialState = {
  AddPinError: null,
  AddPinLoading: null,
  AddPinBoard: null
};

export default createReducer(reducerInitialState, {
  ADD_PIN_REQUEST: (state, payload) =>
    Object.assign({}, state, {
      AddPinLoading: true,
      AddPinBoard: null,
      AddPinError: payload
    }),
  ADD_PIN_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      AddPinLoading: false,
      AddPinBoard: payload
    }),
  ADD_PIN_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      AddPinLoading: false,
      pin: null,
      AddPinError: payload
    }),
  PARSE_PAGE_REQUEST: state =>
    Object.assign({}, state, {
      AddPinBoard: null
    })
});
