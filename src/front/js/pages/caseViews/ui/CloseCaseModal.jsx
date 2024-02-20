import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";

const CloseCaseModal = ({
  handleClose,
  closeModalValue,
  setCloseModalValue,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button
        rounded
        label="Cerrar caso"
        onClick={() => {
          setVisible(true);
        }}
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
            value={closeModalValue}
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
                handleClose();
                setVisible(false);
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
