import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { userContext } from '../context/UserContext';
import { url } from '../Helper/Helper';

const CreateTicket = (props) => {

    const { user,setLoad } = useContext(userContext)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        async function fetchTicketDetail() {
            setLoad(true)
            const response = await fetch(url + 'ticket-detail/' + props?.id, {
                headers: {
                    'Authorization': `Bearer ${user?.token}`
                },
            })

            if (response.ok == true) {
                const data = await response.json()

                console.log(data)
                if (data.status == 200) {
                    setLoad(false)
                    setTitle(data?.detail?.title)
                    setDescription(data?.detail?.description)

                } else {
                    toast.error(data.message)
                }

            } else {
                setLoad(false)
                toast.error('Internal Server Error')
            }
        }

        if (props?.id) {
            
            fetchTicketDetail()
        }
    }, [props?.id])

    async function Submit() {
        setLoad(true)
        if (title && description) {
            const formData = new FormData();
            formData.append('title', title)
            formData.append('description', description)

            const response = await fetch(url + 'create-ticket', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user?.token}`
                },
                body: formData,
            })

            if (response.ok == true) {
                setLoad(false)
                const data = await response.json()

                if (data.status == 200) {
                    props.onHide()
                    setTitle('')
                    setDescription('')
                    toast.success(data.mesage)
                } else {
                    toast.error(data.message)
                }
            } else {
                setLoad(false)
                toast.error('Internal server error')
            }
        } else {
            toast.error('Please fill all the data')
        }
    }

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
                <div className='d-flex flex-column px-3 '>
                    <div className=' '>
                        <label>Title</label>
                        <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} className='form-control mt-2' required placeholder='Title'></input>
                    </div>
                    <div className=' mt-3'>
                        <label>Description</label>
                        <textarea type='text' value={description} onChange={(e) => setDescription(e.target.value)} className='form-control mt-2' required rows='5' placeholder='Description' />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button className='btn btn-dark ' onClick={props.onHide}>cancel</Button>
                <Button className='btn btn-danger ml-3' onClick={Submit}>Submit</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateTicket;
