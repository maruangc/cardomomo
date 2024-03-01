import React from "react";
import ListComponent from "../common/components/ListComponent.jsx";

const columns = [
  { field: "identification", header: "Identificacion" },
  { field: "name", header: "Nombre" },
  { field: "phone", header: "Telefono" },
  { field: "email", header: "Email" },
  { field: "address", header: "Dirección" },
];

const columnFilter = [
  { field: "identification", header: "Identificacion", type: "text" },
  { field: "name", header: "Nombre", type: "text" },
  { field: "phone", header: "Telefono", type: "text" },
  { field: "email", header: "Email", type: "text" },
  { field: "address", header: "Dirección", type: "text" },
  { field: "comment", header: "Comentario", type: "text" },
];

const initialFieldsValues = {
  identification: "",
  name: "",
  phone: "",
  email: "",
  address: "",
};

const CustomerList = () => {
  return (
    <div className="w-full flex justify-content-center h-full">
      <div className="flex flex-column gap-5 p-5 w-full max-container-width">
        <ListComponent
          initialFieldsValues={initialFieldsValues}
          table="customer"
          columns={columns}
          columnFilter={columnFilter}
          createColumn={columnFilter}
          initialValue={initialFieldsValues}
        />
      </div>
    </div>
  );
};
export default CustomerList;
