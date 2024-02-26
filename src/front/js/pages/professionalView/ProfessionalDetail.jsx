import React from "react";
import ButtonSection from "../common/components/ButtonSection.jsx";
import PersonDetails from "../common/components/PersonDetails.jsx";

const data = {
  name: "Kevin Pacheco",
  create_date: "00/00/0000",
};

const listButtons = [
  {
    label: "Editar",
    click: () => {
      console.log("editar cliente");
    },
    icon: "fa-solid fa-user",
  },
  {
    label: "Borrar",
    click: () => {
      console.log("borrar cliente");
    },
    icon: "",
  },
];

const personData = {
  label: "Detalle de Profesional",
  prefix: "profesional",
};

const ProfessionalDetail = () => {
  return (
    <div className="w-full flex justify-content-center h-full">
      <div className="flex flex-column gap-5 px-5 py-5 w-full max-container-width">
        <ButtonSection data={data} btnList={listButtons} />
        <PersonDetails data={personData} />
      </div>
    </div>
  );
};

export default ProfessionalDetail;
