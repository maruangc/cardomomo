import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../../store/appContext.js";
import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";

const KpiListItems = () => {
  const { actions, store } = useContext(Context);
  const navigate = useNavigate();
  const [dataQuery, setDataQuery] = useState();

  const getDataQuery = async () => {
    const response = await actions.getSummary();
    if (response.msg) {
      toast("token expired");
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
          <div className="grid card gap-3 p-3 surface-300 border-round-md">
            <Card
              title={dataQuery.started}
              className="col flex flex-column text-center"
            >
              <p className="m-0 font-semibold text-lg">Abiertos</p>
            </Card>
            <Card
              title={dataQuery.closed}
              className="col flex flex-column text-center"
            >
              <p className="m-0 font-semibold text-lg">Cerrados</p>
            </Card>
            <Card
              title={dataQuery.delivered}
              className="col flex flex-column text-center"
            >
              <p className="m-0 font-semibold text-lg">Entregados</p>
            </Card>
            <Card
              title={dataQuery.closed - dataQuery.delivered}
              className="col flex flex-column text-center"
            >
              <p className="m-0 font-semibold text-lg">Por entregar</p>
            </Card>
            <Card
              title={dataQuery.unassigned}
              className="col flex flex-column text-center"
            >
              <p className="m-0 font-semibold text-lg">
                Sin profesional asignado
              </p>
            </Card>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default KpiListItems;
