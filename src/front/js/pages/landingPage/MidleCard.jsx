import React, { useEffect } from "react";
import { Button } from "primereact/button";
import { Ripple } from "primereact/ripple";
import Aos from "aos";
import "aos/dist/aos.css";

const MidleCard = () => {
  useEffect(() => {
    Aos.init({ duration: 1000, easing: "ease-in-sine" });
  });

  return (
    <div className="card flex justify-content-start bg-white px-6 h-10rem">
      <div className="text-black-alpha-80 w-full mt-3">
        <h2 className=" font-bold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </h2>
        <p className="font-bold ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
      <div className="text-black-alpha-80 w-8 justify-content-end flex mt-6">
        <Button
          label="Join Now"
          className="w-10rem h-3rem bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 border-blue-500 rounded"
        >
          <i className="fa-solid fa-arrow-right"></i>
          <Ripple />
        </Button>
      </div>
    </div>
  );
};

export default MidleCard;
