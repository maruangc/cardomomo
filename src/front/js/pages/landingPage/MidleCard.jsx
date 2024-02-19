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
    <div className="card flex justify-content-start gap-3 bg-white p-4 pb-5">
      <div className="text-black-alpha-80 w-full">
        <h1 className=" font-bold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </h1>
      </div>
      <div className="text-black-alpha-80 w-full">
        <h4 className=" font-bold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At pariatur
          ut, eum est cupiditate laboriosam quo laudantium error quisquam aut,
          quia minus sequi atque architecto dolores facere
        </h4>
        <Button
          label="Get Started"
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
