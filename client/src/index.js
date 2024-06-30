/*eslint-disable*/
import React from "react";
import ReactDOM from "react-dom";

//redux
import { Provider } from 'react-redux';;
import App from './App';

//redux
import store from "./redux/store";


import "assets/css/material-dashboard-react.css?v=1.10.0";

ReactDOM.render(
  <Provider store={store}>
      <App />

  </Provider>,
  document.getElementById('root'),
);
