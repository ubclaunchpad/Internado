import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from '../views/Navbar.js';

it('renders correctly', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Navbar />, div);
  ReactDOM.unmountComponentAtNode(div);
});