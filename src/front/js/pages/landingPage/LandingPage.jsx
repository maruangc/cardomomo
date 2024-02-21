import React, { useEffect } from "react";

import Carousel from "./Carousel.jsx";

import Cards from "./Cards.jsx";
import Grid from "./Grid.jsx";
import MidleCard from "./MidleCard.jsx";
import Midle from "./Midle.jsx";

import "primeicons/primeicons.css";

import Aos from "aos";
import "aos/dist/aos.css";
import Footergeneral from "../../component/Footergeneral.jsx";

const LandingPage = () => {
  useEffect(() => {
    Aos.init({ duration: 1000, easing: "ease-in-sine" });
  });

  return (
    <div className="w-full">
      <div className=" mx-auto bg-blue-100 bg-cover">
        <Carousel />
        {/* <MidleCard /> */}
        <Midle />
        <Grid />
        {/* <Cards /> */}
        <Footergeneral />
      </div>
    </div>
  );
};

export default LandingPage;
