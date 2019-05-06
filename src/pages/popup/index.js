import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./app";

import { createUIStore } from "redux-webext";
import {Store} from 'webext-redux';

async function initApp() {
  const store = await createUIStore();
  const store = new Store();

  const mountNode = document.createElement("div");
  document.body.appendChild(mountNode);

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    mountNode
  );
}

initApp();
