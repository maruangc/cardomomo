import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../../store/appContext.js";
import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { toast } from "react-toastify";

const KpiListItems = () => {
  const { actions, store } = useContext(Context);
  const navigate = useNavigate();
  const [dataQuery, setDataQuery] = useState();

  const getDataQuery = async () => {
    const response = await actions.getSummary();
    if (response.msg) {
      toast.error("Credencial vencida");
      navigate("/login");
    }
    if (response.ok) {
      setDataQuery(response.data);
    }
  };

  useEffect(() => {
    getDataQuery();
  }, [store.refreshKpi]);

  return (
    <div className="flex flex-column gap-3">
      {dataQuery ? (
        <>
          <div className="grid gap-3 p-4 surface-100 border-solid border-2	border-300	border-round-xl">
            <div className="col flex w-full bg-white p-4 border-round-md gap-5 border-solid border-2	border-300">
              <div className="flex flex-column justify-content-between">
                <p className="m-0  text-md">Numero de casos abiertos</p>
                <p className="text-2xl font-bold">{dataQuery.started} Casos</p>
              </div>
              <div>
                <i className="fa-solid fa-circle-play text-600 text-xl p-4  border-circle	surface-200"></i>
              </div>
            </div>
            <div className="col flex w-full bg-white p-4 border-round-md gap-5 border-solid border-2	border-300">
              <div className="flex flex-column justify-content-between">
                <p className="m-0  text-md">Numero de casos cerrados</p>
                <p className="text-2xl font-bold">{dataQuery.closed} Casos</p>
              </div>
              <div>
                <i className="fa-solid fa-circle-minus text-600 text-xl p-4  border-circle	surface-200"></i>
              </div>
            </div>
            <div className="col flex w-full bg-white p-4 border-round-md gap-5 border-solid border-2	border-300">
              <div className="flex flex-column justify-content-between">
                <p className="m-0  text-md">Numero de casos entregados</p>
                <p className="text-2xl font-bold">
                  {dataQuery.delivered} Casos
                </p>
              </div>
              <div>
                <i className="fa-solid fa-circle-check text-600 text-xl p-4  border-circle	surface-200"></i>
              </div>
            </div>
            <div className="col flex w-full bg-white p-4 border-round-md gap-5 border-solid border-2	border-300">
              <div className="flex flex-column justify-content-between">
                <p className="m-0  text-md">Numero de casos por entregar</p>
                <p className="text-2xl font-bold">
                  {dataQuery.closed - dataQuery.delivered} Casos
                </p>
              </div>
              <div>
                <i className="fa-solid fa-circle-right text-600 text-xl p-4  border-circle	surface-200"></i>
              </div>
            </div>
            <div className="col flex w-full bg-white p-4 border-round-md gap-5 border-solid border-2	border-300">
              <div className="flex flex-column justify-content-between">
                <p className="m-0  text-md">Casos sin profesional asignado </p>
                <p className="text-2xl font-bold">
                  {dataQuery.unassigned} Casos
                </p>
              </div>
              <div>
                <i className="fa-solid fa-circle-exclamation text-600 text-xl p-4  border-circle	surface-200"></i>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default KpiListItems;

/* 
              title={dataQuery.closed}
              title={dataQuery.delivered}
              title={dataQuery.closed - dataQuery.delivered}
              title={dataQuery.unassigned}

*/

/* 
              <p className="m-0 font-semibold text-lg">Cerrados</p>
              <p className="m-0 font-semibold text-lg">Entregados</p>
              <p className="m-0 font-semibold text-lg">Por entregar</p>
              <p className="m-0 font-semibold text-lg">Sin profesional asignado </p>
*/
