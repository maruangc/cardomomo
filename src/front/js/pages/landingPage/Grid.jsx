import React, { useEffect } from "react";
import { Card } from "primereact/card";

import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

import Aos from "aos";
import "aos/dist/aos.css";

const Grid = () => {
  const navigate = useNavigate();
  useEffect(() => {
    Aos.init({ duration: 1000, easing: "ease-in-sine" });
  });
  return (
    <>
    <div className="py-8">
      <div className="  mx-2">
        <div className="grid gap-8 justify-content-center items-center py-4 ">
          <Card className="w-20rem h-18rem bg-white col-4 text-center shadow-6 hover:shadow-8">
            <i className="fa-solid text-5xl text-primary-800 fa-globe"></i>
            <h3 className="text-black-alpha-90">Conectividad</h3>
            <p className="m-0 text-gray-800 ">
              Nuestra plataforma no solo gestiona tus proyectos, sino que
              también conecta equipos, fomenta la colaboración y desbloquea el
              potencial creativo.
            </p>
          </Card>
          <Card className="w-20rem h-18rem  bg-white col-4 text-center shadow-6 hover:shadow-8">
            <i class="fa-solid fa-gears text-5xl text-primary-800"></i>
            <h3 className="text-black-alpha-90">Eficiencia</h3>
            <p className="m-0 text-gray-800">
              Nuestra plataforma está diseñada para simplificar tus flujos de
              trabajo, organizar tus equipos y asegurar que cada proyecto se
              complete a la perfección.
            </p>
          </Card>
          <Card className="w-20rem h-18rem  bg-white col-4 text-center shadow-6 hover:shadow-8">
            <i className="fa-solid text-6xl text-primary-800 fa-arrow-trend-up"></i>
            <h3 className="text-black-alpha-90">Crecimiento</h3>
            <p className="m-0 text-gray-800">
              Combinamos flexibilidad con control, permitiéndote adaptar cada
              proyecto a tus necesidades específicas. te ayudamos a que cada uno
              sobrepase las expectativas.
            </p>
          </Card>
        </div>
      </div>
    </div>
    </>
  );
};

export default Grid;
