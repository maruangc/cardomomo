import React, { useState, useContext } from "react";
import { Context } from "../../../store/appContext.js";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Checkbox } from "primereact/checkbox";
import FilterDrop from "./FilterDrop.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DataFilter = ({
  setFiltered,
  setFilterFields,
  filterFields,
  setReload,
  reload,
  initialFieldsValues,
  columnFilter,
  setCheckValues,
  checkValues,
}) => {
  const { actions } = useContext(Context);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [columnCase, setColumnCase] = useState();

  const handleSubmit = () => {
    setVisible(false);
    setFiltered(filterFields === initialFieldsValues ? false : true);
    setReload(reload + 1);
  };

  const footerModal = (
    <div className="flex justify-content-end gap-3">
      <Button label="Aceptar" rounded onClick={() => handleSubmit()} />
      <Button label="Cancelar" rounded onClick={() => setVisible(false)} />
    </div>
  );

  const onClickButtonFilter = async () => {
    setFilterFields(initialFieldsValues);
    if (typeof setCheckValues === "function") {
      //Solo se cumple cuando viene de case
      setCheckValues({
        is_active: false,
        started: false,
        closed: false,
        delivered: false,
      });
      for (const item of columnFilter) {
        if (item.table != "") {
          const response = await actions.getAll(item.table, 0, 0);
          if (response.ok) {
            item.data = response.data;
          } else {
            toast(response.msg);
            navigate("/login");
          }
        }
      }
    }
    setVisible(true);
  };

  const inputs = columnFilter.filter((item) => item.type != "check");
  const checks = columnFilter.filter((item) => item.type == "check");

  return (
    <div className="card flex justify-content-center">
      <div className="flex gap-3">
        <Button
          rounded
          label="Filtrar"
          size="small"
          icon="fa-solid fa-filter"
          onClick={() => {
            onClickButtonFilter();
          }}
        />
        <Button
          size="small"
          icon="fa-solid fa-filter-circle-xmark"
          rounded
          label="Quitar filtro"
          onClick={() => {
            setFiltered(false);
            setReload(reload + 1);
          }}
        />
      </div>
      <Dialog
        visible={visible}
        style={{ width: "60vw" }}
        onHide={() => setVisible(false)}
        footer={footerModal}
        header="Opciones de filtrado"
      >
        <div className="flex flex-column gap-1 justify-content-between">
          {/* <div className="flex flex-column gap-3"> */}
          {!columnFilter ? (
            <h2>Sin columnas a filtrar</h2>
          ) : (
            <>
              {inputs.map((item, index) => {
                return (
                  <div
                    className="flex flex-column gap-1"
                    key={index + item.field}
                  >
                    <>
                      <label htmlFor={item.field}>{item.header}</label>
                      {item.type == "text" ? (
                        <>
                          <InputText
                            name={item.field}
                            value={filterFields[item.field]}
                            onChange={(e) =>
                              setFilterFields({
                                ...filterFields,
                                [item.field]: e.target.value,
                              })
                            }
                          />
                        </>
                      ) : (
                        <>
                          {item.type == "drop" ? (
                            <>
                              <FilterDrop
                                data={item.data}
                                nameForDropDown={item.nameForDropDown}
                                field={item.field}
                                header={item.header}
                                setFilterFields={setFilterFields}
                                filterFields={filterFields}
                              />
                            </>
                          ) : (
                            <>
                              <InputNumber
                                name={item.field}
                                value={filterFields[item.field]}
                                onValueChange={(e) =>
                                  setFilterFields({
                                    ...filterFields,
                                    [item.field]: e.target.value,
                                  })
                                }
                              />
                            </>
                          )}
                        </>
                      )}
                    </>
                  </div>
                );
              })}
              <div className="flex flex-wrap gap-4">
                {checks.map((item, index) => {
                  return (
                    <div
                      key={index + item.field}
                      className="flex align-items-center"
                    >
                      <Checkbox
                        name={item.field}
                        checked={checkValues[item.field]}
                        onChange={(e) => {
                          {
                            setFilterFields({
                              ...filterFields,
                              [item.field]: e.checked,
                            });
                            setCheckValues({
                              ...checkValues,
                              [item.field]: e.checked,
                            });
                          }
                        }}
                      />
                      <label htmlFor={item.field} className="ml-1">
                        {item.header}
                      </label>
                    </div>
                  );
                })}
              </div>
            </>
          )}
          {/* </div> */}
        </div>
      </Dialog>
    </div>
  );
};

export default DataFilter;

/*
          <div className="flex flex-column gap-3">
            <label htmlFor="id">Name</label>
            <InputText
              name="name"
              value={filterFields.name}
              onChange={(e) =>
                setFilterFields({ ...filterFields, name: e.target.value })
              }
            />
          </div>
          <div className="flex flex-column gap-3">
            <label htmlFor="id">email</label>
            <InputText
              name="email"
              value={filterFields.email}
              onChange={(e) =>
                setFilterFields({ ...filterFields, email: e.target.value })
              }
            />
          </div>
          <div className="flex flex-column gap-3">
            <label htmlFor="id">Phone</label>
            <InputText
              name="phone"
              value={filterFields.phone}
              onChange={(e) =>
                setFilterFields({ ...filterFields, phone: e.target.value })
              }
            />
          </div>
          <div className="flex flex-column gap-3">
            <label htmlFor="id">Address</label>
            <InputText
              name="address"
              value={filterFields.address}
              onChange={(e) =>
                setFilterFields({ ...filterFields, address: e.target.value })
              }
            />
          </div>
          */
