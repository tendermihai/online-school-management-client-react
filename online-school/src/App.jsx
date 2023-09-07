import React from "react";
import Home from "./components/Home/Home";
import Card from "./components/Home/Cards";
import SignUp from "./components/SignUp"
import SignIn from "./components/SignIn";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
