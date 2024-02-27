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
  { field: "id", header: "id", type: "text" },
  { field: "customer_id", header: "id CLiente", type: "text" },
  { field: "professional_id", header: "id Profesional", type: "text" },
  { field: "category_id", header: "Categoria", type: "text" },
  { field: "typeservice_id", header: "Tipo", type: "drop" },
  { field: "is_active", header: "Activo", type: "check" },
  { field: "started", header: "Iniciado", type: "check" },
  { field: "closed", header: "Cerrado", type: "check" },
  { field: "delivered", header: "Entregado", type: "check" },
];

const initialFieldsValues = {
  id: "",
  is_active: "",
  customer_id: "",
  professional_id: "",
  category_id: "",
  started: "",
  typeservice_id: "",
  closed: "",
  delivered: "",
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
