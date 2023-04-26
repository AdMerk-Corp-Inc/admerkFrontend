import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userContext } from '../../context/UserContext';
import { url } from '../../Helper/Helper';


function VerifyEmail() {

    const [show, setShow] = useState(false)
    const {setLoad} = useContext(userContext)

    function useQuery() {
        const { search } = useLocation();

        return React.useMemo(() => new URLSearchParams(search), [search]);
    }

    const token = useQuery().get('token');

    async function fetchEmail() {
        setLoad(true)
        const response = await fetch(url + "verifyemail/" + token, {

        })
        if (response.ok == true) {
            setLoad(false)
            const data = await response.json()
            console.log(data)
            if (data.status == 200) {
                setShow(true)
            } else {
                toast.error(data.message)
            }
        } else {
            setLoad(false)
            toast.error("Internal Server Error")
        }
    }

    useEffect(() => {
        if (token) {
            fetchEmail().catch(err => {
                setLoad(false)
                toast.error(err.message)
            })
        }

    }, [token])

    return (

        <section className="my-tickets-div" style={{ backgroundColor: '#0061df08', height: '100vh' }}>
            <div className="container py-5 h-100">
                <div className="card rounded-3 h-100" style={{ justifyContent: 'center', alignItems: 'center' }}>
                    {show ? <>
                        <img className="img-fluid" style={{ width: 100 }} src='/assets/images/tick.jpeg' alt="Sample photo" />
                        <p className='fw-bold text-center mt-3'>Your account has been verified successfully. You can <Link to="/login">login</Link> now</p>
                    </> : <>
                        <img className="img-fluid" style={{ width: 100 }} src='/assets/images/loader.gif' alt="Sample photo" />
                        <p className='fw-bold text-center mt-3'>Please Wait While we are processing your request..</p>
                    </>}
                </div>
            </div>
        </section>
    )
}


export default VerifyEmail;