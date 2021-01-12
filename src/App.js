import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";


//Toma función de otra pagina para mostrar
import CrearPersona from './CreatePerson.js';
import ListarPersonas from './ListPerson.js';
import ListarUsuarios from  './ListUser.js';
import Statistcs from './StatisticsUser.js';
import LoginUser from './LoginUser.js';
import Userprofile from './Userprofile.js';
import CreateUser from './CreateUser.js';

//Aca exporta el archivo con las rutas armadas
export default function BasicExample() {
  
  //Guarada historial de paginas
  const history = useHistory();

  return (
    <Router history={history}>
      <div>
        <ul>
          <li>
            <Link to="/Statistcs">Home</Link>
          </li>
          <li>
            <Link to="/CrearPersona">Crear Persona</Link>
          </li>
          <li>
            <Link to="/CreateUser">Crear Usuario</Link>
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
        <hr />

        <Switch >
          <Route exact path="/Statistcs">
            <Statistcs />
          </Route>
          <Route path="/CrearPersona">
            <CrearPersona />
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
          <Route path="/Userprofile">
            <Userprofile />
          </Route>
          <Route path="/CreateUser">
            <CreateUser />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}