import React, {useState} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';


const ConfirmDelete = ({show, onHide, setConfirmDelete}) => {

    

    return ( 
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Вы уверены что хотите удалить объект?
                </Modal.Title>
            </Modal.Header>
            
            <Modal.Footer>
                <Button variant='outline-success' onClick={onHide}>Назад</Button>
                <Button variant='outline-danger' onClick={()=> {setConfirmDelete(true); onHide()}}>Да, продолжить</Button>
            </Modal.Footer>
        </Modal>    
    );
}
 
export default ConfirmDelete;