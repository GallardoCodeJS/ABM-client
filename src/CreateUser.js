/* CREAR PERSONA */
import React, { useEffect,useState } from 'react';
import Axios from 'axios';

//Funcion de formularios
function CrearUsuario() {
    //Crea los estados
    const [Ci,      setCi]      = useState("");
    const [Age,     setAge]     = useState("");
    const [Name,    setName]    = useState("");
    const [Email,   setEmail]   = useState("");
    const [Listado, setListado] = useState([]); //Array
  
    useEffect(()=>{
      Axios.get('http://localhost:3001/api/get').then((response)=>{
        setListado(response.data)
      });
    },[]);
  
    //Axios use HERE
    //CREA EL INSERT DE USUARIO
    const submiteData = () => {
      Axios.post('http://localhost:3001/api/insert',{
        Ci:Ci,
        Age:Age,
        Name:Name,
        Email:Email,
      });  
    
    //Refresaca el get sin refrescar la pagina
    // (...Listado) ES un atributo de propagacion, para pasar el objeto de props completo.
    setListado([
      ...Listado,
        { Ci:Ci, Age:Age, Name:Name, Email:Email },
      ]);
    };
    
    return(    
      <div className="App">
        <h1>Crear Usuario</h1>
  
        <div className="form">
          <label>C.I.:</label>
          <input 
            type="number"
            name="Ci"
            onChange={(e)=>{
            setCi(e.target.value);
          }}/>
  
          <label>Age:</label>
          <input 
            type="number" 
            name="Age" 
            onChange={(e)=>{
            setAge(e.target.value);
          }}/>
  
          <label>Name:</label>
          <input type="text" 
            name="Name" 
            onChange={(e)=>{
            setName(e.target.value);
          }}/>
  
          <label>Email:</label>
          <input type="text" 
            name="Email" 
            onChange={(e)=>{
            setEmail(e.target.value);
          }}/>
  
          <button onClick={submiteData}>Crear</button>
          
        </div>    
      </div>
    );
  }

//Exporta la clase
export default CrearUsuario;