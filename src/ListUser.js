/* LISTADO DE PERSONA */
import React,{ useEffect,useState } from 'react';
import Modal from 'react-modal';
import Axios from 'axios';

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

function ListarPersonas() {

    var subtitle;
    //Crea los estados
    const [Listado, setListado] = useState([]); //Array
    
    const [Ci,      setCi]      = useState([]);
    const [Name,    setName]    = useState([]);
    const [Age,     setAge]     = useState([]);
    

    const [modalIsOpen,setIsOpen] = useState(false); //Ventana modal
  
    var total = 0;

    //Incio de ventana modal
    function openModal(Ci,Name,Age) {
      setCi(Ci);
      setName(Name);
      setAge(Age);
      setIsOpen(true);
    }
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#f00';
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
    const editUser = (Ci) => {
      Axios.post('http://localhost:3001/api/useredit',{
        Ci:Ci
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
                    <td>
                      <button className="editbutton" onClick={() => {
                        editUser(val.Ci)}}>Edit</button>
                      <button className="deletebutton"
                        onClick={() => {
                        deleteUser(val.Ci)}}>Delete</button>
                      <button className="viewbutton"
                        onClick={() => {
                        viewUser(val.Ci)}}>View</button>


                        <button onClick={() => {
                          openModal(val.Ci,val.Name,val.Age)}}>Open Modal</button>
                        <Modal
                          isOpen={modalIsOpen}
                          onAfterOpen={afterOpenModal}
                          onRequestClose={closeModal}
                          style={customStyles}
                          contentLabel="Example Modal"
                        >
                
                          <h2 ref={_subtitle => (subtitle = _subtitle)}>Editar usuario</h2>
                          <div>
                            <input value={Ci}/>
                            <input value={Name}/>
                            <input value={Age}/>
                          </div>
                          <form>                            
                            <button>Cancelar</button>
                            <button onClick={() => {
                                    editUser(Ci)}}>Aplicar</button>
                          </form>
                        </Modal>
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