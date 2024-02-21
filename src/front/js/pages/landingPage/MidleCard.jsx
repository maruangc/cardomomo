import React, { useEffect } from "react";
import { Button } from "primereact/button";
import { Ripple } from "primereact/ripple";
import Aos from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";

const MidleCard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    Aos.init({ duration: 1000, easing: "ease-in-sine" });
  });

  return (
    <div className="banner-container px-6 h-30rem">
      <div className="flex justify-content-start">
        <div className="text-black-alpha-80 w-full mt-3">
          <h2 className=" font-bold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h2>
          <p className="font-bold ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <div className="text-black-alpha-80 h-3rem justify-content-end flex mt-6">
          <Button
            onClick={() => navigate("/register")}
            className="bg-white border-2 border-blue-500 text-blue-500"
            label="Join Now"
            rounded
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default MidleCard;
