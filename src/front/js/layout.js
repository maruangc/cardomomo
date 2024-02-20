import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { BackendURL } from "./component/backendURL";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "/style.scss";

//prime react
import { PrimeReactProvider } from "primereact/api";
import { Register } from "./pages/register/RegisterView.jsx";

import injectContext from "./store/appContext";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;

  return (
    <div>
      <BrowserRouter basename={basename}>
        <PrimeReactProvider>
          <ToastContainer />
          <Routes>
            <Route element={<Register />} path="/register" />
            <Route element={<h1>Not found!</h1>} path="*" />
          </Routes>
        </PrimeReactProvider>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
