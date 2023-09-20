import React, { useState } from "react";
import NavbarItem from "../NavbarItem";
import { addNewBook } from "../../service/book-service";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const BookCreate = () => {
    const navigate = useNavigate();
    const student_id = useLocation().state;

    console.log(student_id, ' this is state')
    const [bookData, setBookData] = useState({
        bookName: "",
        estimatedTime: "",

    })


    let handleCreateBook = async () => {

        const book = {
            bookName: bookData.bookName,
            createdAt: bookData.estimatedTime,
            student_id: student_id,

        }

        console.log(book, 'this is my book')

        const response = await addNewBook(book)
        console.log(response)

        navigate("/books-show")

    }

    let handleCancelButton = () => {
        navigate("/books-show")
    }


    return (
        <>

            <NavbarItem />

            <h2>Create Book</h2>
            <div className="validation--errors">

                <div className="form-group">
                    <fieldset>
                        <h3>Validation Errors</h3>
                        <ul>
                            <li className='value-book'>Please provide a value for "Title"</li>
                        </ul>
                    </fieldset>
                </div>
            </div>
            <section>

                <div className="main--flex">
                    <div className="form-group">
                        <label for="exampleInputEmail1" className="form-label mt-4">Book Title</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter a book name" fdprocessedid="om4ddi"
                            value={bookData.bookName} onChange={(e) => setBookData({ bookName: e.target.value })} />
                    </div>

                    <div className="form-group">
                        <label for="exampleInputEmail1" className="form-label mt-4">Estimated Time</label>
                        <input className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="yyyy/mm/dd" fdprocessedid="om4ddi" type="date" value={bookData.estimatedTime} pattern="\d{4}-\d{2}-\d{2}"
                            onChange={(e) => setBookData({ ...bookData, estimatedTime: e.target.value })} />
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