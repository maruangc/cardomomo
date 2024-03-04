import React, { useState, useContext } from "react";
import { Context } from "../../../store/appContext";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useParams } from "react-router-dom";
import { InputTextarea } from "primereact/inputtextarea";
import { toast } from "react-toastify";

const CloseCaseModal = ({
  closeModalvalue,
  setCloseModalValue,
  setState,
  statusCase,
  data,
  reload,
  setReload,
}) => {
  const [visible, setVisible] = useState(false);
  const { id } = useParams();
  const { actions } = useContext(Context);

  const handelCloseCase = async (value, id) => {
    const response = await actions.updateById("case", id, {
      close_description: value,
    });

    if (response.ok) {
      setState("closed", id);
      setVisible(false);
    }
  };

  const buttonClose = async () => {
    let response;
    if (data.case.closed) {
      const response = await actions.setEstate(id, {
        closed: false,
      });
      if (response.ok) {
        toast.success("Reversado el cierre");
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
        label={data.case.closed ? "Revertir cierre" : "Cerrar caso"}
        icon={
          data.case.closed ? "fa-solid fa-rotate-left" : "fa-solid fa-check"
        }
        onClick={() => {
          buttonClose();
        }}
        disabled={
          !data.case.is_active || data.case.delivered || !data.case.started
        }
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
              icon="fa-solid fa-ban"
              rounded
              onClick={() => {
                setVisible(false);
                setCloseModalValue("");
              }}
            />

            <Button
              label="Cerrar caso"
              icon="fa-solid fa-check"
              rounded
              onClick={() => {
                handelCloseCase(closeModalvalue, id);
                setReload(reload + 1);
              }}
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default CloseCaseModal;
