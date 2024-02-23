import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const Carousel = () => {
  const navigate = useNavigate();
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 4000,
    cssEase: "linear",
    arrows: false,
  };
  return (
    <Slider {...settings} className="">
      <div id="slider1" className="banner-container h-30rem ">
        <div className="carousel-card bg-white-alpha-90 opacity-90 w-full ">
          <div className="carousel-text py-1 px-8 ">
            <div className="text-black-alpha-80  w-full ">
              <h2 className=" font-bold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </h2>
              <p className="font-bold ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
            <div className="text-black-alpha-80 h-3rem w-10rem justify-content-end flex mt-6">
              <Button
                onClick={() => navigate("/register")}
                className="bg-white border-2 border-blue-500 text-blue-500"
                label="Join Now"
                rounded
              ></Button>
            </div>
          </div>
        </div>
      </div>
      <div id="slider2" className="banner-container h-30rem">
        <div className="carousel-card bg-white-alpha-90 opacity-90 w-full">
          <div className="carousel-text py-1 px-8">
            <div className="text-black-alpha-80  w-full ">
              <h2 className=" font-bold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </h2>
              <p className="font-bold ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
            <div className="text-black-alpha-80 h-3rem w-10rem justify-content-end flex mt-6">
              <Button
                onClick={() => navigate("/register")}
                className="bg-white border-2 border-blue-500 text-blue-500"
                label="Join Now"
                rounded
              ></Button>
            </div>
          </div>
        </div>
      </div>
      <div id="slider3" className="banner-container h-30rem">
        <div className="carousel-card bg-white-alpha-90 opacity-90 w-full">
          <div className="carousel-text py-1 px-8">
            <div className="text-black-alpha-80  w-full ">
              <h2 className=" font-bold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </h2>
              <p className="font-bold ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
            <div className="text-black-alpha-80 h-3rem w-10rem  justify-content-end flex mt-6">
              <Button
                onClick={() => navigate("/register")}
                className="bg-white border-2 border-blue-500 text-blue-500"
                label="Join Now"
                rounded
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </Slider>
  );
};

export default Carousel;
