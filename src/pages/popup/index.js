import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./app";

import { createUIStore } from "redux-webext";
import { Store } from "webext-redux";

async function initApp() {
  //   const store = await createUIStore();
  const store = new Store();

  let stylesFiles = [
    "css/materialize.min.css",
    "css/navmenu.css",
    "css/common.css",
    "css/parse.css",
  ];

  stylesFiles.forEach(element => {
    let stylesheet = document.createElement("link");
    stylesheet.setAttribute("type", "text/css");
    stylesheet.setAttribute("rel", "stylesheet");
    stylesheet.setAttribute("href", element);
    stylesheet.setAttribute("media", "screen,projection");
    document.head.appendChild(stylesheet);
  });

  let iconsFontLink = document.createElement("link");
  iconsFontLink.setAttribute(
    "href",
    "https://fonts.googleapis.com/icon?family=Material+Icons"
  );
  iconsFontLink.setAttribute("rel", "stylesheet");
  document.head.appendChild(iconsFontLink);

  const mountNode = document.createElement("div");
  mountNode.setAttribute("class", "app");
  document.body.appendChild(mountNode);

  const unsubscribe = store.subscribe(() => {
    unsubscribe(); // make sure to only fire once
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      mountNode
    );
  });
}

initApp();
