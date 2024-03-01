import { Button } from "primereact/button";
import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <>
      <header>
        <div
          class="w-full bg-center bg-cover  h-30rem"
          style={{
            backgroundImage: `url(https://img.freepik.com/foto-gratis/collage-diferentes-fotos-concepto-ocupacion-diferente_185193-109584.jpg?w=1380&t=st=1709244293~exp=1709244893~hmac=27414d87103e8516c1a2e684940634ce1fb1087ce1e63e6dccddcbeab49a59f6)`,
          }}
        >
          <div class="flex align-items-center justify-content-center w-full h-full bg-black-alpha-60 ">
            <div class="text-center">
              <h1 class="text-3xl font-semibold text-white lg:text-4xl">
                Una solución desarrollada para una nueva
                <span class="text-primary-600"> metodología</span> laboral
              </h1>
              <Button
                onClick={() => navigate("/register")}
                className=" hover:text-white-alpha-60 text-white px-5 py-3 mt-3 text-cente "
                rounded
              >
                Empezar ahora
                <i className="fa-solid fa-arrow-right ml-2 pt-1"></i>
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
export default Hero;
