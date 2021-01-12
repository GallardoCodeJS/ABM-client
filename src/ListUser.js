import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Axios from 'axios';
import img from './image/io.jpg';

function ListarUsuarios() {

    const [userlist, setuserlist] = useState([]); //Array
    //Constantes para editar usuario
    const [Id, setId] = useState([]);
    const [Name, setName] = useState([]);
    //Estados de ventana modal
    const [modalIsOpen, setIsOpen] = useState(false); //Ventana modal Editar usuario
    const [modalView, setModalView] = useState(false); //Ventana modal View usuario
    var total;
  
    //Estilo de la ventana MODAL
    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
      }
    };
  
    //Inicio ventana view user
    function openmodalView(Id, Name) {
      setId(Id);
      setName(Name);
      setModalView(true);
    }
  
    //Incio de ventana modal editar usuario
    function openModal(Id, Name) {
      setId(Id);
      setName(Name);
      setIsOpen(true);
    }
  
    //Al cerrar ventana modal
    function closeModal() {
      setIsOpen(false);
      setModalView(false);
    }
  
    //Consulta select todos los usuarios
    useEffect(() => {
      Axios.get('http://localhost:3001/api/loginselect').then((response) => {
        setuserlist(response.data)
      });
    }, []);
  
    //EDIT USER
    const editUser = (Id, Name) => {
      Axios.post('http://localhost:3001/api/useredit', {
        Id: Id,
        Name: Name
      })
    };

    //DELETE USER
    const deleteUser = (Id) => {
        Axios.post('http://localhost:3001/api/deleteuser',{
            Id:Id
        })
    };
  
  
    return (
      <div className="usertable">
        <h1>Listado de Usuarios</h1>
        <table>
          <tbody>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </tbody>
          {userlist.map((val, i) => {
            //Toma el total de registros
            total = userlist.length;
            return (
              <tbody key={i}>
                <tr>
                  <td>{val.Id}</td>
                  <td>{val.Name}</td>
                  <td>
                    <button className="editbutton" onClick={() => {
                      openModal(val.Id, val.Name)
                    }}>Edit</button>
                    <button className="deletebutton" onClick={() =>{
                        deleteUser(val.Id)
                    }}>Delete</button>
                    <button className="viewbutton" onClick={() => {
                        openmodalView(val.Id, val.Name)
                      }}>View</button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
  
        { /* Edit */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal">
          <form className="Edit">
            <h2>Editing user "{Name}"</h2>
            <div>
              <img src={img} alt={Name} />
              <br />
              <label>I.d.:</label>
              <br />
              <input value={Id} disabled />
              <br />
              <label>Name:</label>
              <br />
              <input value={Name} maxLength="35" onChange={(e) => { setName(e.target.value); }} />
              <br />
            </div>
            <button>Cancelar</button>
            <button onClick={() => {
              editUser(Id, Name)
            }}>Aplicar</button>
          </form>
        </Modal>
  
        { /* View */}
        <Modal
          isOpen={modalView}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal">
          <form className="Edit">
            <h2>{Name}</h2>
            <div>
              <div>
                <img src={img} alt={Name} />
              </div>
              <p>I.D.:{Id}</p>
              <p>Name:{Name}</p>
              <p>Algun dato extra</p>
              <br />
            </div>
            <button>Salir</button>
          </form>
        </Modal>
  
        <div className="registros">
          <p>Total:{total}</p>
        </div>
      </div>
    );
  
  }

  export default ListarUsuarios;