import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { ContextSignUp } from "./context/ContextSignUp";
import { registerStudent } from "../service/student-service";

const SignUp = () => {

    const navigate = useNavigate()
    const { handleSignUp } = useContext(ContextSignUp);

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmedPassword, setConfirmedPassword] = useState("")
    const [age, setAge] = useState("")
    const [error, setError] = useState("")


    let handleCancel = () => {
        navigate("/");
    }

    let handleSignIn = () => {
        navigate("/sign-in")
    }

    let handleRegister = async (event) => {

        event.preventDefault()
        try {
            await registerStudent(firstName, lastName, age, email, password, confirmedPassword)
            console.log(firstName, lastName, age, email, password, confirmedPassword)
            navigate("/");
        } catch (error) {
            setError("Registration failed. Please check your credentials.")
        }

    }
    return (
        <>
            <div id="root">
                <header>
                    <div className="wrap header--flex">
                        <h1 className="header--logo"><a >Courses</a></h1>
                        <nav>
                            <ul className="header--signedout">

                                <li><a className="sign-in-pointer" onClick={handleSignIn}>Sign In</a></li>
                            </ul>
                        </nav>
                    </div>
                </header>
                <main>
                    <div className="form--centered">
                        <h2>Sign Up</h2>

                        <form onSubmit={handleRegister}>
                            <label for="firstName">First Name</label>
                            <input id="firstName" name="firstName" type="text" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
                            <label for="lastName">Last Name</label>
                            <input id="lastName" name="lastName" type="text" value={lastName} onChange={(event) => setLastName(event.target.value)} />
                            <label for="age">Age </label>
                            <input id="age" name="age" type="text" value={age} onChange={(event) => setAge(event.target.value)} />
                            <label for="emailAddress">Email Address</label>
                            <input id="emailAddress" name="emailAddress" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                            <label for="password">Password</label>
                            <input id="password" name="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                            <label for="password">Confirm Password</label>
                            <input id="confirmedPassword" name="confirmedPassword" type="password" value={confirmedPassword} onChange={(event) => setConfirmedPassword(event.target.value)} />


                            {error && <p className="error-message">{error}</p>}
                            <button className="button " type="submit" onClick={handleSignUp}>Sign Up</button><button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                        </form>
                        <p>Already have a user account? Click here to <a className="sign-in-color sign-in-pointer" onClick={handleSignIn}>sign in</a>!</p>
                    </div>
                </main >
            </div >
        </>
    )
}

export default SignUp;