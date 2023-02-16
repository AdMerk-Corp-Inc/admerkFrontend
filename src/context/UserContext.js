import React, { createContext, useState } from 'react'

const userContext = createContext()

function UserContext(props) {
    const [user, setUser] = useState('')
    return (
        <userContext.Provider value={{user,setUser}}>
            {props.children}
        </userContext.Provider>
    )
}

export { UserContext, userContext }