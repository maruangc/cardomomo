import React, { useState } from "react";
import { useContext } from "react";
import { Context } from "../../../store/appContext";
import { useParams } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { toast } from "react-toastify";

const DeliverCaseModal = ({
  deliverModalValue,
  setDeliverModalValue,
  setState,
  caseData,
  reload,
  setReload,
}) => {
  const { id } = useParams();
  const [visible, setVisible] = useState(false);
  const { actions } = useContext(Context);

  const handelDeliveredCase = async (value, id) => {
    const response = await actions.updateById("case", id, {
      delivered_description: value,
    });
    if (response.ok) {
      setVisible(false);
      setState("delivered", id);
    }
    setReload(reload + 1);
  };

  const buttonDelivered = async () => {
    let response;
    if (caseData.delivered) {
      const response = await actions.setEstate(id, {
        delivered: false,
      });
      if (response.ok) {
        toast.success("Reversada la entrega");
      } else {
        toast.error(response.error);
      }
      setReload(reload + 1);
    } else {
      setVisible(true);
    }
  };

  return (
    <>
      <Button
        rounded
        label={!caseData.delivered ? "Entregar" : "Revertir entrega"}
        onClick={() => {
          buttonDelivered();
        }}
        disabled={!caseData.is_active}
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
            value={deliverModalValue}
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
                handelDeliveredCase(deliverModalValue, id);
              }}
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default DeliverCaseModal;
