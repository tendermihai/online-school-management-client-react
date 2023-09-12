import React, { useEffect, useState } from "react";

import { getAllCourses } from "../../service/course-service";
import Card from "./Cards"
import Spinner from "react-bootstrap/Spinner";
// import { useNavigate } from "react-router";
import NavbarItem from "../NavbarItem"



const Home = () => {
    let [courses, setCourses] = useState([]);
    let [loadingState, setLoadingState] = useState("init");
    let [errorMessage, setErrorMessage] = useState("");
    // let [user, setUser] = useState("");

    // let userId = 1;
    // const navigate = useNavigate();
    let handleCourses = async () => {
        setLoadingState("loading");

        let response = await getAllCourses();

        console.log(response, 'this is response')

        if (response.type === "success") {
            console.log("Data from server:", response);
            setLoadingState("success");
            setCourses(response.payload);
        } else {
            setLoadingState("error");
            alert(response.payload);
            setErrorMessage(response.payload);
        }
    }

    useEffect(() => {
        handleCourses();
    }, []);




    return (
        <>
            <NavbarItem />
            {loadingState === "success" && (
                <div className="container-cards">
                    {courses.length > 0 ? (
                        courses.map((item) => {
                            return <Card course={item} allCourses={handleCourses} />;
                        })
                    ) : (
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    )}
                </div>
            )}

            {loadingState === "loading" && (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )}

            {loadingState === "error" && <p>{errorMessage}</p>}
        </>
    );
};

export default Home;
