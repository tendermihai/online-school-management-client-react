import React, { useEffect, useState } from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { getAllCourses } from "../../service/course-service";
import Card from "./Cards"
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router";

import { Container } from "react-bootstrap";

const Home = () => {
    let [courses, setCourses] = useState([]);
    let [loadingState, setLoadingState] = useState("init");
    let [errorMessage, setErrorMessage] = useState("");
    let userId = 1;
    const navigate = useNavigate();
    let handleCourses = async () => {
        setLoadingState("loading");

        let response = await getAllCourses();

        console.log(response, 'this is response')

        if (response.type == "success") {
            console.log("Data from server:", response);
            setLoadingState("success");
            setCourses(response.payload);
        } else {
            setLoadingState("error");
            alert(response.payload);
            setErrorMessage(response.payload);
        }
    }

    useEffect(() => {
        handleCourses();
    }, []);

    let handleSignUP = () => {
        navigate("sign-up");
    }

    let handleSignIn = () => {
        navigate("sign-in");
    }

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary navbar-expand-lg bg-dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">Courses</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home" onClick={handleSignUP}>Sign Up</Nav.Link>
                            <Nav.Link href="#link" onClick={handleSignIn}>Sign In</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {loadingState === "success" && (
                <div className="container-cards">
                    {courses.length > 0 ? (
                        courses.map((item) => {
                            return <Card course={item} allCourses={handleCourses} />;
                        })
                    ) : (
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    )}
                </div>
            )}

            {loadingState === "loading" && (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )}

            {loadingState === "error" && <p>{errorMessage}</p>}
        </>
    );
};

export default Home;
