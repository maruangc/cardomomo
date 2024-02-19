import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "primeicons/primeicons.css";

const Login = () => {
  const [value, setValue] = useState("");

  return (
    <div className="login-container grid">
      <div className="col-12 sm:col-12 md:col-6 flex pt-7 bg-blue-100 justify-content-center">
        <Card className=" shadow-8 w-25rem h-27rem mt-4">
          <div className="flex flex-column ml-7 text-left">
            <h1 className="text-4xl font-bold text-teal-900 pb-3">Login</h1>
            <div className="">
              <h5 className="m-0 p-0">Username</h5>
              <InputText
                id="username"
                name="username"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <div className="mt-5">
              <h5 className="m-0 p-0">Password</h5>
              <Password
                value={value}
                onChange={(e) => setValue(e.target.value)}
                feedback={false}
                tabIndex={1}
              />
            </div>
          </div>
          <div className="flex justify-content-center pt-2 ">
            <Button
              label="Start"
              icon=""
              severity="success"
              className="w-10rem mt-5 bg-teal-900"
            >
              <i className="fa-solid fa-user pr-3"></i>
            </Button>
          </div>
        </Card>
      </div>
      <div className="login-right col-12 sm:col-12 md:col-6 text-blue-100 bg-teal-700"></div>
    </div>
  );
};

export default Login;
