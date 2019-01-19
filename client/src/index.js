import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from 'react-dom';
import './sass/index.scss';
import App from './App';
import 'semantic-ui-css/semantic.min.css'

ReactDOM.render(
    <Router>
      <App />
    </Router>,
  document.getElementById('root')
);
