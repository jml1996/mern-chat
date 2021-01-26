import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducer from "./reducers";
import logger from "redux-logger";

const store = createStore(reducer, applyMiddleware(thunk, logger));
// const rootElement = document.getElementById("root");


// Add this in your component file
// require('react-dom');
// window.React2 = require('react');
// console.log(window.React1 === window.React2);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// Sources:
// https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-in/SignIn.js
// https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-up/SignUp.js
// https://dev.to/armelpingault/how-to-create-a-simple-and-beautiful-chat-with-mongodb-express-react-and-node-js-mern-stack-29l6
// https://developer.mongodb.com/how-to/use-atlas-on-heroku