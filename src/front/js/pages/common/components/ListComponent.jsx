import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../../store/appContext.js";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import DataFilter from "./DataFilter.jsx";
import { Button } from "primereact/button";
import { toast } from "react-toastify";

const ListComponent = ({
  initialFieldsValues, //({}) se define en el view de la lista
  table, //(string) para referirse a la ruta para ir al detalle
  columns, //({}) se crea nuevo en el view de la lista
  columnFilter,
}) => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const [dataQuery, setDataQuery] = useState();
  const [filtered, setFiltered] = useState(false);
  const [filterFields, setFilterFields] = useState(initialFieldsValues);
  const [reload, setReload] = useState(0);
  const [first, setFirst] = useState(0);
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(10);
  const [count, setCount] = useState(0);

  const handleReload = () => {
    if (filterFields === initialFieldsValues) {
      setReload(reload + 1);
    } else {
      getDataQuery();
    }
  };

  const header = (
    <div className="flex flex-row justify-content-between">
      <DataFilter
        setFiltered={setFiltered}
        setReload={setReload}
        reload={reload}
        setFilterFields={setFilterFields}
        filterFields={filterFields}
        initialFieldsValues={initialFieldsValues}
        columnFilter={columnFilter}
      />
      <Button
        icon="fa-solid fa-rotate-right"
        rounded
        size="small"
        onClick={() => handleReload()}
      />
    </div>
  );

  const getDataQuery = async (offset = 0) => {
    let response;
    if (filtered === false) {
      response = await actions.getAll(table, 10, offset);
    } else {
      response = await actions.getFilter(table, filterFields, 0, offset);
    }
    if (response.msg) {
      toast("token expired");
      navigate("/login");
    }
    if (response.ok) {
      setDataQuery(response.data);
      setCount(response.count);
      setRows(10);
    }
  };

  useEffect(() => {
    getDataQuery();
  }, [reload]);

  return (
    <div className=" max-container-width mx-auto">
      <DataTable
        value={dataQuery}
        header={header}
        stripedRows
        selectionMode="single"
        onSelectionChange={(e) => navigate(`/${table}/detail/${e.value.id}`)}
      >
        {columns.map((col) => {
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
        template={{ layout: "PrevPageLink PageLinks NextPageLink" }}
        first={first}
        rows={rows}
        page={page}
        totalRecords={count}
        onPageChange={(e) => {
          setPage(e.page);
          setRows(e.rows);
          setFirst(e.first);
          getDataQuery(e.first);
        }}
      />
    </div>
  );
};

export default ListComponent;
