import React, { useRef, useState, useContext } from "react";
import { Context } from "../../../store/appContext.js";
import { useNavigate } from "react-router-dom";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { Button } from "primereact/button";
import { toast } from "react-toastify";

export default function Delete({ table, id }) {
  const [visible, setVisible] = useState(false);
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  const buttonEl = useRef(null);

  const accept = async () => {
    const response = await actions.deleteById(table, id);
    if (response.msg) {
      toast.error("Credencial vencida");
      navigate("/login");
    }
    if (response.ok) {
      toast.success(response.data);
      navigate("/" + table);
    }
  };

  const reject = () => {
    toast.info("No se eliminará.");
  };

  return (
    <>
      <ConfirmPopup
        target={buttonEl.current}
        visible={visible}
        onHide={() => setVisible(false)}
        message="¿esta seguro de eliminar este elemento?"
        icon="fa-solid fa-triangle-exclamation"
        accept={accept}
        reject={reject}
      />
      <div className="card flex justify-content-center">
        <Button
          ref={buttonEl}
          rounded
          icon="fa-solid fa-trash"
          onClick={() => setVisible(true)}
          label="Eliminar"
        />
      </div>
    </>
  );
}
