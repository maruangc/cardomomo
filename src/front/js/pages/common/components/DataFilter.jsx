import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

const DataFilter = ({
  setFiltered,
  setFilterFields,
  filterFields,
  setReload,
  reload,
  initialFieldsValues,
  columnFilter,
}) => {
  const [visible, setVisible] = useState(false);

  const handleSubmit = () => {
    setVisible(false);
    setFiltered(filterFields === initialFieldsValues ? false : true);
    setReload(reload + 1);
  };

  const footerModal = (
    <div className="flex justify-content-end gap-3">
      <Button label="Aceptar" onClick={() => handleSubmit()} />
      <Button label="Cancelar" onClick={() => setVisible(false)} />
    </div>
  );

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
      >
        <div className="flex flex-column gap-3 justify-content-between">
          <div className="flex flex-column gap-3">
            {!columnFilter ? (
              <h2>Sin columnas a filtrar</h2>
            ) : (
              <>
                {columnFilter.map((item, index) => {
                  return (
                    <div
                      className="flex flex-column gap-3"
                      key={index + item.field}
                    >
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
                    </div>
                  );
                })}
              </>
            )}
          </div>
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
