export function authHeader() {
  // return authorization header with jwt token
  chrome.storage.sync.get(["user"], result => {
    user = result.user || null;
    let user = result.user;
    if (user && user.token) {
      return "Bearer " + user.token;
    } else {
      return {};
    }
  });
}

export function authToken() {
  chrome.storage.sync.get(["user"], result => {
    user = result.user || null;
    if (user && user.token) {
      return user.token;
    } else {
      return undefined;
    }
  });
}

export function userNickname() {
  chrome.storage.sync.get(["user"], result => {
    user = result.user || null;
    if (user && user.username) {
      return user.username;
    } else {
      return undefined;
    }
  });
}
