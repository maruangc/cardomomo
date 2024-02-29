import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../../store/appContext.js";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { toast } from "react-toastify";

const EditData = ({ fields, setFields, reload, setReload, table, id }) => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const handleSubmit = async () => {
    let objetoAEnviar = {};
    const a = fields.map((item) => {
      objetoAEnviar = { ...objetoAEnviar, [item.field]: item.value };
    });
    console.log("objeto a enviar: ", objetoAEnviar);
    const response = await actions.updateById(table, id, objetoAEnviar);
    if (response.msg) {
      toast("token expired");
      navigate("/login");
    }
    if (response.ok) {
      toast(response.data);
      setReload(reload + 1);
      setVisible(false);
    }
  };

  const footerModal = (
    <div className="flex justify-content-end gap-3">
      <Button
        label="Aceptar"
        rounded
        onClick={() => {
          handleSubmit();
        }}
      />
      <Button
        label="Cancelar"
        rounded
        onClick={() => {
          setReload(reload + 1);
          setVisible(false);
        }}
      />
    </div>
  );

  const changeElement = (e, item) => {
    const updatedFields = [...fields]; // Copiamos todos los campos anteriores
    const indexToUpdate = updatedFields.findIndex(
      (field) => field.field === item.field
    );
    if (indexToUpdate !== -1) {
      updatedFields[indexToUpdate].value = e.target.value; // Actualizamos el valor del campo específico
      setFields(updatedFields); // Actualizamos el estado con el nuevo array
    }
  };

  return (
    <>
      <Button
        label="Editar"
        icon="fa-solid fa-pen-to-square"
        onClick={() => setVisible(true)}
        rounded
      />
      <Dialog
        header="Editar"
        visible={visible}
        style={{ width: "60vw" }}
        onHide={() => setVisible(false)}
        footer={footerModal}
      >
        <div className="flex flex-column gap-3 justify-content-between">
          {!fields ? (
            <h2>Sin columnas a filtrar</h2>
          ) : (
            <>
              {fields.map((item, index) => {
                return (
                  <div
                    className="flex flex-column gap-3"
                    key={index + item.field}
                  >
                    <>
                      <label htmlFor={item.field}>{item.header}</label>
                      <InputText
                        name={item.field}
                        value={item.value == null ? "" : item.value}
                        onChange={(e) => changeElement(e, item)}
                      />
                    </>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </Dialog>
    </>
  );
};

export default EditData;
