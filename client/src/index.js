import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import { Provider } from 'react-redux'

ReactDOM.render(
  //<Provider store={configureStore()}>
    <Router>
      <App />
    </Router>,
  //</Provider>,
  document.getElementById('root')
);
