import React, { useEffect } from "react";
import { Card } from "primereact/card";
import { Image } from "primereact/image";
import { Button } from "primereact/button";
import { Ripple } from "primereact/ripple";
import { Divider } from "primereact/divider";
import { TabView, TabPanel } from "primereact/tabview";
import Aos from "aos";
import "aos/dist/aos.css";

const Grid = () => {
  useEffect(() => {
    Aos.init({ duration: 1000, easing: "ease-in-sine" });
  });
  return (
    <>
      <div className=" pb-2 py-8 mx-2">
        <div className="grid gap-8 justify-content-center items-center py-4 ">
          <Card className="w-20rem h-18rem bg-white col-4 text-center shadow-2">
            <i className="fa-solid text-5xl text-primary-900 fa-globe"></i>
            <h3 className="text-black-alpha-90">Worldwide</h3>
            <p className="m-0 text-black-alpha-90">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Inventore sed consequuntur error repudiandae numquam deserunt
              quisquam repellat libero asperiores earum nam nobis.
            </p>
          </Card>
          <Card className="w-20rem h-18rem  bg-white col-4 text-center shadow-2">
            <i className="fa-solid text-5xl text-primary-900 fa-location-dot"></i>
            <h3 className="text-black-alpha-90">Worldwide</h3>
            <p className="m-0 text-black-alpha-90">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Inventore sed consequuntur error repudiandae numquam deserunt
              quisquam repellat libero asperiores earum nam nobis.
            </p>
          </Card>
          <Card className="w-20rem h-18rem  bg-white col-4 text-center shadow-2">
            <i className="fa-solid text-5xl text-primary-900 fa-arrow-trend-up"></i>
            <h3 className="text-black-alpha-90">Worldwide</h3>
            <p className="m-0 text-black-alpha-90">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Inventore sed consequuntur error repudiandae numquam deserunt
              quisquam repellat libero asperiores earum nam nobis.
            </p>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Grid;
