import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import SortProvider from "./components/context/ContextSort";
import SignInProvider from "./components/context/ContextSignIn";
import SignUpProvider from "./components/context/ContextSignUp";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SortProvider>
      <SignInProvider>
        <SignUpProvider>
          <App />
        </SignUpProvider>
      </SignInProvider>
    </SortProvider>
  </React.StrictMode>
);
