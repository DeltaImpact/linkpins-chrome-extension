import { createReducer } from "../../utils/misc";

const reducerInitialState = {
  boards: [],
  board: null,
  statusText: null,
  loading: null,
  getAllBoardsError: null,
  getAllBoardsLoading: null,
  getBoard: null,
  getBoardError: null,
  getBoardLoading: null,
  AddBoardError: null,
  AddBoardLoading: null,
  deleteBoardError: null,
  deleteBoardLoading: null,
  updateBoardLoading: null,
  updateBoardId: null,
  updateBoardError: null,
  getBoardPins: null,
  getBoardPinsError: null,
  getBoardPinsLoading: null,
};

export default createReducer(reducerInitialState, {
    GETALL_BOARD_REQUEST: state =>
    Object.assign({}, state, {
      getAllBoardsLoading: true,
      statusText: null,
      getAllBoardsError: null
    }),
  GETALL_BOARD_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      getAllBoardsLoading: false,
      boards: payload
    }),
  GETALL_BOARD_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      statusText: payload.statusText,
      getAllBoardsLoading: false,
      boards: null,
      getAllBoardsError: payload
    })
});
