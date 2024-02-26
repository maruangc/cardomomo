import React from "react";
import ListComponent from "../common/components/ListComponent.jsx";

const columns = [
  { field: "id", header: "id" },
  { field: "identification", header: "Identificacion" },
  { field: "name", header: "Nombre" },
  { field: "phone", header: "Telefono" },
  { field: "email", header: "Email" },
];

const columnFilter = [
  { field: "identification", header: "Identificacion", type: "text" },
  { field: "name", header: "Nombre", type: "text" },
  { field: "phone", header: "Telefono", type: "text" },
  { field: "email", header: "Email", type: "text" },
  { field: "address", header: "Direccion", type: "text" },
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
    <ListComponent
      initialFieldsValues={initialFieldsValues}
      table="customer"
      columns={columns}
      columnFilter={columnFilter}
      createColumn={columnFilter}
      initialValue={initialFieldsValues}
    />
  );
};
export default CustomerList;
