import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router";
import { Container } from "react-bootstrap";
import { useSortContext } from "../components/context/ContextSort";
import { ContextSignIn } from "./context/ContextSignIn";
import { useContext } from "react";

const NavbarItem = () => {
    const navigate = useNavigate();
    const { sortOption, handleSort } = useSortContext();
    const { signIn, handleSignIn } = useContext(ContextSignIn)

    let handleSignUP = () => {
        navigate("/sign-up");
    }

    let handleSignInPage = () => {
        navigate("/sign-in");
    }

    let handleBooksPage = () => {
        navigate("/books-show");
    }

    let handleCoursePage = () => {
        navigate("/");
    }

    let handleSignOut = () => {

        handleSignIn({
            id: 0,
            firstName: "",
            lastName: "",
            age: 0,
            email: "",
            password: "",

        })

        alert("You have sign out !")


    }

    return (
        <>

            {signIn.id !== 0 ? (
                <Navbar expand="lg" className="bg-body-tertiary navbar-expand-lg bg-dark" data-bs-theme="dark">
                    <Container>
                        <Navbar.Brand href="/" onClick={handleCoursePage}>Courses</Navbar.Brand>
                        <Navbar.Brand href="#link" onClick={handleBooksPage}>Books</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <p className="hello-user">Hello, {signIn.payload.firstName}</p>
                                <Nav.Link href="#home" onClick={handleSignOut}>Sign Out</Nav.Link>

                            </Nav>
                        </Navbar.Collapse>
                        <div className="sort-container">
                            <label htmlFor="sort-select">Sort By:</label>
                            <select
                                name="sort-select"
                                value={sortOption}
                                onChange={(e) => handleSort(e.target.value)}
                            >
                                <option value="name">Name</option>
                                <option value="department">Department</option>
                                <option value="id">ID</option>
                            </select>
                        </div>
                    </Container>
                </Navbar>
            ) : (
                <Navbar expand="lg" className="bg-body-tertiary navbar-expand-lg bg-dark" data-bs-theme="dark">
                    <Container>
                        <Navbar.Brand href="/" onClick={handleCoursePage}>Courses</Navbar.Brand>
                        <Navbar.Brand href="#link" onClick={handleBooksPage}>Books</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="#home" onClick={handleSignUP}>Sign Up</Nav.Link>
                                <Nav.Link href="#link" onClick={handleSignInPage}>Sign In</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                        <div className="sort-container">
                            <label htmlFor="sort-select">Sort By:</label>
                            <select
                                name="sort-select"
                                value={sortOption}
                                onChange={(e) => handleSort(e.target.value)}
                            >
                                <option value="name">Name</option>
                                <option value="department">Department</option>
                                <option value="id">ID</option>
                            </select>
                        </div>
                    </Container>
                </Navbar>
            )}
        </>
    )
}

export default NavbarItem;
