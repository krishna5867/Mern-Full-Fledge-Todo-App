import React, { createContext, useState } from 'react'

export const data = createContext();

const ContextProvider = ({ children }) => {

    const [userData, setUserData] = useState("");

    return (
        <>
            <data.Provider value={{ userData, setUserData }}>
                        {children}
            </data.Provider>
        </>
    )
}

export default ContextProvider