import React from "react";
import { useNavigate } from "react-router";
import { ContextSignIn } from "../context/ContextSignIn";
import { useContext } from "react";


const BookAdd = () => {

    const { signIn } = useContext(ContextSignIn)
    const navigate = useNavigate()

    let handleBookCreatePage = () => {

        navigate("/books-create", {
            state: signIn.payload.user.id
        })
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