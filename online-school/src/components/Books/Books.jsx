import React, { useState, useEffect } from "react";
import NavbarItem from "../NavbarItem";
import BookAdd from "./BookAdd";
import BookCard from "./BookCard";
import Spinner from "react-bootstrap/Spinner";
import { getBooksByStudentId } from "../../service/book-service";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";


const Books = () => {

    const student_id = "1"
    const [books, setBooks] = useState([]);
    const [loadingState, setLoadingState] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();


    const handleBooks = async (student_id) => {
        try {
            setLoadingState("loading");
            const response = await getBooksByStudentId(student_id);
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
        handleBooks(student_id);
    }, [student_id]);



    return (
        <>
            <NavbarItem />
            <BookAdd student_id={student_id} />

            {loadingState === "success" && (
                <div className="container-cards">
                    {books?.length > 0 ? (
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
