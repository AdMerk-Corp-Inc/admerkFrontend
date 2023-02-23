import React, { useEffect } from 'react'
import { toast } from 'react-toastify';
import { url } from '../../Helper/Helper';


function VerifyEmail() {

    async function fetchEmail() {
        const response = await fetch(url + "verifyemail/" + token, {

        })
        if (response.ok == true) {
            const data = await response.json()
            console.log(data)
            if (data.status == 200) {
            } else {
                toast.error(data.message)
            }
        } else {
            toast.error("Internal Server Error")
        }
    }

    useEffect(() => {
        fetchEmail().catch(err => {
            toast.error(err.message)
        })

    }, [])

    return (

        <section className="my-tickets-div" style={{ backgroundColor: '#0061df08' }}>
            <div className="container py-5 h-100">
                <div className="card rounded-3 h-100">
                    <img className="" src='../Assets/Images/loader.gif' alt="Sample photo" />
                    <p className='fw-bold text-center'>Please Wait While we are processing your request..</p>
                </div>
            </div>
        </section>
    )
}


export default VerifyEmail;