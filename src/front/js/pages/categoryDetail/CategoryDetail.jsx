import React from "react";

const CategoryDetail = () => {
  return <div>CategoryDetail</div>;
};

export default CategoryDetail;

// import React, { useState, useEffect, useContext } from "react";

// import { Context } from "../../store/appContext";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { Paginator } from "primereact/paginator";

// const columns = [
//   { field: "category", header: "Categoria" },
//   { field: "description", header: "Descripcion" },
//   { field: "actions", header: "Acciones" },
// ];

// const initialFieldsValues = {
//   category: "",
//   description: "",
//   accions: "",
// };
// const CategoryDetails = () => {
//   const { store, actions } = useContext(Context);
//   const [categories, setCategories] = useState();
//   const [count, setCount] = useState(0);
//   const [rows, setRows] = useState(10);

//   const getCategories = async (offset = 0) => {
//     let response;
//     if (filtered === 0) {
//       response = await actions.getAll("category", 10, offset);
//     } else {
//       response = await actions.getFilter("category", filterFields, 0, offset);
//     }
//     if (response.ok) {
//       setCategories(response.data);
//       setCount(response.count);
//       setRows(10);
//     }
//     setFilterFields(initialFieldsValues);
//   };

//   useEffect(() => {
//     getCategories();
//   }, [filtered]);

//   return (
//     <div className=" max-container-width mx-auto">
//       <DataTable
//         value={categories}
//         header={header}
//         stripedRows
//         selectionMode="single"

//         // scrollable scrollHeight="70vh"
//       >
//         {columns.map((col) => {
//           return (
//             <Column
//               key={col.field}
//               field={col.field}
//               header={col.header}
//               sortable
//             />
//           );
//         })}
//       </DataTable>
//       <Paginator
//         template={{ layout: "PrevPageLink PageLinks NextPageLink" }}
//         first={first}
//         rows={rows}
//         page={page}
//         totalRecords={count}
//         onPageChange={(e) => {
//           console.log(e);
//           setPage(e.page);
//           setRows(e.rows);
//           setFirst(e.first);
//           getCustomers(e.first);
//         }}
//       />
//     </div>
//   );
// };

// export default CategoryDetails;
