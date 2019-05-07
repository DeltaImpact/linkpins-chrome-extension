import axios from "axios";

import { parseJSON, processErrorResponse } from "../../utils/misc";
import config from "config";

export const authService = {
  login,
  logout
};

function login(email, password) {
  return axios
    .post(`${config.apiUrl}/account/token`, {
      Email: email,
      Password: password
    })
    .then(parseJSON)
    .then(
      response => {
        if (response.token) {
          let user = {
            username: response.userName,
            email: response.email,
            token: response.token
          };
          chrome.storage.sync.set({ user: user }, function() {
            console.log(type + " value is set to " + value);
          });
          // localStorage.setItem("user", JSON.stringify(user));
          return user;
        }
        return error;
      },
      error => {
        return Promise.reject(processErrorResponse(error));
      }
    );
}

function logout() {
  chrome.storage.sync.remove("user");
}
