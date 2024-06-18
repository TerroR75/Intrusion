import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import SignIn from "./components/SignIn.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./components/SignUp.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import Auth from "./components/Auth.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
