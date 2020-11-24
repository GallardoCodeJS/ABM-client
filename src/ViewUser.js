import React, {useState}from 'react';
import {Button, Modal} from 'antd';

function Verusuario(){

    
    //Estado para la ventana modal
    const [modal,   setModal] = useState(false);

    const abrirModal = () =>{
        setModal(true);
    }

    const cerrarModal = () =>{
        setModal(false);
    }

    const accion = () =>{
        alert("asdasd");
        cerrarModal();
    }

    
    return (
        <div className="Verusuario">
            <Button type="primary" onClick={abrirModal}>Mostrar modal</Button>
        
            <Modal title="modal Header" visible={modal} onCancel={cerrarModal} onOk={accion}>
                <p>Este es el Modal Body</p>
            </Modal>
        </div>
        
    );
}

export default Verusuario;