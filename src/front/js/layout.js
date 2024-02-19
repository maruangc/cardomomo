import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { BackendURL } from "./component/backendURL";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "/style.scss";

//prime react
import { PrimeReactProvider } from "primereact/api";

/* Components */
import injectContext from "./store/appContext";
import CaseDetail from "./pages/caseViews/CaseDetail.jsx";
import Navbar from "./component/NavBar.jsx";
import CustomerDetails from "./pages/customerView/CustomerDetails.jsx";
import ProfessionalDetail from "./pages/professionalView/ProfessionalDetail.jsx";
import CustomerList from "./pages/customerView/CustomerList.jsx";
import CaseEdit from "./pages/caseViews/CaseEdit.jsx";

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
            {/* CASES ROUTES */}
            <Route element={<Navbar />} path="/">
              <Route
                path=""
                element={<h1 className="text-center">Lista de casos</h1>}
              />
              <Route path="detail" element={<CaseDetail />} />
              <Route path="edit/:id" element={<CaseEdit />} />
              <Route element={<h1>Not found Casos!</h1>} path="*" />
            </Route>

            {/* CUSTOMER ROUTES  */}
            <Route element={<Navbar />} path="/customer">
              <Route path="" element={<CustomerList />} />
              <Route path="detail" element={<CustomerDetails />} />
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
