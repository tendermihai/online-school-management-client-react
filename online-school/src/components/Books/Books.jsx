import React, { useState, useEffect } from "react";
import NavbarItem from "../NavbarItem";
import BookAdd from "./BookAdd";
import BookCard from "./BookCard";
import Spinner from "react-bootstrap/Spinner";
import { getBooksByStudentId } from "../../service/book-service";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { ContextSignIn } from "../context/ContextSignIn";

const Books = () => {

    const { signIn } = useContext(ContextSignIn);

    const [books, setBooks] = useState([]);
    const [loadingState, setLoadingState] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();


    const handleBooks = async () => {
        try {
            setLoadingState("loading");
            const response = await getBooksByStudentId(signIn.payload.user.id);
            console.log(response, 'this is response with signINID')
            console.log(response.payload, "Books data")
            if (response.type === "success") {
                setBooks(response.payload);
                setLoadingState("success");
            } else {
                setLoadingState("error");
                setErrorMessage(response.payload);
            }

        } catch (error) {
            console.error("Error while fetching books:", error);
            setLoadingState("error");
            setErrorMessage("An error occurred");
        }
    };

    useEffect(() => {
        handleBooks(signIn.id);
    }, [signIn.id]);



    return (
        <>
            <NavbarItem />
            <BookAdd student_id={signIn.id} />

            {loadingState === "success" && (
                <div className="container-cards">
                    {books.length > 0 ? (
                        books.map((book) => {
                            return <BookCard book={book} />;
                        })
                    ) : (
                        <p>No books available.</p>
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

export default Books;
