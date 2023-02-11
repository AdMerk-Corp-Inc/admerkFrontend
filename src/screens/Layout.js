import React from 'react'
import Footer from '../component/Footer'
import Navbar from '../component/Navbar'

function Layout(props) {
    return (
        <>
            {/* {(window.location.pathname != '/signup-sponser') && <Navbar />} */}
            {props.children}
            {/* <Footer /> */}
        </>
    )
}

export default Layout