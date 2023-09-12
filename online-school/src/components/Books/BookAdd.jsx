import React from "react";
import { useNavigate } from "react-router";

const BookAdd = () => {

    const navigate = useNavigate()

    let handleBookCreatePage = () => {

        navigate("/books-create")
    }


    return (
        <>

            <div className="card card-book-add text-white bg-secondary mb-3 add-book">

                <div className="card-body">
                    <h4 className="card-title card-title-add" onClick={handleBookCreatePage}>+ New Book</h4>
                </div>
            </div>

        </>
    )
}

export default BookAdd;