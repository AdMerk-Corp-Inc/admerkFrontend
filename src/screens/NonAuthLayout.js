import React, { useContext } from 'react'
import Footer from '../component/Footer'
import Navbar from '../component/Navbar'
import { userContext } from '../context/UserContext'

function NonAuthLayout(props) {
    const { user } = useContext(userContext)
    return (
        <>
            {user ? <>
                {user?.role == 4 && <span className='d-none'>{window.location = window.location.origin + "/refugee-dashboard" }</span>}
                {user?.role == 3 && <span className='d-none'>{window.location = window.location.origin + "/sponsor-dashboard" }</span>}
                {user?.role == 2 && <span className='d-none'>{window.location = window.location.origin + "/admin-dashboard" }</span>}
                {user?.role == 1 && <span className='d-none'>{window.location = window.location.origin + "/admin-dashboard" }</span>}
            </> :props.children
                
            }
        </>
    )
}

export default NonAuthLayout