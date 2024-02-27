import React from "react";
import ListComponent from "../common/components/ListComponent.jsx";

const columns = [
  { field: "id", header: "id" },
  { field: "category", header: "Categoria" },
  { field: "description", header: "Descripcion" },
];

const columnFilter = [
  { field: "category", header: "Categoria", type: "text" },
  { field: "description", header: "Descripcion", type: "text" },
];

const initialFieldsValues = {
  category: "",
  description: "",
};

const CategoryList = () => {
  return (
    <div className="w-full flex justify-content-center h-full">
      <div className="flex flex-column gap-5 p-5 w-full max-container-width">
        <ListComponent
          initialFieldsValues={initialFieldsValues}
          table="category"
          columns={columns}
          columnFilter={columnFilter}
          createColumn={columnFilter}
          initialValue={initialFieldsValues}
        />
      </div>
    </div>
  );
};
export default CategoryList;
