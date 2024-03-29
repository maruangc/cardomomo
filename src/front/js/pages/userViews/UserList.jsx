import React, { useState } from "react";
import ListComponent from "../common/components/ListComponent.jsx";

const columns = [
  { field: "id", header: "id" },
  { field: "email", header: "Correo" },
  { field: "name", header: "Nombre" },
  { field: "created", header: "Fecha creado" },
  { field: "is_active", header: "Activo" },
];

const columnFilter = [
  { field: "email", header: "Correo", type: "text" },
  { field: "name", header: "Nombre", type: "text" },
  {
    field: "is_active",
    header: "Activo?",
    type: "check",
  },
];

const createColumn = [
  { field: "email", header: "Correo", type: "text" },
  { field: "name", header: "Nombre", type: "text" },
  { field: "password", header: "Password", type: "text" },
];

const initialFieldsValues = {
  email: "",
  name: "",
  password: "",
  is_active: true,
};

const UserList = () => {
  const [checkValues, setCheckValues] = useState({
    is_active: true,
  });

  return (
    <div className="w-full flex justify-content-center h-full">
      <div className="flex flex-column gap-5 p-5 w-full max-container-width">
        <ListComponent
          initialFieldsValues={initialFieldsValues}
          table="user"
          columns={columns}
          columnFilter={columnFilter}
          createColumn={createColumn}
          initialValue={initialFieldsValues}
          checkValues={checkValues}
          setCheckValues={setCheckValues}
        />
      </div>
    </div>
  );
};
export default UserList;
