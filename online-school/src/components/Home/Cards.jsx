import React, { useState } from "react";
import { addEnrolment, unEnrollment } from "../../service/enrolment-service";
import Spinner from "react-bootstrap/Spinner";
import { useEffect } from "react";
import { ContextSignIn } from "../context/ContextSignIn";
import { useContext } from "react";


const Card = ({ course, allCourses }) => {
    const [loadingState, setLoadingState] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const { signIn } = useContext(ContextSignIn)






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
                student_id: `${signIn.payload.user.id}`,
                course_id: `${course.id}`,
            });

            await allCourses();

            if (response.type === "success") {
                setLoadingState("success");
            } else {
                setLoadingState("error");
                alert(response.payload)
                setErrorMessage(response.payload);
            }
        } catch (error) {

            setLoadingState("error");
            setErrorMessage("An error occurred");
        }
    };


    const handleUnsubscribe = async () => {
        try {
            setLoadingState("loading");



            const enrolmentResponse = await unEnrollment(signIn.payload.user.id, course.id);

            await allCourses()




            if (enrolmentResponse.type === "success") {
                const enrolment = enrolmentResponse.payload;
                console.log(enrolment, 'what is this enrolment')


                if (enrolmentResponse.type === "success") {
                    setLoadingState("success");
                } else {
                    setLoadingState("error");
                    alert(enrolmentResponse.payload)
                    setErrorMessage(enrolmentResponse.payload);
                }
            } else {
                setLoadingState("error");
                alert(enrolmentResponse.payload);
                setErrorMessage(enrolmentResponse.payload);
            }
        } catch (error) {
            setLoadingState("error");
            setErrorMessage("An error occurred");
        }
    };

    // useEffect(() => {
    //     handleUnsubscribe()
    // }, [])

    return (
        <div className="myCards">

            <div className="card text-white bg-primary mb-3">

                <div className="card-header">ID: {course.id}</div>
                <div className="card-body">
                    <h4 className="card-title">Name: {course.name}</h4>
                    <p className="card-text">Department: {course.department}</p>
                    <section className="btns">

                        {course.enrolled === true ? (
                            <button className="unsubscribe" onClick={handleUnsubscribe}>
                                Unsubscribe
                            </button>
                        ) : (


                            <button className="subscribe" onClick={handleSubscribe}>
                                Subscribe
                            </button>
                        )}

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
