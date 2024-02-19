import { Button } from "primereact/button";
import React from "react";
import DeliverCaseModal from "./DeliverCaseModal.jsx";

const CloseDetail = ({ props }) => {
  const [
    setIsDelivered,
    isDelivered,
    closeModalvalue,
    deliverModalvalue,
    setDeliverModalValue,
  ] = props;
  return (
    <div className="col flex flex-column gap-3 ">
      <p>Detalle de cierre</p>
      <div className="flex flex-column surface-300 p-5 border-round-md  gap-5 h-full">
        <div className="flex flex-row justify-content-between">
          <div className="flex flex-column ">
            <p className="font-medium">Fecha de cierre</p>
            <p className="text-xl font-bold my-0">00/00/0000</p>
          </div>
          {!isDelivered && (
            <div>
              <DeliverCaseModal
                props={[
                  setIsDelivered,
                  deliverModalvalue,
                  setDeliverModalValue,
                ]}
              />
            </div>
          )}
        </div>

        <div className="flex flex-column gap-2 w-9 line-height-3 ">
          <p className="font-medium">Descripcion</p>
          <p className="text-sm">{closeModalvalue}</p>
        </div>
      </div>
    </div>
  );
};

export default CloseDetail;
