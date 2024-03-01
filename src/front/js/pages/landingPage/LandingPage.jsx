import React, { useEffect } from "react";
import Hero from "./Carousel.jsx";
import Grid from "./Grid.jsx";
import Midle from "./Midle.jsx";
import MidleTitle from "./MidleTitle.jsx";


import "primeicons/primeicons.css";

import Aos from "aos";
import "aos/dist/aos.css";

const LandingPage = () => {
  useEffect(() => {
    Aos.init({ duration: 1000, easing: "ease-in-sine" });
  });

  return (
    <div className="w-full">
      <div className=" mx-auto  bg-cover">
        <Hero />
        <div className="mx-6">
          <Midle />
        </div>
        <MidleTitle />
        <Grid />
      </div>
    </div>
  );
};

export default LandingPage;
