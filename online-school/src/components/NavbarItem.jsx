import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { useNavigate } from "react-router";
import { Container } from "react-bootstrap";


const NavbarItem = ({ user }) => {
    const navigate = useNavigate()
    let handleSignUP = () => {
        navigate("sign-up");
    }

    let handleSignIn = () => {
        navigate("sign-in");
    }

    let handleBooksPage = () => {
        navigate("/books-show");
    }

    let handleCoursePage = () => {
        navigate("/")
    }

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary navbar-expand-lg bg-dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/" onClick={handleCoursePage}>Courses</Navbar.Brand>
                    <Navbar.Brand href="#link" onClick={handleBooksPage}>Books</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home" onClick={handleSignUP}>Sign Up</Nav.Link>
                            <Nav.Link href="#link" onClick={handleSignIn}>Sign In</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default NavbarItem;