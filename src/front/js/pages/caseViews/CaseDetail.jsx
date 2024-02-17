import React from "react";
import ButtonSection from "../common/components/ButtonSection.jsx";
import CostumerData from "./ui/CostumerData.jsx";
import ProfessionalData from "./ui/ProfessionalData.jsx";
import StateDetail from "./ui/StateDetail.jsx";
import CloseDetail from "./ui/CloseDetail.jsx";

const data = {
  name: "Caso#12345",
  create_date: "00/00/0000",
  state: "Activo",
};

const listButtons = [
  {
    label: "editar",
    click: () => {
      console.log("editar");
    },
    icon: "fa-solid fa-user",
  },
];

const CaseDetail = () => {
  return (
    <>
      <div className="w-full flex justify-content-center">
        <div className="flex flex-column gap-5 px-5 py-5 w-full max-container-width">
          <ButtonSection data={data} btnList={listButtons} />
          <CostumerData />
          <ProfessionalData />
          <StateDetail />
          <div className="grid gap-5 justify-content-between">
            <CloseDetail titulo="Datos de cierre" />
            <CloseDetail titulo="Datos de entrega" />
          </div>
        </div>
      </div>
    </>
  );
};

export default CaseDetail;
