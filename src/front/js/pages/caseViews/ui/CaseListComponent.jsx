import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";

const CaseListComponent = () => {
  const columns = [
    { field: "id", header: "id" },
    { field: "identification", header: "Identificacion" },
    { field: "name", header: "Nombre" },
    { field: "phone", header: "Telefono" },
    { field: "email", header: "Email" },
    { field: "address", header: "Direccion" },
  ];

  const getCaseList = async () => useEffect(() => {}, []);
  return (
    <>
      <DataTable />
    </>
  );
};

export default CaseListComponent;
