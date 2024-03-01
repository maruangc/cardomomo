import React from "react";

import { Image } from "primereact/image";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
const Midle = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className=" pb-2 pt-7 ">
        <div className="flex w-full shadow-6 ">
          <div className="w-10 bg-white">
            <Image
              src="https://img.freepik.com/foto-gratis/vista-lateral-anciano-gafas-mirando-otro-lado_23-2148269381.jpg?t=st=1709244775~exp=1709248375~hmac=238f7c2daf791cb6d89bf8d3a781447f44025433cd87cb31332bcf7db6cdeef2&w=900"
              alt="Image"
              width="100%"
              height="100%"
              round
            />
          </div>
          <div className="w-10 px-4 bg-white pt-1 text-center">
            <div className="p-3">
              <h3 className="text-black-alpha-90 text-xl">
                Resultados Excepcionales
              </h3>
              <p className="m-0 text-gray-500 pb-3 text-md p-1 ">
                Eleva tus proyectos a nuevas alturas con nuestra solución
                avanzada de gestión. Hecha para los innovadores, los creadores,
                y los solucionadores de problemas, nuestra plataforma te
                empodera para gestionar con inteligencia, prever desafíos y
                superarlos con soluciones creativas. Únete a la nueva era de
                profesionales que hacen realidad proyectos extraordinarios.
              </p>
            </div>
          </div>
          <div className="w-10 bg-white ">
            <Image
              src="https://img.freepik.com/foto-gratis/joven-mecanico-que-trabaja-su-taller_23-2148970733.jpg?t=st=1709244851~exp=1709248451~hmac=6a52ac1d617880d5e5dec1dda894716042a3c65bc672e49903331e1cb100bc84&w=900"
              alt="Image"
              width="100%"
              height="100%"
            />
          </div>
          <div className="w-10 px-4 bg-white pt-1 text-center">
            <div className="p-3 ">
              <h3 className="text-black-alpha-90 text-xl p-1">
                Domina tus Proyectos con Precisión
              </h3>
              <p className="m-0 text-gray-500 pb-3  text-md ">
                Descubre la plataforma definitiva en gestión de proyectos,
                diseñada específicamente para profesionales y técnicos que
                buscan excelencia. Con nuestra herramienta, transforma la
                complejidad en claridad, lleva tus proyectos desde el concepto
                hasta la conclusión con eficiencia y celebra el éxito en cada
                entrega.
              </p>
            </div>
          </div>
        </div>
        <h1 className="text-black-alpha-80 text-center text-5xl mt-8">
          Únete a la nueva era de profesionales que hacen realidad proyectos
          extraordinarios
        </h1>
      </div>
    </>
  );
};

export default Midle;
