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
              <h1 className="text-5xl font-bold text-white pb-3"><span class="text-primary-500">Bien</span>venido</h1>
              <div className="">
                <h5 className="m-0 p-0 pb-2 text-white">Email</h5>
                <InputText id="login-email" name="email" className="w-full" />
              </div>
              <div className="mt-5">
                <h5 className="m-0 p-0 pb-2 text-white">Contraseña</h5>
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
                rounded
                className="w-10rem  mt-6 hover:text-white-alpha-60 text-white px-5 py-3 mt-3 text-cente "
              >
                <i className="fa-solid fa-user ml-3"></i>
              </Button>
              <div className="flex justify-content-between items-center mt-5">
                <p className="text-white">No tienes cuenta?</p>
                <Link
                  to="/register"
                  className="hover:text-white-alpha-60 mt-3 font-bold text-primary-500"
                >
                  Registrate
                </Link>
              </div>
            </div>
            <Button
              onClick={() => navigate("/")}
              rounded
              className="bg-transparent  hover:text-white-alpha-60 text-white px-5 py-3 mt-6 "
            >
              <i className=" fa-solid fa-house pr-2 mb-1 text-white "></i> Home
            </Button>
          </div>
        </form>
      </div>
      <div className="login-right md:col-8 bg-black-alpha-70">
    
        <div
          class="w-full h-full bg-center bg-cover  "
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
          }}
        >
          <div class="flex align-items-center justify-content-center w-full h-full bg-black-alpha-70 ">
            <div class="text-center">
              <h1 class="text-5xl font-semibold text-white">
                Tu gestion de
                <span class="text-primary-500"> Servicios</span> a un nuevo nivel
              </h1>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
