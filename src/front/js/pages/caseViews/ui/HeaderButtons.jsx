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
  dataCustomer,
  setStatusCase,
  statusCase,
  setState,
  data,
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
        <h2>Caso #{id} </h2>
        <p className="text-md">{created}</p>
        <div className="flex gap-3 align-items-center">
          <p className="text-md">{status}</p>
          <p className="text-md text-bold">
            {data.case.is_active ? (
              <span className="text-green-400 font-bold	text-xl">ACTIVO</span>
            ) : (
              <span className="text-red-600	 font-bold text-xl">INACTIVO</span>
            )}
          </p>
        </div>
      </div>
      <div className="flex gap-5">
        <Button
          rounded
          label="Iniciar caso"
          onClick={() => {
            setState("started", id);
          }}
          disabled={statusCase != "created" || !data.case.is_active}
        />
        <CloseCaseModal
          closeModalvalue={closeModalvalue}
          setCloseModalValue={setCloseModalValue}
          setState={setState}
          statusCase={statusCase}
          data={data}
        />

        <Button
          rounded
          label="Editar"
          onClick={() => navigate(`/case/edit/${id}`)}
        />
      </div>
    </section>
  );
};

export default HeaderButtons;
