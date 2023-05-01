import React, { createContext, useState } from 'react'

const userContext = createContext()

function getUserFromLocalStorage(){
    return localStorage.getItem('admerk_user') ? JSON.parse(localStorage.getItem('admerk_user')) : null
}


function UserContext(props) {
    const [user, setUser] = useState(getUserFromLocalStorage())
    const [load,setLoad] = useState(false)

    React.useEffect(()=>{
        localStorage.setItem('admerk_user',JSON.stringify(user));
        // console.log("[userContext] User Updated Locally: ", user);
    },[user])
    
    return (
        <userContext.Provider value={{user,setUser,load,setLoad}}>
            {props.children}
        </userContext.Provider>
    )
}

export { UserContext, userContext }