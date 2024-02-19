import React, { useEffect } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Ripple } from "primereact/ripple";
import { Divider } from "primereact/divider";
import Aos from "aos";
import "aos/dist/aos.css";

const Cards = () => {
  const header = (
    <img
      alt="Card"
      src="https://primefaces.org/cdn/primereact/images/usercard.png"
    />
  );
  const footer = (
    <>
      <Button label="$10/month" icon="pi pi-check" />
    </>
  );

  useEffect(() => {
    Aos.init({ duration: 1000, easing: "ease-in-sine" });
  });
  return (
    <>
      <div className=" pb-5 mx-2">
        <h1 className="text-center text-black-alpha-70 text-5xl py-5">
          Elige tu plan ideal!
        </h1>
        <div className="grid gap-5 justify-content-center items-center py-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 ">
          <Card
            title="Advanced Card "
            subTitle="Card subtitle"
            footer={footer}
            header={header}
            className="w-20rem col-4 text-center shadow-8"
          >
            <p className="m-0">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Inventore sed consequuntur error repudiandae numquam deserunt
              quisquam repellat libero asperiores earum nam nobis, culpa ratione
              quam perferendis esse, cupiditate neque quas!
            </p>
          </Card>
          <Card
            title="Advanced Card "
            subTitle="Card subtitle"
            footer={footer}
            header={header}
            className="w-20rem col-4 text-center shadow-8"
          >
            <p className="m-0">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Inventore sed consequuntur error repudiandae numquam deserunt
              quisquam repellat libero asperiores earum nam nobis, culpa ratione
              quam perferendis esse, cupiditate neque quas!
            </p>
          </Card>
          <Card
            title="Advanced Card"
            subTitle="Card subtitle"
            footer={footer}
            header={header}
            className="w-20rem col-4 text-center shadow-8"
          >
            <p className="m-0">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Inventore sed consequuntur error repudiandae numquam deserunt
              quisquam repellat libero asperiores earum nam nobis, culpa ratione
              quam perferendis esse, cupiditate neque quas!
            </p>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Cards;
