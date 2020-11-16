import React, { useEffect, useState } from 'react';
import Axios from 'axios';

//Funcion de formularios
function App() {

  //Crea los estados
  const [Ci,      setCi]      = useState("");
  const [Age,     setAge]     = useState("");
  const [Name,    setName]    = useState("");
  const [Email,   setEmail]   = useState("");
  const [Listado, setListado] = useState([]); //Array

  useEffect(()=>{
    Axios.get('http://localhost:3001/api/get').then((response)=>{
      setListado(response.data)
      //console.log(response.data);
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
  setListado([
    ...Listado,
      { Ci:Ci, Age:Age, Name:Name, Email:Email },
    ]);
  };
  
  //EDIT USER
  const editUser = (Ci) => {
    Axios.post('http://localhost:3001/api/useredit',{
      Ci:Ci,
    })};
  
  //DELETE USER
  const deleteUser = (Ci) => {
    Axios.post('http://localhost:3001/api/userdelete',{
      Ci:Ci,
    })  
  };

  //VIEW USER
  const viewUser = (Ci) => {
    Axios.post('http://localhost:3001/api/userview',{
      Ci:Ci,
    })};
  
  

  return(
    <div className="App">
      <h1>Crud Application</h1>

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

        <button onClick={submiteData}>Enviar</button>
        
      </div>
    
    <div className="usertable">
      <h1>Listado de Persona</h1>
      <table>
        <tr>
          <th>Ci</th>
          <th>Name</th> 
          <th>Age</th>
          <th>Actions</th>
        </tr>      
          {Listado.map((val)=>{
              return (
              <tr>              
                <td>{val.Ci}</td>
                <td>{val.Name}</td>
                <td>{val.Age}</td>
                <td>
                  <button className="editbutton"
                    onClick={() => {
                    editUser(val.Ci)}}>Edit</button>
                  <button className="deletebutton"
                    onClick={() => {
                    deleteUser(val.Ci)}}>Delete</button>
                  <button className="viewbutton"
                    onClick={() => {
                    viewUser(val.Ci)}}>View</button>
                </td>
              </tr>
              );
            })} 
      </table>
    </div>
    
    </div>
  );
}
    
//Exporta la clase
export default App;
