import React from 'react';
import ReactDOM from 'react-dom';
//Toma el css
import './App.css';
//Importa Form1 desde App.js
import App from './App';
//import Control from './control.js'

ReactDOM.render(
  //Trae la funcion desde el APP.js
    <App/>,
  document.getElementById('root')
);
