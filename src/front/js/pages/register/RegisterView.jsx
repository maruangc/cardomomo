import React, { useState, useContext } from "react";
import { Context } from "../../store/appContext";
import { Navigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

export const Register = () => {
  const { actions, store } = useContext(Context);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [registered, setRegistered] = useState(false);

  const handleRegister = async () => {
    let person = { name: name, email: email, password: password };
    console.log(person);
    const response = await actions.register(person);
    setRegistered(response.ok);
    console.log(registered);
  };

  // Si el registro fue exitoso, redirigir al usuario a la página de inicio de sesión
  //if (registered) {
  //return <Navigate to="/login" />;
  //}

  return (
    <>
      <div className="grid h-screen bg-black-alpha-90">
        <div className="flex flex-column col-7 gap-6 w-6 w-full h-full text-white ml-6 mt-4">
          <div className="header">
            <h1>Formulario de Registro</h1>
            <p>Completa la información y regístrate ahora!</p>
          </div>
          <div className="container w-8 ml-2 ">
            <div className="flex flex-column pt-4 gap-1 font-light">
              <label htmlFor="name">Nombre Completo</label>
              <InputText
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-describedby="name-help"
              />
            </div>

            <div className="flex flex-column pt-4 gap-1 font-light">
              <label htmlFor="email">Correo electrónico</label>
              <InputText
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-describedby="email-help"
              />
            </div>
            <div className="flex flex-column pt-4 gap-1 font-light">
              <label htmlFor="password">Contraseña</label>
              <InputText
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-describedby="password-help"
              />
            </div>

            <div className="button w-4 pt-4 mt-5">
              <Button label="Submit" onClick={handleRegister} />
            </div>
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
          </div>
        </div>

        <div className="flex flex-row col-5 bg-white mt-4">
          <h1>Imagen o logo</h1>
        </div>
      </div>
    </>
  );
};
