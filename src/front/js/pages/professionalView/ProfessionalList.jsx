import React from "react";
import ListComponent from "../common/components/ListComponent.jsx";

const columns = [
  { field: "id", header: "id" },
  { field: "identification", header: "Identificacion" },
  { field: "name", header: "Nombre" },
  { field: "profession", header: "Profesion" },
  { field: "phone", header: "Telefono" },
  { field: "email", header: "Email" },
  // { field: "address", header: "Direccion" },
];

const columnFilter = [
  { field: "identification", header: "Identificacion", type: "text" },
  { field: "name", header: "Nombre", type: "text" },
  { field: "profession", header: "Profesion", type: "text" },
  { field: "phone", header: "Telefono", type: "text" },
  { field: "email", header: "Email", type: "text" },
  { field: "address", header: "Direccion", type: "text" },
];

const initialFieldsValues = {
  identification: "",
  name: "",
  profession: "",
  phone: "",
  email: "",
  address: "",
};

const ProfessionalList = () => {
  return (
    <ListComponent
      initialFieldsValues={initialFieldsValues}
      table="professional"
      columns={columns}
      columnFilter={columnFilter}
    />
  );
};
export default ProfessionalList;
