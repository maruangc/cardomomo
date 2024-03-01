import React from "react";

import { Button } from "primereact/button";
import { Image } from "primereact/image";
import { useNavigate, Outlet } from "react-router-dom";
import Footergeneral from "../../component/LandingFooter.jsx";

const LandingNavbar = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="card flex justify-content-between text-white-alpha-90 bg-primary-black">
        <div className="pl-5">
          <h3 className="text-2xl font-bold ">
            <i class="fa-solid fa-seedling mr-2 text-primary-500"></i>Servy
            <span class="text-primary-500">Track</span>
          </h3>
        </div>
        <div className="flex justify-content-center items-center">
          <Button
            onClick={() => navigate("/login")}
            href="https://react.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent  border-transparent mr-2  font-bold"
          >
            <i className="mr-2 mb-1 fa-solid fa-user text-white"></i> Login
          </Button>
          <Button
            onClick={() => navigate("/register")}
            href="https://react.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent  border-transparent mr-2  font-bold"
          >
            <i className="mr-2 mb-1 fa-solid fa-plus text-white"></i> Register
          </Button>
        </div>
      </div>
      <Outlet />
      <Footergeneral />
    </>
  );
};

export default LandingNavbar;
