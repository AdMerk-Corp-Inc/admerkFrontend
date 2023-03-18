import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { userContext } from '../context/UserContext';
import { url } from '../Helper/Helper';

const ApplyNewJob = (props) => {

    const { user,setLoad } = useContext(userContext)
    const [resume, setResume] = useState('')



    async function Submit() {
        if (resume?.name) {
            const formData = new FormData();
            setLoad(true)

            formData.append('resume', resume, resume?.name)


            const response = await fetch(url + 'apply-job/' + props?.id, {
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
                    setResume('')
                    toast.success("Job Applied successfully!")
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
                    Apply For Job
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='d-flex flex-column px-3 '>
                    <div className=' '>
                        <label>Upload A Resume For Apply New Job</label>

                        <div className="filter-form-MUI-input-text col-md-12 mt-3">
                            <main class="input-div">
                                <input
                                    class="inner-input"
                                    type="file"
                                    placeholder=" "
                                    id='name'
                                    autoComplete="off"
                                    onChange={e => setResume(e.target.files[0])}
                                />
                                <label for="name" class="inner-label">Upload Resume</label>
                                {/* <span className='required'>*Required</span> */}
                            </main>

                            {/* <span className='error'>it is span tag</span> */}
                        </div>
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

export default ApplyNewJob;
