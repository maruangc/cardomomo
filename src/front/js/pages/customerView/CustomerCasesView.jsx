import React from "react";
import ListComponent from "../common/components/ListComponent.jsx";

const columns = [
  { field: "case.id", header: "Ticket" },
  { field: "case.created", header: "fecha" },
  { field: "category.category", header: "Categoria" },
  //   { field: "customer.name", header: "CLiente" },
  { field: "professional.name", header: "Profesional" },
  { field: "typeservice.type_service", header: "Tipo Servicio" },
  //   { field: "case.started", header: "Iniciado" },
  //   { field: "case.closed", header: "Cerrado" },
  //   { field: "case.delivered", header: "Entregado" },
];

const initialFieldsValues = false;

const CustomerCasesView = ({ id }) => {
  return (
    <div className="w-full flex justify-content-center h-full mt-5">
      <div className="flex flex-column gap-5 p-2 w-full max-container-width">
        <ListComponent
          initialFieldsValues={initialFieldsValues}
          table="customer"
          columns={columns}
          columnFilter={columns}
          initialValue={initialFieldsValues}
          createColumn={columns}
          setCheckValues={columns}
          checkValues={columns}
          id={id}
        />
      </div>
    </div>
  );
};

export default CustomerCasesView;
