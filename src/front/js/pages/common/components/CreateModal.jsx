import React, { useState, useContext } from "react";
import { Context } from "../../../store/appContext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateModal = ({ table, handleReload, createColumn, initialValue }) => {
  const navigate = useNavigate();
  const { actions } = useContext(Context);
  const [visible, setVisible] = useState(false);
  const [modalField, setModalField] = useState(initialValue);

  const handleSubmit = async () => {
    const response = await actions.insertInTable(table, modalField);
    if (response.msg) {
      toast("Token expired");
      navigate("/login");
    }
    if (response.ok) {
      setVisible(false);
      setModalField(initialValue);
      handleReload();
    }
    toast(response.data);
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
      <Button label="Cancelar" rounded onClick={() => setVisible(false)} />
    </div>
  );

  return (
    <>
      <Button
        label="Crear"
        rounded
        icon="fa-solid fa-circle-plus"
        size="small"
        onClick={() => setVisible(true)}
      />
      <Dialog
        header="Crear nuevo elemento"
        visible={visible}
        style={{ width: "40vw" }}
        onHide={() => setVisible(false)}
        footer={footerModal}
      >
        <div className="flex flex-column gap-3">
          {createColumn.map((item, index) => {
            return (
              <div key={index + item.field} className="flex flex-column gap-3">
                <label htmlFor={item.field}>{item.header}</label>
                <InputText
                  name={item.field}
                  value={modalField[item.field]}
                  onChange={(e) =>
                    setModalField({
                      ...modalField,
                      [item.field]: e.target.value,
                    })
                  }
                />
              </div>
            );
          })}
        </div>
      </Dialog>
    </>
  );
};

export default CreateModal;
