import React, { useState, useContext } from "react";

export const ContextSignUp = React.createContext()
export const useSignUpContext = () => {
    return useContext(ContextSignUp)
}

const SignUpProvider = ({ children }) => {
    const [signUp, setSignUp] = useState("")

    const handleSignUp = (firstName, lastName, email, password, confirmedPassword) => {
        setSignUp(firstName, lastName, email, password, confirmedPassword)
    }


    return (
        <ContextSignUp.Provider value={(signUp, handleSignUp)}>
            {children}
        </ContextSignUp.Provider>
    )
}

export default SignUpProvider;