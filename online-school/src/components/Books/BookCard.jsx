import React, { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import NavbarItem from "../NavbarItem";


const BookCard = ({ book }) => {
    const { id, bookName, createdAt, student_id } = book;

    const [loadingState, setLoadingState] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    // const getCurrentDate = () => {
    //     const currentDate = new Date();
    //     const year = currentDate.getFullYear();
    //     const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    //     const day = String(currentDate.getDate()).padStart(2, '0');
    //     const formattedDate = `${year}-${month}-${day}`;
    //     return formattedDate;
    // }

    return (
        <>

            <div className="myCards">
                <div className="card book-card text-white bg-primary mb-3">
                    <div className="card-header">ID: {id}</div>
                    <div className="card-body">
                        <h4 className="card-title">Title: {bookName}</h4>
                        <p className="card-text">Date:{createdAt}</p>
                        <p className="card-text">StudentID: {student_id}</p>
                        {/* Add other book details here */}
                    </div>
                </div>

                {loadingState === "loading" && (
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                )}

                {loadingState === "error" && <p>{errorMessage}</p>}
            </div>
        </>
    );
};

export default BookCard;
