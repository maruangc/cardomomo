import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { BackendURL } from "./component/backendURL";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "/style.scss";

//prime react
import { PrimeReactProvider } from "primereact/api";
import { Register } from "./pages/register/RegisterView.jsx";

import LandingPage from "./pages/landingPage/LandingPage.jsx";
import Login from "./pages/login/Login.jsx";
/* Components */
import injectContext from "./store/appContext";
import CaseDetail from "./pages/caseViews/CaseDetail.jsx";
import Navbar from "./component/NavBar.jsx";
import CustomerDetails from "./pages/customerView/CustomerDetails.jsx";
import ProfessionalDetail from "./pages/professionalView/ProfessionalDetail.jsx";
import CustomerList from "./pages/customerView/CustomerList.jsx";
import CaseEdit from "./pages/caseViews/CaseEdit.jsx";
import CaseList from "./pages/caseViews/CaseList.jsx";
import LandingNavbar from "./pages/landingPage/LandingNavbar.jsx";

const Layout = () => {
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;

  return (
    <div>
      <BrowserRouter basename={basename}>
        <PrimeReactProvider>
          <ToastContainer />
          <Routes>
            {/* Login and Register routes */}
            <Route element={<Login />} path="/login" />
            <Route element={<Register />} path="/register" />
            {/* Landing page */}
            <Route element={<LandingNavbar />} path="/">
              <Route element={<LandingPage />} path="/" />
            </Route>

            {/* CASES ROUTES */}
            <Route element={<Navbar />} path="/case">
              <Route path="" element={<CaseList />} />
              <Route path="detail/:id" element={<CaseDetail />} />
              <Route path="edit/:id" element={<CaseEdit />} />
              <Route element={<h1>Not found Casos!</h1>} path="*" />
            </Route>

            {/* CUSTOMER ROUTES  */}
            <Route element={<Navbar />} path="/customer">
              <Route path="" element={<CustomerList />} />
              <Route path="detail/:id" element={<CustomerDetails />} />
              <Route element={<h1>Not found Clientes!</h1>} path="*" />
            </Route>

            {/* PROFESSIONAL ROUTES */}
            <Route element={<Navbar />} path="/professional">
              <Route path="" element={<CustomerList />} />
              <Route path="detail" element={<ProfessionalDetail />} />
              <Route element={<h1>Not found Professional!</h1>} path="*" />
            </Route>
            <Route element={<h1>Not found General!</h1>} path="*" />
          </Routes>
        </PrimeReactProvider>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
