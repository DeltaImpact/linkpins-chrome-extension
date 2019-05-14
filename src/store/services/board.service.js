// import { authHeader } from "./auth-header";
import { parseJSON, processErrorResponse } from "../../utils/misc";
import axios from "axios";
import config from "config";

export const boardService = {
  getBoards
};

// let accountA;
// function mapStateToProps(state) {
//   const { parse, board, account } = state;
//   accountA = account;
//   return {
//     parse,
//     board,
//     account
//   };
// }

// const connectedNavMenuComponent = connect(mapStateToProps)({
//   addBoard,
//   deleteBoard,
//   updateBoard,
//   getBoards,
//   getBoard,
//   getBoardPins
// });
// export { connectedNavMenuComponent as boardService };

function getBoardPins(id) {
  return axios
    .get(
      `${config.apiUrl}/board/getBoardPins`,
      { boardId: id },
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

function addBoard(name, description, img, isPrivate) {
  return axios
    .post(
      `${config.apiUrl}/board/addBoard`,
      {
        Name: name,
        Description: description,
        Img: img,
        IsPrivate: isPrivate
      },
      {
        headers: {
          Authorization: authHeader()
        }
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

function getBoards(user) {
  let requestUrl = `${config.apiUrl}/board/getBoards`;
  return axios
    .get(requestUrl, {
      // .post("http://httpbin.org/post", {},  {
      headers: { Authorization: "Bearer " + user.token }
    })
    .then(parseJSON)
    .then(
      user => {
        // console.log(user)
        return user;
      },
      error => {
        return Promise.reject(processErrorResponse(error));
      }
    );
}

function getBoard(id) {
  return axios
    .get(
      `${config.apiUrl}/board/${id}`,
      // {},
      {
        // .post("http://httpbin.org/post", {},  {
        headers: { Authorization: authHeader() }
      }
    )
    .then(parseJSON)
    .then(
      user => {
        // console.log(user)

        return user;
      },
      error => {
        return Promise.reject(processErrorResponse(error));
      }
    );
}

function deleteBoard(Id) {
  return axios
    .post(
      `${config.apiUrl}/board/deleteBoard`,
      { Id: Id },
      {
        headers: {
          Authorization: authHeader()
        }
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

function updateBoard(id, name, description, isPrivate) {
  return axios
    .post(
      `${config.apiUrl}/board/updateBoard`,
      {
        Id: id,
        Name: name,
        Description: description,
        IsPrivate: isPrivate
      },
      {
        headers: {
          Authorization: authHeader()
        }
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
