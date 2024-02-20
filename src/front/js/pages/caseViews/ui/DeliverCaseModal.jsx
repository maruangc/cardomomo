import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";

const DeliverCaseModal = ({ props }) => {
  const [setIsDelivered, deliverModalvalue, setDeliverModalValue] = props;
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button
        rounded
        label="Entregar caso"
        onClick={() => {
          setVisible(true);
        }}
      />
      <Dialog
        visible={visible}
        header="Detalle de entrega"
        className="w-5"
        onHide={() => {
          setVisible(false);
          setDeliverModalValue("");
        }}
      >
        <div className=" mx-auto flex flex-column gap-5 p-3 align-items-end	">
          <p>
            Para poder entregar el caso, es obligatorio generar un resumen del
            trabajo entregado.
          </p>
          <InputTextarea
            value={deliverModalvalue}
            onChange={(e) => setDeliverModalValue(e.target.value)}
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
                setDeliverModalValue("");
              }}
            />

            <Button
              label="Entregar Caso"
              rounded
              onClick={() => {
                setIsDelivered(true);
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

export default DeliverCaseModal;
