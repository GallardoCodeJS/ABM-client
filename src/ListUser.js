/* LISTADO DE PERSONA */
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Axios from 'axios';
import img from './image/io.jpg';

function ListarPersonas() {

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

  //Crea los estados
  const [Listado, setListado] = useState([]); //Array
  const [modalIsOpen, setIsOpen] = useState(false); //Ventana modal Editar usuario
  const [modalView, setModalView] = useState(false); //Ventana modal View usuario

  //Constantes para editar usuario
  const [Ci, setCi] = useState([]);
  const [Name, setName] = useState([]);
  const [Age, setAge] = useState([]);
  const [Email, setEmail] = useState([]);
  var total = 0;//Total de regitros de usuario

  //Inicio ventana view user
  function openmodalView(Ci, Name, Age, Email) {
    setCi(Ci);
    setName(Name);
    setAge(Age);
    setEmail(Email);
    setModalView(true);
  }

  //Incio de ventana modal editar usuario
  function openModal(Ci, Name, Age, Email) {
    setCi(Ci);
    setName(Name);
    setAge(Age);
    setEmail(Email);
    setIsOpen(true);
  }
  //Al cerrar ventana modal
  function closeModal() {
    setIsOpen(false);
    setModalView(false);
  }

  //Consulta select todas las personas
  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      setListado(response.data)
    });
  }, []);

  //EDIT USER
  const editUser = (Ci, Name, Age, Email) => {
    Axios.post('http://localhost:3001/api/useredit', {
      Ci: Ci,
      Name: Name,
      Age: Age,
      Email: Email
    })
  };

  //DELETE USER
  const deleteUser = (Ci) => {
    Axios.post('http://localhost:3001/api/userdelete', {
      Ci: Ci,
    })
  };

  return (
    <div className="usertable">
      <h1>Listado de Personas</h1>
      <table>
        <tbody>
          <tr>
            <th>Ci</th>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </tbody>
        {Listado.map((val, i) => {
          //Toma el total de registros
          total = Listado.length;
          return (
            <tbody key={i}>
              <tr>
                <td>{val.Ci}</td>
                <td>{val.Name}</td>
                <td>{val.Age}</td>
                <td>{val.Email}</td>
                <td>
                  <button className="editbutton" onClick={() => {
                    openModal(val.Ci, val.Name, val.Age, val.Email)
                  }}>Edit</button>
                  <button className="deletebutton"
                    onClick={() => {
                      deleteUser(val.Ci)
                    }}>Delete</button>
                  <button className="viewbutton"
                    onClick={() => {
                      openmodalView(val.Ci, val.Name, val.Age, val.Email)
                    }}>View</button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>

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
            <label>C.I.:</label>
            <br />
            <input value={Ci} disabled />
            <br />
            <label>Name:</label>
            <br />
            <input value={Name} maxlength="35" onChange={(e) => { setName(e.target.value); }} />
            <br />
            <label>Age:</label>
            <br />
            <input type="number" min="1" max="110" value={Age} onChange={(e) => { setAge(e.target.value); }} />
            <br />
            <label>Email:</label>
            <br />
            <input type="email" value={Email} onChange={(e) => { setEmail(e.target.value); }} />
            <br />
          </div>
          <button>Cancelar</button>
          <button onClick={() => {
            editUser(Ci, Name, Age, Email)
          }}>Aplicar</button>
        </form>
      </Modal>


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
            <p>C.I.:{Ci}</p>
            <p>Age:{Age}</p>
            <p>Email:{Email}</p>
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

function ListarUsuarios() {

  const [userlist, setuserlist] = useState([]); //Array
  var total;

  //Consulta select todos los usuarios
  useEffect(() => {
    Axios.get('http://localhost:3001/api/loginselect').then((response) => {
      setuserlist(response.data)
    });
  }, []);


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
        {userlist.map((val,i) => {
          //Toma el total de registros
          total = userlist.length;
          return (
            <tbody key={i}>
              <tr>
                <td>{val.Id}</td>
                <td>{val.Name}</td>
                <td>
                  <button className="editbutton">Edit</button>
                  <button className="deletebutton">Delete</button>
                  <button className="viewbutton">View</button>
                </td>
              </tr>
            </tbody>
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
export { ListarPersonas, ListarUsuarios };