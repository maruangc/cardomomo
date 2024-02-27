import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";

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
  const [visible, setVisible] = useState(false);
  const [checked, setChecked] = useState(false);

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
            setFilterFields(initialFieldsValues);
            setVisible(true);
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
        <div className="flex flex-column gap-3 justify-content-between">
          {/* <div className="flex flex-column gap-3"> */}
          {!columnFilter ? (
            <h2>Sin columnas a filtrar</h2>
          ) : (
            <>
              {inputs.map((item, index) => {
                return (
                  <div
                    className="flex flex-column gap-3"
                    key={index + item.field}
                  >
                    <>
                      <label htmlFor={item.field}>{item.header}</label>
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
                  </div>
                );
              })}
              <div className="flex flex-wrap">
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
                          setCheckValues({
                            ...checkValues,
                            [item.field]: e.checked,
                          });
                        }}
                      />
                      <label htmlFor={item.field} className="ml-2">
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
