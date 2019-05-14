import { createReducer } from "../utils/misc";
import {
  ADD_PIN_REQUEST,
  ADD_PIN_SUCCESS,
  ADD_PIN_FAILURE,
  DELETE_PIN_REQUEST,
  DELETE_PIN_SUCCESS,
  DELETE_PIN_FAILURE,
  ADD_PIN_TO_BOARD_REQUEST,
  ADD_PIN_TO_BOARD_SUCCESS,
  ADD_PIN_TO_BOARD_FAILURE,
  DELETE_PIN_FROM_BOARD_REQUEST,
  DELETE_PIN_FROM_BOARD_SUCCESS,
  DELETE_PIN_FROM_BOARD_FAILURE,
} from "../constants/pin.constants";

const reducerInitialState = {
  pin: null,
  getPinLoading: null,
  AddPinError: null,
  AddPinLoading: null,
  AddPinRedirectTo: null,
  deletePinError: null,
  deletePinLoading: null,
  AddPinToBoardLoading: null,
  AddPinToBoard: null,
  AddPinToBoardError: null,
  DeletePinFromBoardLoading: null,
  DeletePinFromBoard: null,
  DeletePinFromBoardError: null,
  GetPinAvaliableBoards: null,
};

export default createReducer(reducerInitialState, {
  ADD_PIN_REQUEST: (state, payload) =>
    Object.assign({}, state, {
      AddPinLoading: true,
      AddPinRedirectTo: null,
      AddPinError: payload
    }),
  ADD_PIN_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      AddPinLoading: false,
      AddPinRedirectTo: payload.id
    }),
  ADD_PIN_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      AddPinLoading: false,
      pin: null,
      AddPinError: payload
    }),
  DELETE_PIN_REQUEST: (state, payload) =>
    Object.assign({}, state, {
      deletePinLoading: true,
      deletePinError: true
    }),
  DELETE_PIN_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      deletePinLoading: false,
      pin: payload
    }),
  DELETE_PIN_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      deletePinLoading: false,
      pin: null,
      deletePinError: payload
    }),
  ADD_PIN_TO_BOARD_REQUEST: state =>
    Object.assign({}, state, {
      AddPinToBoardLoading: true,
      AddPinToBoardError: null
    }),
  ADD_PIN_TO_BOARD_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      AddPinToBoardLoading: false,
      GetPinBoards: [...state.GetPinBoards, payload],
      GetPinAvaliableBoards: state.GetPinAvaliableBoards.filter(
        t => t.id != payload.id
      )
    }),
  ADD_PIN_TO_BOARD_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      AddPinToBoardLoading: false,
      AddPinToBoard: null,
      AddPinToBoardError: payload
    }),
  DELETE_PIN_FROM_BOARD_REQUEST: state =>
    Object.assign({}, state, {
      DeletePinFromBoardLoading: true,
      DeletePinFromBoardError: null
    }),
  DELETE_PIN_FROM_BOARD_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      DeletePinFromBoardLoading: false,
      GetPinAvaliableBoards: [...state.GetPinAvaliableBoards, payload],
      GetPinBoards: state.GetPinBoards.filter(t => t.id != payload.id)
    }),
  DELETE_PIN_FROM_BOARD_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      DeletePinFromBoardLoading: false,
      DeletePinFromBoard: null,
      DeletePinFromBoardError: payload
    })
});
