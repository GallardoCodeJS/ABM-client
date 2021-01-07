import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

//Toma función de otra pagina para mostrar
import CrearUsuario from './CreateUser.js';
import {ListarPersonas, ListarUsuarios} from './ListUser.js';
import Statistcs from './StatisticsUser.js';
import LoginUser from './LoginUser.js';

//Aca exporta el archivo con las rutas armadas
export default function BasicExample() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/Statistcs">Home</Link>
          </li>
          <li>
            <Link to="/CrearUsuario">Crear Persona</Link>
          </li>
          <li>
            <Link to="/ListarPersonas">Listado de persona</Link>
          </li>
          <li>
            <Link to="/ListarUsuarios">Listado de usuarios</Link>
          </li>
          <li>
            <Link to="/LoginUser">Login</Link>
          </li>
        </ul>
        <hr/>

        <Switch >
          <Route exact path="/Statistcs">
            <Statistcs />
          </Route>
          <Route path="/CrearUsuario">
            <CrearUsuario />
          </Route>
          <Route path="/ListarPersonas">
            <ListarPersonas />
          </Route>
          <Route path="/ListarUsuarios">
            <ListarUsuarios />
          </Route>
          <Route path="/LoginUser">
            <LoginUser />
          </Route>
        </Switch>
      </div>
    </Router>

  );
}