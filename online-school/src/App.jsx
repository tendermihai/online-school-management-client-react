import React from "react";
import Home from "./components/Home/Home";
import SignUp from "./components/SignUp"
import SignIn from "./components/SignIn";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Books from "./components/Books/Books";
import BookCreate from "./components/Books/BookCreate";
import BookUpdate from "./components/Books/BookUpdate";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/books-show" element={<Books />} />
          <Route path="/books-create" element={<BookCreate />} />
          <Route path="/books-update" element={<BookUpdate />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
