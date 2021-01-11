import React, { useEffect, useState } from 'react';
import  { Redirect } from 'react-router-dom'
import Axios from 'axios';

function LoginUser() {

    //Crea los estados
    const [id, setid] = useState("");
    const [pass, setpass] = useState("");
    const [loginStatus, setLoginStatus] = useState("");

    //Session actives
    Axios.defaults.withCredentials = true;

    //Axios use HERE to sent info
    const submitLogin = () => {
        Axios.post('http://localhost:3001/api/login', {
            id: id,
            pass: pass
        }).then((response) => {
            //alert("El usuario existe!");
            if (response.data.message) {
                setLoginStatus(response.data.message);
            } else {
                //alert("El usuario existe!");
                setLoginStatus(response.data[0].Name);
                return <Redirect to='/Userprofile'/>
            }
        });
    };

    //Take te seession from the server
    useEffect(() => {
        Axios.get("http://localhost:3001/api/login").then((response) => {
            console.log(response);
            //Pregunta si existe una session, de ser el caso la muestra
            if (response.data.loggedIn === true) {
                //Guarda la cookie en el explorador!
                setLoginStatus(response.data.user[0].Name);
            }
        });
    }, []);

    return (
        
        <div className="form">
            <h1>Login</h1>

            <label>User ID:</label>
            <input type="number" name="id"
                onChange={(e) => {
                    setid(e.target.value);
                }} />
            <label>Password:</label>
            <input type="password" name="pass"
                onChange={(e) => {
                    setpass(e.target.value);
                }} />
            <button onClick={submitLogin}>Ingresar</button>
            <p>{loginStatus}</p>
        </div>
    );
}

export default LoginUser;