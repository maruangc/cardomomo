import React, { useState, useContext } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

export const Register = () => {
  return (
    <>
      <div className="grid h-screen bg-black-alpha-90">
        <div className="flex flex-column col-7 gap-6 w-6 w-full h-full text-white ml-6 mt-4">
          <div className="header">
            <h1>Formulario de Registro</h1>
            <p>Completa la información y registrate ahora!</p>
          </div>
          <div className="container w-8 ml-2 ">
            <div className="flex flex-column pt-4 gap-1 font-light">
              <label htmlFor="username">Nombre Completo</label>
              <InputText id="name" aria-describedby="name-help" />
            </div>

            <div className="flex flex-column pt-4 gap-1 font-light">
              <label htmlFor="email">Correo electrónico</label>
              <InputText id="email" aria-describedby="email-help" />
            </div>
            <div className="flex flex-column pt-4 gap-1 font-light">
              <label htmlFor="password">Contraseña</label>
              <InputText id="password" aria-describedby="password-help" />
            </div>

            <div className="button w-4 pt-4 mt-5">
              <Button label="Submit" />
            </div>
          </div>
        </div>

        <div className="flex flex-row col-5 bg-white mt-4">
          <h1>Imagen o logo</h1>
        </div>
      </div>
    </>
  );
};
