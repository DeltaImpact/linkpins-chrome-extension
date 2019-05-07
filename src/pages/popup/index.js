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
    "css/common.css"
  ];

  stylesFiles.forEach(element => {
    let stylesheet = document.createElement("link");
    stylesheet.setAttribute("type", "text/css");
    stylesheet.setAttribute("rel", "stylesheet");
    stylesheet.setAttribute("href", element);
    stylesheet.setAttribute("media", "screen,projection");
    document.head.appendChild(stylesheet);
    // console.log(JSON.stringify(element));
  });

  const mountNode = document.createElement("div");
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
