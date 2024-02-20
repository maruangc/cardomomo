import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Image } from "primereact/image";

const Carousel = () => {
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
      <div id="slider1">
        <Image
          src="https://img.freepik.com/vector-premium/fondo-diseno-banner-ancho-azul-redes-digitales-diseno-banner-3d-abstracto-fondo-geometrico-tecnologia-azul-oscuro-ilustracion-vectorial_181182-27921.jpg"
          alt="Image"
          width="100%"
          height="400"
        />
      </div>
      <div id="slider2">
        <Image
          src="https://www.adobe.com/es/express/create/background/media_17128efc2f7fcf14a52e2a1c9712dfc2c4f834597.jpeg?width=750&format=jpeg&optimize=medium"
          alt="Image"
          width="100%"
          height="400"
        ></Image>
      </div>
      <div id="slider3">
        <Image
          src="https://static.vecteezy.com/system/resources/thumbnails/000/701/690/small/abstract-polygonal-banner-background.jpg"
          alt="Image"
          width="100%"
          height="400"
        />
      </div>
      <div id="slider4">
        <Image
          src="https://i.pinimg.com/originals/47/25/94/4725945feb0214c458718aad71a4f95b.jpg"
          alt="Image"
          width="100%"
          height="400"
        />
      </div>
    </Slider>
  );
};

export default Carousel;
