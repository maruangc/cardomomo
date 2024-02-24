import React, { useState, useContext } from "react";
import { Context } from "../../../store/appContext";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useParams } from "react-router-dom";
import { InputTextarea } from "primereact/inputtextarea";

const CloseCaseModal = ({
  closeModalvalue,
  setCloseModalValue,
  setState,
  statusCase,
}) => {
  const [visible, setVisible] = useState(false);
  const { id } = useParams();
  const { actions } = useContext(Context);

  const handelCloseCase = async (value, id) => {
    console.log(value);
    const response = await actions.updateById("case", id, {
      close_description: value,
    });

    console.log(response);
    if (response.ok) {
      setState("closed", id);
      setVisible(false);
    }
  };
  return (
    <>
      <Button
        rounded
        label="Cerrar caso"
        onClick={() => {
          setVisible(true);
        }}
        disabled={statusCase != "started"}
      />
      <Dialog
        visible={visible}
        header="Cierre de caso"
        className="w-5"
        onHide={() => {
          setVisible(false);
          setCloseModalValue("");
        }}
      >
        <div className=" mx-auto flex flex-column gap-5 p-3 align-items-end	">
          <p>
            Para poder realizar el cierre del caso, es obligatorio generar un
            resumen del trabajo culminado.
          </p>
          <InputTextarea
            value={closeModalvalue}
            onChange={(e) => setCloseModalValue(e.target.value)}
            rows={5}
            cols={30}
            className="w-full"
          />
          <div className="flex gap-3">
            <Button
              label="Cancelar"
              rounded
              onClick={() => {
                setVisible(false);
                setCloseModalValue("");
              }}
            />

            <Button
              label="Cerrar caso"
              rounded
              onClick={() => {
                handelCloseCase(closeModalvalue, id);
              }}
              severity="success"
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default CloseCaseModal;
