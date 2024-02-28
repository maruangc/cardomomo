import React, { useState, useContext } from "react";
import { Context } from "../../store/appContext";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import "primeicons/primeicons.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { actions } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await actions.login({
      email: e.target.email.value,
      password: e.target.password.value,
    });
    console.log(response);
    if (response.ok) {
      navigate("/case");
    } else {
      return;
    }
  };

  return (
    <div className="login-container grid">
      <div className="col-12 sm:col-12 md:col-4 flex bg-black-alpha-90">
        <form
          onSubmit={handleSubmit}
          className="flex justify-content-center flex-column w-10 h-full p-3 ml-2"
        >
          <div className="text-left">
            <div className="flex justify-content-center flex-column">
              <h1 className="text-5xl font-bold text-white pb-3">Login</h1>
              <div className="">
                <h5 className="m-0 p-0 pb-4 text-white">Username</h5>
                <InputText id="login-email" name="email" className="w-full" />
              </div>
              <div className="mt-5">
                <h5 className="m-0 p-0 pb-2 text-white">Password</h5>
                <Password
                  inputStyle={{ width: "100%" }}
                  id="password"
                  name="password"
                  toggleMask
                  feedback={false}
                  className="w-full"
                />
              </div>
              <Button
                type="submit"
                label="Login"
                icon=""
                severity="success"
                className="w-10rem mt-6 "
              >
                <i className="fa-solid fa-user pr-3"></i>
              </Button>
              <div className="flex justify-content-between items-center mt-5">
                <p className="text-white">No tienes cuenta?</p>
                <Link to="/register" className=" mt-3 font-bold text-white">
                  Registrate
                </Link>
              </div>
              <Link
                to={"/"}
                className="w-10rem mt-6 text-white flex justify-content-start align-items-center"
              >
                <p className="text-white text-xs m-0 mt-1 mr-2">Go home</p>
                <i className="fa-solid fa-house pr-3 text-white"></i>
              </Link>
            </div>
          </div>
        </form>
      </div>
      <div className="login-right md:col-8 bg-white"></div>
    </div>
  );
};

export default Login;
