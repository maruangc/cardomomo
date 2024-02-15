import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Button } from "primereact/button";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <Button label="Submit" icon="fa-solid fa-check" />
    </>
  );
};
