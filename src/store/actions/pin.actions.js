import { pinConstants } from "../constants";
import { pinService } from "../services";

export const pinActions = {
  addPin,
  deletePin,
  addPinToBoard,
  deletePinFromBoard
};

function addPin(name, description, img, Link, id, dispatch, user) {
  let pinParams = {
    name,
    description,
    img,
    Link,
    id
  };
  pinService.addPin(name, description, img, Link, id, user).then(
    response => {
      dispatch(addPinSuccess(response));
      // debugger
      // let pinAddress = "/pin/" + response.id;
      // let user = JSON.parse(localStorage.getItem("user"));
      // debugger

      // let pinAddress = "/profile/" + user.username;
      // history.push(pinAddress);
    },
    error => {
      dispatch(addPinFailure(error));
    }
  );
  return addPinRequest(pinParams);
}

export function addPinRequest(tmp) {
  return {
    type: pinConstants.ADD_PIN_REQUEST,
    payload: {
      tmp
    }
  };
}

export function addPinSuccess(payload) {
  return {
    type: pinConstants.ADD_PIN_SUCCESS,
    payload
  };
}

export function addPinFailure(error) {
  return {
    type: pinConstants.ADD_PIN_FAILURE,
    payload: error
  };
}

function deletePin(name) {
  return function(dispatch) {
    let pinParams = {
      name
    };
    dispatch(deletePinRequest(pinParams));
    return pinService.deletePin(name).then(
      response => {
        dispatch(deletePinSuccess(response));
      },
      error => {
        dispatch(deletePinFailure(error));
      }
    );
  };
}

export function deletePinRequest(tmp) {
  return {
    type: pinConstants.DELETE_PIN_REQUEST,
    payload: {
      tmp
    }
  };
}

export function deletePinSuccess(payload) {
  return {
    type: pinConstants.DELETE_PIN_SUCCESS,
    payload
  };
}

export function deletePinFailure(error) {
  return {
    type: pinConstants.DELETE_PIN_FAILURE,
    payload: error
  };
}

function addPinToBoard(pinId, boardId) {
  return function(dispatch) {
    let pinParams = {
      pinId,
      boardId
    };
    dispatch(addPinToBoardRequest(pinParams));
    return pinService.addPinToBoard(pinId, boardId).then(
      response => {
        dispatch(addPinToBoardSuccess(response));
      },
      error => {
        dispatch(addPinToBoardFailure(error));
      }
    );
  };
}

export function addPinToBoardRequest(tmp) {
  return {
    type: pinConstants.ADD_PIN_TO_BOARD_REQUEST,
    payload: {
      tmp
    }
  };
}

export function addPinToBoardSuccess(payload) {
  return {
    type: pinConstants.ADD_PIN_TO_BOARD_SUCCESS,
    payload
  };
}

export function addPinToBoardFailure(error) {
  return {
    type: pinConstants.ADD_PIN_TO_BOARD_FAILURE,
    payload: error
  };
}

function deletePinFromBoard(pinId, boardId) {
  return function(dispatch) {
    let pinParams = {
      pinId,
      boardId
    };
    dispatch(deletePinFromBoardRequest(pinParams));
    return pinService.deletePinFromBoard(pinId, boardId).then(
      response => {
        dispatch(deletePinFromBoardSuccess(response));
      },
      error => {
        dispatch(deletePinFromBoardFailure(error));
      }
    );
  };
}

export function deletePinFromBoardRequest(tmp) {
  return {
    type: pinConstants.DELETE_PIN_FROM_BOARD_REQUEST,
    payload: {
      tmp
    }
  };
}

export function deletePinFromBoardSuccess(payload) {
  return {
    type: pinConstants.DELETE_PIN_FROM_BOARD_SUCCESS,
    payload
  };
}

export function deletePinFromBoardFailure(error) {
  return {
    type: pinConstants.DELETE_PIN_FROM_BOARD_FAILURE,
    payload: error
  };
}
