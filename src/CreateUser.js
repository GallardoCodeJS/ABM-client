/* CREAR PERSONA */
import React, { useState } from 'react';
import Axios from 'axios';

//Funcion de formularios
function CrearUsuario() {
  var flag = false;
  var msj = "";
  //Crea los estados
  const [Ci, setCi] = useState("");
  const [Age, setAge] = useState("");
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");

  //Axios use HERE
  //CREA EL INSERT DE USUARIO
  const submiteData = () => {

    //Control de Name
    if (Name.length < 5 || Name.length > 35) {
      msj = "\r\n Nombre fuera de rango";
      flag = true;
    }

    //Control de Age
    if (Age < 0 || Age > 110) {
      //Pasa el dato con error
      msj = msj + "\r\n Edad fuera de rango";
      flag = true;
    }
    //Envia el chequeo
    error(flag, msj);


    //Sino detecta ningun error crea el usuario
    if (flag === false) {
      //Envia los datos al servidor
      Axios.post('http://localhost:3001/api/insert', {
        Ci: Ci,
        Age: Age,
        Name: Name,
        Email: Email,
      })      
    }
  };

  //Muesta error al no validar formulario
  const error = (flag, msj) => {
    //Toma el msj de error en <span>
    var errormsj = document.getElementById("error");
    errormsj.innerHTML = msj;
    if (flag === true) {
      errormsj.style.display = 'block';
    } else {
      errormsj.style.display = 'none';
      alert("Usuario creado correctamente!");
        //Limpia los imputs
        setName('');
        setAge('');
        setCi('');
        setEmail('');
    }
  }

  return (
    <div className="App">
      <h1>Crear Persona</h1>

      <div className="form">
        <label>C.I.:</label>
        <input
          type="number"
          name="Ci"
          value={Ci}
          onChange={(e) => {
            setCi(e.target.value);
          }} />

        <label>Age:</label>
        <input
          type="number"
          min="1"
          max="110"
          name="Age"
          value={Age}
          onChange={(e) => {
            setAge(e.target.value);
          }} />

        <label>Name:</label>
        <input type="text"
          name="Name"
          value={Name}
          onChange={(e) => {
            setName(e.target.value);
          }} />

        <label>Email:</label>
        <input type="email"
          name="Email"
          value={Email}
          onChange={(e) => {
            setEmail(e.target.value);
          }} />
        <span id="error" hidden={true} />

        <button onClick={submiteData}>Crear</button>

      </div>
    </div>
  );
}

//Exporta la clase
export default CrearUsuario;