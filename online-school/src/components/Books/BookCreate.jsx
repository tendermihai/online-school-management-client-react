import React from "react";
import NavbarItem from "../NavbarItem";

const BookCreate = () => {

    return (
        <>

            <NavbarItem />

            <h2>Create Book</h2>
            <div className="validation--errors">
                <h3>Validation Errors</h3>
                <ul>
                    <li>Please provide a value for "Title"</li>

                </ul>
            </div>
            <section>
                <div className="main--flex">
                    <div>
                        <label for="courseTitle">Book Title</label>
                        <input id="courseTitle" name="courseTitle" type="text" value="" />

                    </div>
                    <div>
                        <label for="estimatedTime">Estimated Time</label>
                        <input placeholder="Date" id="estimatedTime" name="estimatedTime" type="date" value="" pattern="\d{4}/\d{2}/\d{2}" />


                    </div>
                </div>
                <button className="button addNewBook">Create Book</button><button class="button button-secondary cancelBook">Cancel</button>
            </section>


        </>
    )
}

export default BookCreate;