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
    <div className="my-8">
      <ListComponent
        initialFieldsValues={initialFieldsValues}
        table="category"
        columns={columns}
        columnFilter={columnFilter}
        createColumn={columnFilter}
        initialValue={initialFieldsValues}
      />
    </div>
  );
};
export default CategoryList;
