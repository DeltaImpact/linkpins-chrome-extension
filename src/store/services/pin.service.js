import { authHeader } from "./auth-header";
import { parseJSON, processErrorResponse } from "../../utils/misc";
import axios from "axios";
import config from "config";

export const pinService = {
  addPin,
  deletePin,
  addPinToBoard,
  deletePinFromBoard
};

function addPin(name, description, img, Link, BoardId, user) {
  // debugger
  return axios
    .post(
      `${config.apiUrl}/pin/addPin`,
      {
        Name: name,
        Description: description,
        Img: img,
        Link: Link,
        BoardId: BoardId
      },
      {
        headers: { Authorization: "Bearer " + user.token }
        // headers: {
        //   Authorization: authHeader()
        // }
      }
    )
    .then(parseJSON)
    .then(
      response => {
        return response;
      },
      error => {
        return Promise.reject(processErrorResponse(error));
      }
    );
}

function deletePin(id) {
  axios.defaults.headers.common["Authorization"] = authHeader();
  return axios
    .delete(`${config.apiUrl}/pin/deletePin`, { params: { pinId: id } })
    .then(parseJSON)
    .then(
      response => {
        window.location.reload();
        return response;
      },
      error => {
        return Promise.reject(processErrorResponse(error));
      }
    );
}

function addPinToBoard(pinId, boardId) {
  return axios
    .post(
      `${config.apiUrl}/pin/addPinToBoard`,
      { PinId: pinId, BoardId: boardId },
      {
        headers: { Authorization: authHeader() }
      }
    )
    .then(parseJSON)
    .then(
      user => {
        return user;
      },
      error => {
        return Promise.reject(processErrorResponse(error));
      }
    );
}

function deletePinFromBoard(pinId, boardId) {
  return axios({
    url: `${config.apiUrl}/pin/deletePinFromBoard`,
    method: "delete",
    data: { PinId: pinId, BoardId: boardId },
    headers: { Authorization: authHeader() }
  })
    .then(parseJSON)
    .then(
      user => {
        return user;
      },
      error => {
        return Promise.reject(processErrorResponse(error));
      }
    );
}
