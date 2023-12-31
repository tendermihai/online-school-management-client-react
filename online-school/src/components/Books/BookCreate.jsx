import React, { useState } from "react";
import NavbarItem from "../NavbarItem";
import { addNewBook } from "../../service/book-service.js";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from 'antd';
import { ContextSignIn } from "../context/ContextSignIn";


const BookCreate = () => {

    const { signIn } = useContext(ContextSignIn)
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);


    const [bookData, setBookData] = useState({
        bookName: "",
        createdAt: "",

    });

    const [errorMessage, setErrorMessage] = useState("");
    const [loadingState, setLoadingState] = useState("");


    let handleCreateBook = async () => {

        try {

            handleCheckValidation();

            if (errors.length === 0) {
                const book = {
                    bookName: bookData.bookName,
                    createdAt: bookData.createdAt,
                    student_id: signIn.payload.user.id,

                }

                const response = await addNewBook(book)

                console.log(response.type, 'this is response.type')
                console.log(errors.length, 'length of errors')
                if (response.type === "success") {
                    setLoadingState("success")
                    console.log("Redirecting to /books-show");
                    navigate("/books-show")

                }
                else {
                    setLoadingState("error");
                    setErrorMessage(response.payload)
                }
            }

        } catch (error) {
            setLoadingState("error");
            setErrorMessage("An error occured" + error.message);
        }

    }


    let handleCancelButton = () => {
        navigate("/books-show")
    }


    //todo:check validations 
    let handleCheckValidation = () => {


        let aux = [];

        if (bookData.bookName === "") {
            aux.push("Please enter a book name");
        }

        if (bookData.createdAt === "") {
            aux.push("Please enter a date");
        }

        setErrors(aux);


    }





    return (
        <>

            <NavbarItem />

            <h2>Create Book</h2>

            {
                errors.length > 0 && (

                    errors.map(element => {

                        return <Alert message={element} type="warning" />
                    })

                )
            }
            {/* <div className="validation--errors">

                <div className="form-group">
                    <fieldset>
                        <h3>Validation Errors</h3>
                        <ul>
                            <li className='value-book'>Please provide a value for "Title"</li>
                        </ul>
                    </fieldset>
                </div>
            </div> */}
            <section>

                <div className="main--flex">
                    <div className="form-group">
                        <label for="exampleInputEmail1" className="form-label mt-4">Book Title</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter a book name" fdprocessedid="om4ddi"
                            value={bookData.bookName} onChange={(e) => setBookData({ ...bookData, bookName: e.target.value })} />
                        <p className="error-message">{errorMessage === "Please enter a book name" ? errorMessage : null}</p>
                    </div>

                    <div className="form-group">
                        <label for="exampleInputEmail1" className="form-label mt-4">Estimated Time</label>
                        <input className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="yyyy/mm/dd" fdprocessedid="om4ddi" type="date" value={bookData.createdAt} pattern="\d{4}-\d{2}-\d{2}"
                            onChange={(e) => setBookData({ ...bookData, createdAt: e.target.value })} />
                        <p className="error-message">{errorMessage === "Please enter a date" ? errorMessage : null}</p>
                    </div>

                </div>
                <section className="create-book-btns">
                    <button type="button" className="btn btn-primary" fdprocessedid="9shepe" onClick={handleCreateBook}>Create Book</button>
                    <button type="button" className="btn btn-primary" fdprocessedid="9shepe" onClick={handleCancelButton}>Cancel</button>
                </section>
            </section>

        </>
    )
}

export default BookCreate;