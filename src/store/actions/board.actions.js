import { boardConstants } from "../constants";
import { boardService } from "../services";

export const boardActions = {
  getBoards
};

function getBoards(user, dispatch) {
  boardService.getBoards(user).then(
    response => {
      dispatch(getBoardsSuccess(response));
    },
    error => {
      dispatch(getBoardsFailure(error));
    }
  );
  return getBoardsRequest();
}

export function getBoardsRequest() {
  return {
    type: boardConstants.GETALL_BOARD_REQUEST
  };
}

export function getBoardsSuccess(payload) {
  return {
    type: boardConstants.GETALL_BOARD_SUCCESS,
    payload
  };
}

export function getBoardsFailure(error) {
  return {
    type: boardConstants.GETALL_BOARD_FAILURE,
    payload: error
  };
}
