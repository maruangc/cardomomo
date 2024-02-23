import React from "react";

import { Image } from "primereact/image";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
const Midle = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className=" pb-2 pt-8">
        <div className="flex py-4 w-full ">
          <div className="w-full h-15rem bg-white  ">
            <Image
              src="https://primefaces.org/cdn/primereact/images/galleria/galleria7.jpg"
              alt="Image"
              width="100%"
              height="100%"
            />
          </div>
          <div className="w-full h-15rem px-4 bg-white pt-1  ">
            <h3 className="text-black-alpha-90">Worldwide</h3>
            <p className="m-0 text-black-alpha-90 pb-3">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Inventore sed consequuntur error repudiandae numquam deserunt
              quisquam repellat libero asperiores earum nam nobis.
            </p>
            <Button
              onClick={() => navigate("/register")}
              className="bg-white border-2 border-blue-500 text-blue-500"
              label="Join Now"
              rounded
            ></Button>
          </div>
          <div className="w-full h-15rem bg-white ">
            <Image
              src="https://primefaces.org/cdn/primereact/images/galleria/galleria7.jpg"
              alt="Image"
              width="100%"
              height="100%"
            />
          </div>
          <div className="w-full h-15rem px-4 bg-white pt-1 ">
            <h3 className="text-black-alpha-90 ">Worldwide</h3>
            <p className="m-0 text-black-alpha-90 pb-3 ">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Inventore sed consequuntur error repudiandae numquam deserunt
              quisquam repellat libero asperiores earum nam nobis.
            </p>
            <Button
              onClick={() => navigate("/register")}
              className="bg-white border-2 border-blue-500 text-blue-500"
              label="Join Now"
              rounded
            ></Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Midle;
