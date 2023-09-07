import React, { useState } from "react";
import { addEnrolment, deleteEnrolment } from "../../service/enrolment-service";
import Spinner from "react-bootstrap/Spinner";

const Card = ({ course }) => {
    const [loadingState, setLoadingState] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const userId = '1';

    const getCurrentDate = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    };

    const handleSubscribe = async () => {
        try {
            setLoadingState("loading"); // Set loading state initially

            const response = await addEnrolment({
                createdAt: getCurrentDate(),
                student_id: `${userId}`,
                course_id: `${course.id}`,
            });

            console.log(response, 'this is subscribe resp');

            if (response.type === "success") {
                setLoadingState("success");
                // You can include specific content for success here if needed
            } else {
                setLoadingState("error");
                setErrorMessage(response.payload); // Display the error message in the UI
            }
        } catch (error) {
            console.log("Error while subscribing", error);
            setLoadingState("error");
            setErrorMessage("An error occurred");
        }
    };

    return (
        <div className="myCards">

            <div className="card text-white bg-primary mb-3">

                <div className="card-header">ID: {course.id}</div>
                <div className="card-body">
                    <h4 className="card-title">Name: {course.name}</h4>
                    <p className="card-text">Department: {course.department}</p>
                    <section className="btns">
                        <button className="subscribe" onClick={handleSubscribe}>Subscribe</button>
                        <button className="unsubscribe">Unsubscribe</button>
                    </section>
                </div>
            </div>

            {loadingState === "loading" && (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )}

            {loadingState === "error" && <p>{errorMessage}</p>}
        </div>
    );
};

export default Card;
