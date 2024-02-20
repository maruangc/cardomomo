import React, { useEffect } from "react";
import { Button } from "primereact/button";
import Carousel from "./Carousel.jsx";

import { Ripple } from "primereact/ripple";
import { Divider } from "primereact/divider";
import Navbar from "./Navbar.jsx";
import Cards from "./Cards.jsx";
import Grid from "./Grid.jsx";
import MidleCard from "./MidleCard.jsx";
import Midle from "./Midle.jsx";
import Footer from "../../component/Footer.jsx";

import "primeicons/primeicons.css";

import Aos from "aos";
import "aos/dist/aos.css";

const LandingPage = () => {
  useEffect(() => {
    Aos.init({ duration: 1000, easing: "ease-in-sine" });
  });

  return (
    <div className="w-full">
      <Navbar />
      <div className=" mx-auto bg-blue-100 bg-cover">
        <Carousel />
        <MidleCard />
        <Grid />
        <Midle />
        <Cards />
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
