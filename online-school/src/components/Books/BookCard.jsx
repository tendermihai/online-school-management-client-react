import React, { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { deleteBook, updateBook } from "../../service/book-service";
import { useParams } from "react-router";
import { getBookById } from "../../service/book-service";
import BookUpdate from "./BookUpdate";
import { useNavigate } from "react-router";



const BookCard = ({ book }) => {

    const navigate = useNavigate();

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

    let handleDeleteBook = async (id) => {
        try {
            const bookResponse = await deleteBook(id);
            console.log(bookResponse)
        } catch (error) {
            console.log("Error deleting book:", error)
        }
    }

    let handleUpdatePage = async () => {
        navigate(`/books-update/${id}`)

        console.log(id, 'this is book id')
        console.log(student_id, 'this is the student_id')
    }

    return (
        <>



            <div className="myCards">
                <div className="card book-card text-white bg-primary mb-3">
                    <div className="card-header">ID: {id}</div>
                    <div className="card-body">
                        <h4 className="card-title">Title: {bookName}</h4>
                        <p className="card-text">Date:{createdAt}</p>
                        <p className="card-text">StudentID: {student_id}</p>
                        <section className="book-btns">
                            <button className="delBook" onClick={() => handleDeleteBook(id)}>Delete</button>
                            <button className="updBook" onClick={() => handleUpdatePage(id)}>Update</button>
                        </section>
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
