import React, { useState } from "react";
import KpiListItems from "./ui/KpiListItems.jsx";
// import CaseListComponent from "./ui/CaseListComponent.jsx";
import ListComponent from "../common/components/ListComponent.jsx";

const columns = [
  { field: "case.id", header: "Ticket" },
  { field: "case.created", header: "fecha" },
  { field: "category.category", header: "Categoria" },
  { field: "case.customer_id", header: "id CLiente" },
  { field: "case.professional_id", header: "id Profesional" },
  { field: "case.typeservice_id", header: "Tipo" },
  { field: "case.started", header: "Iniciado" },
];

const columnFilter = [
  {
    field: "id",
    header: "Ticket",
    type: "int",
    table: "",
    nameForDropDown: "",
  },
  {
    field: "customer_id",
    header: "CLiente",
    type: "drop",
    table: "customer",
    nameForDropDown: "name",
  },
  {
    field: "professional_id",
    header: "Profesional",
    type: "drop",
    table: "professional",
    nameForDropDown: "name",
  },
  {
    field: "category_id",
    header: "Categoria",
    type: "drop",
    table: "category",
    nameForDropDown: "category",
  },
  {
    field: "typeservice_id",
    header: "Tipo",
    type: "drop",
    table: "/tables/type",
    nameForDropDown: "type_service",
  },
  {
    field: "is_active",
    header: "Activo",
    type: "check",
    table: "",
    nameForDropDown: "",
  },
  {
    field: "started",
    header: "Iniciado",
    type: "check",
    table: "",
    nameForDropDown: "",
  },
  {
    field: "closed",
    header: "Cerrado",
    type: "check",
    table: "",
    nameForDropDown: "",
  },
  {
    field: "delivered",
    header: "Entregado",
    type: "check",
    table: "",
    nameForDropDown: "",
  },
];

const initialFieldsValues = {
  id: null,
  is_active: null,
  customer_id: null,
  professional_id: null,
  category_id: null,
  started: null,
  typeservice_id: null,
  closed: null,
  delivered: null,
};

const CaseList = () => {
  const [checkValues, setCheckValues] = useState({
    is_active: false,
    started: false,
    closed: false,
    delivered: false,
  });

  return (
    <div className="w-full flex justify-content-center h-full">
      <div className="flex flex-column gap-5 p-5 w-full max-container-width">
        <KpiListItems />
        <ListComponent
          initialFieldsValues={initialFieldsValues}
          table="case"
          columns={columns}
          columnFilter={columnFilter}
          initialValue={initialFieldsValues}
          createColumn={columnFilter}
          setCheckValues={setCheckValues}
          checkValues={checkValues}
        />
      </div>
    </div>
  );
};

export default CaseList;
