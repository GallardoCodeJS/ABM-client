import React from 'react';
import ReactDOM from 'react-dom';

//Toma el css
import './Style/App.css';
import './Style/Head.css';

import App from './App';

ReactDOM.render(
  //Trae la funcion desde el APP.js
    <App/>,
  document.getElementById('root')
);
