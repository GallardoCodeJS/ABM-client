import React, { useEffect, useState } from 'react';
import Axios from 'axios';

function LoginUser() {

    //Crea los estados
    const [id, setid] = useState("");
    const [user, setuser] = useState("");
    const [pass, setpass] = useState("");

    //Session actives
    Axios.defaults.withCredentials = true;

    //Axios use HERE to sent info
    const submitLogin = () => {
        Axios.post('http://localhost:3001/api/login', {
            id: id,
            user: user,
            pass: pass
        }).then(() => {
            alert("El usuario existe!");
        });
    };

    //Take te seession from the server
    useEffect(() => {
        Axios.get("http://localhost:3001/api/login").then((response) => {
            console.log(response);
        })
    }, [])

    return (
        <div className="form">
            <h1>Login</h1>

            <label>User ID:</label>
            <input type="number" name="id"
                onChange={(e) => {
                    setid(e.target.value);
                }} />

            <label>User:</label>
            <input type="text" name="user"
                onChange={(e) => {
                    setuser(e.target.value);
                }} />
            <label>Password:</label>
            <input type="password" name="pass"
                onChange={(e) => {
                    setpass(e.target.value);
                }} />
            <button onClick={submitLogin}>Ingresar</button>
        </div>
    );
}

export default LoginUser;