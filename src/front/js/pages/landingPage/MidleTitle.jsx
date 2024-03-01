import React from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const MidleTitle = () => {
  
  const navigate = useNavigate();
  return (
    <div className="midle-title text-black text-center font-bold text-5xl mt-8 bg-primary-50 w-full p-7 ">
      Únete a la nueva era de profesionales
      <span className="text-primary-900 ml-2">
        que hacen realidad proyectos extraordinarios
      </span>
      <div className="text-center">
        <Button
          onClick={() => navigate("/register")}
          className=" hover:text-white-alpha-60 text-white px-5 py-3 mt-5 text-center "
          rounded
        >
          Empezar ahora
          <i className="fa-solid fa-arrow-right ml-2 pt-1"></i>
        </Button>
      </div>
    </div>
  );
};

export default MidleTitle;
