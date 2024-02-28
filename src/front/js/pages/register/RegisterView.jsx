import React, { useState, useContext } from "react";
import { Context } from "../../store/appContext";
import { Navigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";

export const Register = () => {
  const { actions } = useContext(Context);
  const [registered, setRegistered] = useState(false);
  const [notice, setNotice] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();
    let person = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
    };
    console.log(person);
    const response = await actions.register(person);
    if (response.ok) {
      setRegistered(response.ok);
    } else {
      setNotice(response.error);
    }
  };

  // Si el registro fue exitoso, redirigir al usuario a la página de inicio de sesión
  if (registered) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="login-container grid">
        <div className="col-12 sm:col-12 md:col-4 flex bg-black-alpha-90">
          <form
            onSubmit={handleRegister}
            className="flex justify-content-center flex-column w-10 h-full p-3 ml-2"
          >
            <div className="text-left">
              <div className="flex justify-content-center flex-column">
                <h1 className="text-4xl font-bold text-white pb-3">Register</h1>
                <div className="mt-5">
                  <h5 className="m-0 p-0 pb-2 text-white">Nombre Completo</h5>
                  <InputText id="name" name="name" className="w-full" />
                </div>
              </div>
              <div className="mt-5">
                <h5 className="m-0 p-0 pb-2 text-white">Email</h5>
                <InputText id="email" name="email" className="w-full" />
              </div>
              <div className="mt-5">
                <h5 className="m-0 p-0 pb-2 text-white">Password</h5>
                <Password
                  inputStyle={{ width: "100%" }}
                  id="password"
                  name="password"
                  tabIndex={1}
                  toggleMask
                  feedback={true}
                  className="w-full"
                />
              </div>
              <Button
                type="submit"
                label="Registrar"
                icon=""
                severity="success"
                className="w-10rem mt-6 "
              >
                <i className="fa-solid fa-user pr-3"></i>
              </Button>
            </div>
          </form>
        </div>

        <div className="login-right md:col-8 bg-white"></div>
      </div>
      v
    </>
  );
};
