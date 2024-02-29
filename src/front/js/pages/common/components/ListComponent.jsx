import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../../store/appContext.js";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import DataFilter from "./DataFilter.jsx";
import { Button } from "primereact/button";
import { toast } from "react-toastify";
import CreateModal from "./CreateModal.jsx";
import CreateCaseModal from "../../caseViews/ui/CreateCaseModal.jsx";

const ListComponent = ({
  initialFieldsValues, //({}) se define en el view de la lista
  table, //(string) para referirse a la ruta para ir al detalle
  columns, //({}) se crea nuevo en el view de la lista
  columnFilter,
  createColumn,
  initialValue,
  checkValues,
  setCheckValues,
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

  if (!checkValues) {
    checkValues = {};
    setCheckValues = {};
  }

  const handleReload = () => {
    if (filterFields === initialFieldsValues) {
      setReload(reload + 1);
    } else {
      getDataQuery();
    }
  };

  const header = (
    <div className="flex flex-row justify-content-between ">
      <div className="flex gap-3">
        <DataFilter
          setFiltered={setFiltered}
          setReload={setReload}
          reload={reload}
          setFilterFields={setFilterFields}
          filterFields={filterFields}
          initialFieldsValues={initialFieldsValues}
          columnFilter={columnFilter}
          checkValues={checkValues}
          setCheckValues={setCheckValues}
        />
        <Button
          icon="fa-solid fa-rotate-right"
          label="Actualizar"
          rounded
          size="small"
          onClick={() => handleReload()}
        />
      </div>

      {table != "case" ? (
        <>
          <CreateModal
            handleReload={handleReload}
            table={table}
            createColumn={createColumn}
            initialValue={initialValue}
          />
        </>
      ) : (
        <>
          <CreateCaseModal handleReload={handleReload} />
        </>
      )}
    </div>
  );

  const editFieldQuery = (response) => {
    if (response.ok) {
      const newDataQuery = response.data.map((dataList) => {
        // if (dataList.case && typeof dataList.case.created !== "undefined") {
        if (dataList.case && dataList.case.created) {
          return {
            ...dataList,
            case: {
              ...dataList.case,
              created: actions.getDate(dataList.case.created),
              date_init: actions.getDate(dataList.case.date_init),
              close_date: actions.getDate(dataList.case.close_date),
              delivered_date: actions.getDate(dataList.case.delivered_date),
            },
          };
        } else {
          return dataList;
        }
      });
      setDataQuery(newDataQuery);
    }
  };

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
      editFieldQuery(response);
    }
  };

  useEffect(() => {
    getDataQuery();
  }, [reload]);

  console.log("dataQuery: ", dataQuery);

  return (
    <div className="w-full mx-auto">
      <DataTable
        value={dataQuery}
        header={header}
        stripedRows
        selectionMode="single"
        onSelectionChange={(e) => {
          navigate(
            `/${table}/detail/${!e.value.id ? e.value.case.id : e.value.id}`
          );
        }}
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
