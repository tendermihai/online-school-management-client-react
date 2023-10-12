import React, { useState, useContext } from "react";


export const ContextSignIn = React.createContext()
export const useSignInContext = () => {
    return useContext(ContextSignIn)
}


const SignInProvider = ({ children }) => {
    const [signIn, setSignIn] = useState({
        id: 0,
        firstName: "",
        lastName: "",
        age: 0,
        email: "",
        password: "",

    })

    const handleSignIn = (user) => {
        setSignIn(user)
    }

    return (
        <ContextSignIn.Provider value={{ signIn, handleSignIn }}>
            {children}
        </ContextSignIn.Provider>
    )
}

export default SignInProvider
