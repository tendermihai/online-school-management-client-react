import React, { useEffect, useState } from "react";
import { verifyCourse } from "../../service/course-service";
import Card from "./Cards";
import Spinner from "react-bootstrap/Spinner";
import NavbarItem from "../NavbarItem";
import { useSortContext } from "../context/ContextSort";
import { ContextSignIn } from "../context/ContextSignIn";
import { useContext } from "react";
import { useNavigate } from "react-router";

const Home = () => {
    const { sortOption } = useSortContext();
    const { signIn } = useContext(ContextSignIn);
    const [courses, setCourses] = useState([]);
    const [loadingState, setLoadingState] = useState("init");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate()


    const handleCourses = async () => {
        setLoadingState("loading");

        const response = await verifyCourse(signIn.payload.user.id);

        if (response.type === "success") {
            setLoadingState("success");
            setCourses(response.payload);
        } else {
            setLoadingState("error");
            setErrorMessage(response.payload);
        }
    };

    useEffect(() => {

        if (signIn.id !== 0) {
            handleCourses();
        } else {

            navigate("/sign-in");
        }

    }, []);

    const getSortedCourses = () => {
        if (sortOption === "name") {
            return [...courses].sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortOption === "department") {
            return [...courses].sort((a, b) => a.department.localeCompare(b.department));
        } else if (sortOption === "id") {
            return [...courses].sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10));
        } else {
            return courses;
        }
    };

    return (
        <>

            <NavbarItem />
            {loadingState === "success" && (
                <div className="container-cards">
                    {courses.length > 0 ? (
                        getSortedCourses().map((item) => {
                            return <Card course={item} key={item.id} allCourses={handleCourses} />;
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
}

export default Home;
