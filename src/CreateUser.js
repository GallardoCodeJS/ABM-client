import React, { useState } from 'react';
import Axios from 'axios';

function CreateUser() {

    //error flag
    var flag = false;
    var msj = "";
    var msjname = "";
    var msjpass = "";

    //Const
    const [Name, setName] = useState("");
    const [Pass, setPass] = useState("");


    //Crear user
    const submiteUser = () => {
        //Control de Name
        if (Name.length < 5 || Name.length > 35) {
            msjname = "\r\n Nombre fuera de rango";
            flag = true;
        }
        //Control de Password
        if (Pass.length < 5 || Pass.length > 35) {
            msjpass = "\r\n Password no cumple";
            flag = true;
        }

        //Carga Msj de error
        if (msjname.length > 0 && msjpass.length > 0) {
            msj = msjname + msjpass;
        } else if (msjname.length > 0) {
            msj = msjname;
        } else if (msjpass.length > 0) {
            msj = msjname + msjpass;
        }
        //Envia el chequeo
        error(flag, msj);

        //Sino hay errores da el alta
        if (flag === false) {
            Axios.post("http://localhost:3001/api/usercreate", {
                Name: Name,
                Pass: Pass,
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
        }
    }

    return (
        <div className="App">
            <h1>Creando usuario</h1>
            <div className="form">
                <label>Name:</label>
                <input
                    required
                    placeholder="Name"
                    type="text"
                    name="Name"
                    value={Name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
                <label>Password:</label>
                <input
                    required
                    placeholder="Password"
                    type="password"
                    name="Pass"
                    value={Pass}
                    onChange={(e) => {
                        setPass(e.target.value);
                    }}
                />
                <span id="error" hidden={true} />
                <button type="submit" onClick={submiteUser}>Crear</button>
            </div>
        </div>
    );
}

export default CreateUser;