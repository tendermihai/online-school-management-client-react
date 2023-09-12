import React, { useState } from "react";
import { addEnrolment, deleteEnrolment, findEnrolmentById } from "../../service/enrolment-service";
import Spinner from "react-bootstrap/Spinner";


const Card = ({ course }) => {
    const [loadingState, setLoadingState] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    let userId = '1';

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
            setLoadingState("loading");

            const response = await addEnrolment({
                createdAt: getCurrentDate(),
                student_id: `${userId}`,
                course_id: `${course.id}`,
            });

            console.log(response, 'this is subscribe resp');

            if (response.type === "success") {
                setLoadingState("success");
            } else {
                setLoadingState("error");
                alert(response.payload)
                setErrorMessage(response.payload);
            }
        } catch (error) {
            console.log("Error while subscribing", error);
            setLoadingState("error");
            setErrorMessage("An error occurred");
        }
    };


    const handleUnsubscribe = async () => {
        try {
            setLoadingState("loading");

            // Assuming you have the enrolment ID associated with the course
            const courseId = `${course.id}`; // Replace with the actual course ID
            const userId = 1; // Replace with the actual user ID

            // Find the enrolment by course and user ID using enrolment-service.js
            const enrolmentResponse = await findEnrolmentById(courseId, userId);

            if (enrolmentResponse.type === "success") {
                const enrolment = enrolmentResponse.payload;
                console.log(enrolment, 'this is my enrolment')

                // Delete the enrolment using its ID from course-service.js
                const deleteResponse = await deleteEnrolment(enrolment.id);

                if (deleteResponse.type === "success") {
                    setLoadingState("success");
                } else {
                    setLoadingState("error");
                    // alert(deleteResponse.payload);
                    setErrorMessage(deleteResponse.payload);
                }
            } else {
                setLoadingState("error");
                alert(enrolmentResponse.payload);
                setErrorMessage(enrolmentResponse.payload);
            }
        } catch (error) {
            console.log("Error while unsubscribing", error);
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
                        <button className="unsubscribe" onClick={handleUnsubscribe}>Unsubscribe</button>
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
