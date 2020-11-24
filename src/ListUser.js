/* LISTADO DE PERSONA */
import React,{ useEffect,useState } from 'react';
import Modal from 'react-modal';
import Axios from 'axios';

function ListarPersonas() {

  //Estilo de la ventana MODAL
  const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

    //Crea los estados
    const [Listado, setListado]   = useState([]); //Array
    const [modalIsOpen,setIsOpen] = useState(false); //Ventana modal
    
    //Constantes para editar usuario
    const [Ci,      setCi]      = useState([]);
    const [Name,    setName]    = useState([]);
    const [Age,     setAge]     = useState([]);
    const [Email,   setEmail]   = useState([]);
    var total = 0;//Total de regitros de usuario

    //Incio de ventana modal
    function openModal(Ci,Name,Age,Email) {
      setCi(Ci);
      setName(Name);
      setAge(Age);
      setEmail(Email);
      setIsOpen(true);
    }
    //Al cerrar ventana modal
    function closeModal(){
      setIsOpen(false);
    }
        
    //Consulta select todas las personas
    useEffect(()=>{
      Axios.get('http://localhost:3001/api/get').then((response)=>{
        setListado(response.data)
      });
    },[]);
  
    //EDIT USER
    const editUser = (Ci,Name,Age,Email) => {
      Axios.post('http://localhost:3001/api/useredit',{
        Ci:Ci,
        Name:Name,
        Age:Age,
        Email:Email
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
  
    return (
      <div className="usertable">
        <h1>Listado de Persona</h1>
        <table>
          <tr>
            <th>Ci</th>
            <th>Name</th> 
            <th>Age</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>      
            {Listado.map((val)=>{
                //Toma el total de registros
                total = Listado.length;
                  return (
                  <tr>              
                    <td>{val.Ci}</td>
                    <td>{val.Name}</td>
                    <td>{val.Age}</td>
                    <td>{val.Email}</td>
                    <td>
                        <button className="editbutton" onClick={() => {
                          openModal(val.Ci,val.Name,val.Age,val.Email)}}>Edit</button>
                        <Modal
                          isOpen={modalIsOpen}
                          onRequestClose={closeModal}
                          style={customStyles}
                          contentLabel="Example Modal">
                        <form className="Edit">
                          <h2>Editing user "{Name}"</h2>
                            <div>
                              <label>C.I.:</label>
                              <br/>
                              <input value={Ci} disabled/>
                              <br/>
                              <label>Name:</label>
                              <br/>
                              <input value={Name} onChange={(e)=>{setName(e.target.value);}}/>
                              <br/>
                              <label>Age:</label>
                              <br/>
                              <input type="number" value={Age} onChange={(e)=>{setAge(e.target.value);}}/>
                              <br/>
                              <label>Email:</label>
                              <br/>
                              <input type="email" value={Email} onChange={(e)=>{setEmail(e.target.value);}}/>
                              <br/>
                            </div>                                                      
                          <button>Cancelar</button>
                          <button onClick={() => {
                                    editUser(Ci,Name,Age,Email)}}>Aplicar</button>
                        </form>
                        </Modal>
                        
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
        
        <div className="registros">
            <p>Total:{total}</p>
        </div>      
            
      </div>
    );
  }

  function ListarUsuarios(){
    
    const [userlist, setuserlist]   = useState([]); //Array
    var total;

    //Consulta select todos los usuarios
    useEffect(()=>{
        Axios.get('http://localhost:3001/api/loginselect').then((response)=>{
            setuserlist(response.data)
        });
    },[]);


    return(
        <div className="usertable">
        <h1>Listado de Usuarios</h1>
        <table>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>      
            {userlist.map((val)=>{
                //Toma el total de registros
                total = userlist.length;
                return (
                <tr>              
                  <td>{val.Id}</td>
                  <td>{val.Name}</td>
                  <td>
                    <button className="editbutton">Edit</button>                      
                    <button className="deletebutton">Delete</button>
                    <button className="viewbutton">View</button>
                  </td>
                </tr>
                );
              })} 
        </table>
        <div className="registros">
            <p>Total:{total}</p>
        </div>             
      </div>
    );

  }

  //Exporta las 2 funciones
  export {ListarPersonas, ListarUsuarios};