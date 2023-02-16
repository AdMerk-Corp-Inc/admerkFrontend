import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const CreateTicket = (props) => {

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create Ticket
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>    
                <div className='d-flex flex-column p-5 '>
                    <div className=' '>
                        <label>Title</label>
                        <input type='text' className='form-control mt-2' required placeholder='Title'></input>
                    </div>
                    <div className=' mt-3'>
                        <label>Description</label>
                        <textarea type='text'  className='form-control mt-2' required rows='5' placeholder='Description' />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button className='btn btn-dark ' onClick={props.onHide}>cancel</Button>
                <Button className='btn btn-danger ml-3' >Submit</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateTicket;
