import React from "react";
import { useNavigate } from "react-router";

const SignUp = () => {

    const navigate = useNavigate()

    let handleCancel = () => {
        navigate("/");
    }

    let handleSignIn = () => {
        navigate("/sign-in")
    }
    return (
        <>
            <div id="root">
                <header>
                    <div className="wrap header--flex">
                        <h1 className="header--logo"><a >Courses</a></h1>
                        <nav>
                            <ul className="header--signedout">

                                <li><a class="sign-in-pointer" onClick={handleSignIn}>Sign In</a></li>
                            </ul>
                        </nav>
                    </div>
                </header>
                <main>
                    <div className="form--centered">
                        <h2>Sign Up</h2>

                        <form>
                            <label for="firstName">First Name</label>
                            <input id="firstName" name="firstName" type="text" value="" />
                            <label for="lastName">Last Name</label>
                            <input id="lastName" name="lastName" type="text" value="" />
                            <label for="emailAddress">Email Address</label>
                            <input id="emailAddress" name="emailAddress" type="email" value="" />
                            <label for="password">Password</label>
                            <input id="password" name="password" type="password" value="" />
                            <button className="button " type="submit">Sign Up</button><button className="button button-secondary" onclick="event.preventDefault(); location.href='index.html';" onClick={handleCancel}>Cancel</button>
                        </form>
                        <p>Already have a user account? Click here to <a class="sign-in-color sign-in-pointer" onClick={handleSignIn}>sign in</a>!</p>
                    </div>
                </main >
            </div >
        </>
    )
}

export default SignUp;