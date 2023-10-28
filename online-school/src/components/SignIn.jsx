import React from "react";
import { useNavigate } from "react-router";
import { loginStudent } from "../service/student-service";
import { useState } from "react";
import { useContext } from "react";
import { ContextSignIn } from "./context/ContextSignIn";

const SignIn = () => {
    const navigate = useNavigate();
    const { handleSignIn } = useContext(ContextSignIn)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    let handleCancel = () => {
        navigate("/");
    }

    let handleSignUp = () => {
        navigate("/sign-up")
    }


    let handleLogin = async (event) => {
        event.preventDefault()
        try {
            let data = await loginStudent(email, password)
            console.log(data, 'this is my login data')

            handleSignIn(data);
            navigate("/")

        } catch (error) {
            setError("Login failed. Please check your credentials")
        }
    }
    return (
        <>
            <div id="root">
                <header>
                    <div className="wrap header--flex">
                        <h1 className="header--logo">Courses</h1>
                        <nav>
                            <ul className="header--signedout">
                                <li><a className="sign-up-pointer" onClick={handleSignUp}>Sign Up</a></li>

                            </ul>
                        </nav>
                    </div>
                </header>
                <main>
                    <div className="form--centered">
                        <h2>Sign In</h2>

                        <form onSubmit={handleLogin}>
                            <label for="emailAddress">Email Address</label>
                            <input id="emailAddress" name="emailAddress" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                            <label for="password">Password</label>
                            <input id="password" name="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />

                            {error && <p className="error-message">{error}</p>}
                            <button className="button signinBtn" type="submit" onClick={handleSignIn}>Sign In</button><button
                                className="button button-secondary"
                                onClick="event.preventDefault(); location.href='index.html';" onClick={handleCancel}  >Cancel</button>
                        </form>
                        <p>Don't have a user account? Click here to <a className="color-sign-up sign-up-pointer" onClick={handleSignUp}>sign up</a>!</p>

                    </div>
                </main>
            </div>
        </>
    )
}

export default SignIn;