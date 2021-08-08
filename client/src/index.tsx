import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./core/redux/store";
import reportWebVitals from "./core/reportWebVitals";
import configAxios from "./core/config/axios-config";
import Root from "./core/Root";

configAxios(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
