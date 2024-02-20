import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../../store/appContext";
import { Button } from "primereact/button";
/* Data */
import dataJson from "../caseData.json";
import CloseCaseModal from "./CloseCaseModal.jsx";

const statusData = dataJson.data.status;
const caseData = dataJson.data.case;

const HeaderButtons = ({
  handleClose,
  closeModalvalue,
  setCloseModalValue,
}) => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  const created = actions.getDate(caseData.created);

  return (
    <section className="flex flex-row justify-content-between align-items-center">
      <div>
        <h2>Caso #{caseData.id} </h2>
        <p className="text-md">{created}</p>
        <p className="text-md">{statusData.status}</p>
      </div>
      <div className="flex gap-5">
        <Button rounded label="Editar" onClick={() => navigate("/edit/1")} />
        <CloseCaseModal
          handleClose={handleClose}
          closeModalvalue={closeModalvalue}
          setCloseModalValue={setCloseModalValue}
        />
      </div>
    </section>
  );
};

export default HeaderButtons;
