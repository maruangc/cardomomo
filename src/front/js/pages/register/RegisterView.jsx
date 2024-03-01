import React, { useState, useContext } from "react";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";


export const Register = () => {
  const navigate = useNavigate();
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
    return navigate("/login");
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
                <h1 className="text-4xl font-bold text-white pb-2"><span class="text-primary-500">Regis</span>trate</h1>
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
                <h5 className="m-0 p-0 pb-2 text-white">Contraseña</h5>
                <Password
                  inputStyle={{ width: "100%" }}
                  id="password"
                  name="password"
                  toggleMask
                  feedback={true}
                  className="w-full"
                />
              </div>
              <p className="text-red-500">{notice}</p>
              <div className="flex justify-content-between items-center mt-6">
                
              <Button
                type="submit"
                label="Registrar"
                rounded
                className="w-10rem hover:text-white-alpha-60 text-white px-5 py-3 mt-3 text-cente "
              >
                <i className="fa-solid fa-user ml-3"></i>
              </Button>
              <Button
                onClick={() => navigate("/login")}
                rounded
                className="hover:text-white-alpha-60 text-white px-5 py-3 mt-3 "
              >
              <i class="fa-solid fa-arrow-left mr-2"></i>  Volver
              </Button>
              </div> 
              <Button
                onClick={() => navigate("/")}
                rounded
                className="hover:text-white-alpha-60 text-white px-5 py-3 mt-5  bg-transparent"
              >
              <i class="fa-solid fa-home mr-2 mb-1"></i>  Home
              </Button>
            </div>
          </form>
        </div>

        <div className="login-right md:col-8 bg-black-alpha-70 ">
        <div
          class="w-full h-full bg-center bg-cover"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
          }}
        >
          <div class="flex align-items-center justify-content-center w-full h-full bg-black-alpha-70 ">
            <div class="text-center">
              <h1 class="text-5xl font-semibold text-white">
                <span class="text-primary-500"> Innovación</span> en cada inicio <span class="text-primary-500"> Excelencia</span> en cada entrega
              </h1>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};
