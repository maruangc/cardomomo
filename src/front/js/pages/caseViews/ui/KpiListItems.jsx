import React from "react";
import { Card } from "primereact/card";

const KpiListItems = () => {
  return (
    <div className="flex flex-column gap-3">
      <p className="text-xl font-bold">KPI</p>
      <div className="grid card gap-3 p-3 surface-300 border-round-md">
        <Card
          title="Casos abiertos"
          className="col flex flex-column text-center"
        >
          <p className="m-0 font-semibold text-lg">1 Abiertos</p>
        </Card>
        <Card
          title="Casos cerrados"
          className="col flex flex-column text-center"
        >
          <p className="m-0 font-semibold text-lg">1 Abiertos</p>
        </Card>
        <Card
          title="Casos por entregar"
          className="col flex flex-column text-center"
        >
          <p className="m-0 font-semibold text-lg">1 Abiertos</p>
        </Card>
        <Card
          title="Casos sin profesional asignado"
          className="col flex flex-column text-center"
        >
          <p className="m-0 font-semibold text-lg">1 Abiertos</p>
        </Card>
      </div>
    </div>
  );
};

export default KpiListItems;
