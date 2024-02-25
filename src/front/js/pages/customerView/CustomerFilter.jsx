import React, { useState, useContext } from "react";
import { Context } from "../../store/appContext";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

const CustomeFilter = ({
  setFiltered,
  setFilterFields,
  filterFields,
  filtered,
  initialFieldsValues,
}) => {
  const { store } = useContext(Context);
  const [visible, setVisible] = useState(false);

  const handleSubmit = () => {
    setVisible(false);
    setFiltered(filterFields === initialFieldsValues ? 0 : filtered + 1);
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
          onClick={() => setVisible(true)}
        />
        <Button
          size="small"
          rounded
          label="Limpiar filtro"
          onClick={() => setFiltered(0)}
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
            <label htmlFor="identification">identification</label>
            <InputText
              name="identification"
              value={filterFields.identification}
              onChange={(e) =>
                setFilterFields({
                  ...filterFields,
                  identification: e.target.value,
                })
              }
            />
          </div>
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
        </div>
      </Dialog>
    </div>
  );
};

export default CustomeFilter;
