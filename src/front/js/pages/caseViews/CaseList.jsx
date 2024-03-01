import React, { useState } from "react";
import KpiListItems from "./ui/KpiListItems.jsx";
// import CaseListComponent from "./ui/CaseListComponent.jsx";
import ListComponent from "../common/components/ListComponent.jsx";
import { refresh } from "aos";

const columns = [
  { field: "case.id", header: "Ticket" },
  { field: "case.created", header: "fecha" },
  { field: "category.category", header: "Categoria" },
  { field: "customer.name", header: "CLiente" },
  { field: "professional.name", header: "Profesional" },
  { field: "typeservice.type_service", header: "Tipo Servicio" },
  { field: "case.started", header: "Iniciado" },
  { field: "case.closed", header: "Cerrado" },
  { field: "case.delivered", header: "Entregado" },
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
    field: "initial_note",
    header: "Nota inicial",
    type: "text",
    table: "",
    nameForDropDown: "",
  },
  {
    field: "description",
    header: "Descripción",
    type: "text",
    table: "",
    nameForDropDown: "",
  },
  {
    field: "close_description",
    header: "Notas al cerrar",
    type: "text",
    table: "",
    nameForDropDown: "",
  },
  {
    field: "delivered_description",
    header: "Notas de la entrega",
    type: "text",
    table: "",
    nameForDropDown: "",
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
    <div className="w-full flex justify-content-center h-full mt-5">
      <div className="flex flex-column gap-5 p-2 w-full max-container-width">
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
