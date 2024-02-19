import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Paginator } from "primereact/paginator";

const columns = [
  { field: "id", header: "id" },
  { field: "identification", header: "Identificacion" },
  { field: "name", header: "Nombre" },
  { field: "phone", header: "Telefono" },
  { field: "email", header: "Email" },
  { field: "address", header: "Direccion" },
];

const rickMortyColumns = [
  { field: "id", header: "id" },
  { field: "name", header: "Name" },
];

const CustomerList = () => {
  const [characterList, setCharacterList] = useState([]);
  const [metaData, setMetaData] = useState({});
  const [first, setFirst] = useState(1);
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(10);

  const getRickAndMortyCharacters = async (
    endpoint = "https://rickandmortyapi.com/api/character"
  ) => {
    const response = await fetch(endpoint);
    const data = await response.json();
    setCharacterList(data.results);
    setMetaData(data.info);
    setRows(10);
  };

  const header = (
    <div className="flex flex-row justify-content-between">
      <p>Logo</p>
      <Button label="boton" />
    </div>
  );

  useEffect(() => {
    getRickAndMortyCharacters();
  }, []);
  return (
    <div className=" max-container-width mx-auto">
      <DataTable
        value={characterList}
        tableStyle={{ minWidth: "70rem" }}
        size="normal"
        stripedRows
        className="py-5 text-center"
        selectionMode="single"
        onSelectionChange={(e) => console.log(e.value)}
        scrollable
        scrollHeight="70vh"
      >
        {rickMortyColumns.map((col) => {
          return (
            <Column
              key={col.field}
              field={col.field}
              header={col.header}
              sortable
            />
          );
        })}
      </DataTable>
      <Paginator
        first={first}
        rows={rows}
        totalRecords={metaData?.count}
        onPageChange={(e) => {
          setFirst(e.first);
          setPage(e.page);
          getRickAndMortyCharacters(
            `https://rickandmortyapi.com/api/character?page=${e.page + 1}`
          );
          console.log("pagina :", page);
        }}
      />
    </div>
  );
};
export default CustomerList;
