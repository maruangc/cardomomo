import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Context } from "../../../store/appContext";
import { Button } from "primereact/button";
/* Data */
import dataJson from "../caseData.json";
import CloseCaseModal from "./CloseCaseModal.jsx";

const statusData = dataJson.data.status;
const caseData = dataJson.data.case;

const HeaderButtons = ({
  closeModalvalue,
  setCloseModalValue,
  isStarted,
  isClosed,
  isDelivered,
  dataQuery,
  dataCustomer,
  setStatusCase,
  statusCase,
  setState,
}) => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  const { id } = useParams();

  const created = actions.getDate(caseData.created);

  const status = isDelivered
    ? "ENTREGADO"
    : isClosed
    ? "CERRADO"
    : isStarted
    ? "INICIADO"
    : "CREADO";

  return (
    <section className="flex flex-row justify-content-between align-items-center">
      <div>
        <h2>Caso #{caseData.id} </h2>
        <p className="text-md">{created}</p>
        <p className="text-md">{status}</p>
      </div>
      <div className="flex gap-5">
        <Button
          rounded
          label="Editar"
          onClick={() => navigate("/case/edit/1")}
        />
        <CloseCaseModal
          closeModalvalue={closeModalvalue}
          setCloseModalValue={setCloseModalValue}
          dataQuery={dataQuery}
          setState={setState}
          statusCase={statusCase}
        />
        <Button
          rounded
          label="Iniciar caso"
          onClick={() => {
            setState("started", id);
          }}
          disabled={statusCase != "created"}
        />
      </div>
    </section>
  );
};

export default HeaderButtons;
