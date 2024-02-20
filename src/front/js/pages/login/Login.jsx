import React, { useState, useContext } from "react";
import { Context } from "../../store/appContext";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "primeicons/primeicons.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);

  const handleSubmit = (e) => {
    e.preventDefault();
    actions.login({
      email: e.target.email.value,
      password: e.target.password.value,
    });
    if (store) {
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="login-container grid">
      <div className="col-12 sm:col-12 md:col-6 flex pt-7 bg-blue-100 justify-content-center">
        <form onSubmit={handleSubmit}>
          <Card className=" shadow-8 w-25rem h-27rem mt-4">
            <div className="flex flex-column ml-7 text-left">
              <h1 className="text-4xl font-bold text-teal-900 pb-3">Login</h1>
              <div className="">
                <h5 className="m-0 p-0">Username</h5>
                <InputText id="email" name="email" />
              </div>
              <div className="mt-5">
                <h5 className="m-0 p-0">Password</h5>
                <InputText id="password" name="password" tabIndex={1} />
              </div>
            </div>
            <div className="flex justify-content-center pt-2 ">
              <Button
                type="submit"
                label="Start"
                icon=""
                severity="success"
                className="w-10rem mt-5 bg-teal-900"
              >
                <i className="fa-solid fa-user pr-3"></i>
              </Button>
            </div>
          </Card>
        </form>
      </div>
      <div className="login-right col-12 sm:col-12 md:col-6 text-blue-100 bg-teal-700"></div>
    </div>
  );
};

export default Login;
