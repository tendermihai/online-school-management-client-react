import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getBookById, updateBook } from "../../service/book-service";
import { useContext } from "react";
import { ContextSignIn } from "../context/ContextSignIn";
import { useParams } from "react-router";



let BookUpdate = () => {
    const navigate = useNavigate();
    const { id } = useParams()

    const { signIn } = useContext(ContextSignIn)


    const [bookTitle, setBookTitle] = useState("");
    const [estimatedTime, setEstimatedTime] = useState("");

    // const { student_id } = useLocation().state;
    // const { id } = useLocation().state


    useEffect(() => {
        handleUpdateBook();
    }, [])

    let handleUpdateBook = async () => {
        try {
            const data = await getBookById(id);
            console.log(data, 'this is data of getbookbyid')

            setBookTitle(data.payload.bookName);
            setEstimatedTime(data.payload.createdAt)

        } catch (error) {
        }
    }



    const handleUpdate = async () => {
        try {
            const book = {
                bookName: bookTitle,
                createdAt: estimatedTime,
                student_id: signIn.payload.user.id,
            }
            await updateBook({ book }, id)
            // write to navigate to book-show after updated btn is clicked
            navigate("/books-show")
        } catch (error) {
            console.log("Error updating book:", error)
        }
    }

    let handleCancel = () => {
        navigate("/books-show")
    }

    return (

        <>
            <section className="update-book">
                <h1>Update Book</h1>
                <div className="main--flex">
                    <div>
                        <label for="bookTitle">Book Title</label>
                        <input id="bookTitle" name="bookTitle" type="text" value={bookTitle}
                            onChange={(e) => { setBookTitle(e.target.value) }} />
                    </div>
                    <div>
                        <label for="estimatedTime">Estimated Time</label>
                        <input id="estimatedTime" name="estimatedTime" type="date" value={estimatedTime}
                            onChange={(e) => { setEstimatedTime(e.target.value) }} />

                    </div>
                </div>
                <button className="button updateBook" pattern="\d{4}-\d{2}-\d{2}" onClick={handleUpdate}>Update Book</button>
                <button className="button button-secondary cancelUpdateBook" onClick={handleCancel}>Cancel</button>
            </section>
        </>
    )
}

export default BookUpdate;