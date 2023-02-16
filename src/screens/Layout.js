import React from 'react'
import Footer from '../component/Footer'
import Navbar from '../component/Navbar'

function Layout(props) {
    return (
        <>
            {(window.location.pathname != '/signup-sponser' && window.location.pathname != '/signup-refugee' && window.location.pathname != '/signup') && <Navbar />}
            {props.children}
            {(window.location.pathname != '/signup-sponser' && window.location.pathname != '/signup-refugee' && window.location.pathname != '/signup') && <Footer />}
        </>
    )
}

export default Layout