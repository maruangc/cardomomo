import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Context } from "../../../store/appContext";
import { Button } from "primereact/button";
/* Data */
import dataJson from "../caseData.json";
import CloseCaseModal from "./CloseCaseModal.jsx";
import Delete from "../../common/components/Delete.jsx";
import { toast } from "react-toastify";

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
  reload,
  setReload,
}) => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  const { id } = useParams();

  const created = actions.getDate(caseData.created);

  const status = isDelivered
    ? "Entregado"
    : isClosed
    ? "Cerrado"
    : isStarted
    ? "Iniciado"
    : "Creado";

  const buttonStart = async () => {
    if (data.case.started) {
      const response = await actions.setEstate(id, {
        started: false,
      });
      if (response.ok) {
        toast.success("Reversado el inicio");
      } else {
        toast.error(response.error);
      }
    } else {
      setState("started", id);
    }
    setReload(reload + 1);
  };

  return (
    <section className="flex flex-row justify-content-between align-items-center">
      <div>
        <h2>Caso #{id} </h2>
        <p className="text-md">{created}</p>
        <div className="flex gap-3 align-items-center">
          <p className="text-md text-bold">
            {data.case.is_active ? (
              <span className="text-green-400 font-bold	text-md">Activo</span>
            ) : (
              <span className="text-red-600	 font-bold text-xl">INACTIVO</span>
            )}
          </p>
          <p className="text-md">{status}</p>
        </div>
      </div>
      <div className="flex gap-5">
        <Button
          label="Volver"
          icon="fa-solid fa-circle-chevron-left"
          rounded
          className="w-min"
          onClick={() => navigate(-1)}
        ></Button>
        <Button
          rounded
          label={data.case.started ? "Revertir Inicio" : "Iniciar caso"}
          icon={
            data.case.started ? "fa-solid fa-rotate-left" : "fa-solid fa-play"
          }
          onClick={() => {
            buttonStart();
          }}
          disabled={data.case.closed || !data.case.is_active}
        />
        <CloseCaseModal
          closeModalvalue={closeModalvalue}
          setCloseModalValue={setCloseModalValue}
          setState={setState}
          statusCase={statusCase}
          data={data}
          reload={reload}
          setReload={setReload}
        />
        {data.case.is_active ? (
          <>
            <Delete table={"case"} id={id} />
          </>
        ) : (
          <></>
        )}
        <Button
          rounded
          label="Editar"
          icon="fa-solid fa-pen-to-square"
          onClick={() => navigate(`/case/edit/${id}`)}
        />
      </div>
    </section>
  );
};

export default HeaderButtons;
