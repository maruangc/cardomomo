import React from "react";

const DeliverDetail = ({ deliverModalvalue }) => {
  return (
    <div className="col flex flex-column gap-3 ">
      <p>Detalle de entrega</p>
      <div className="flex flex-column surface-300 p-5 border-round-md justify-content-between	 gap-5">
        <div className="flex flex-row justify-content-between">
          <div className="flex flex-column ">
            <p className="font-medium">Fecha de entrega</p>
            <p className="text-xl font-bold my-0">00/00/0000</p>
          </div>
        </div>

        <div className="flex flex-column gap-2 w-9 line-height-3">
          <p className="font-medium">Descripcion</p>
          <p className="text-sm">{deliverModalvalue}</p>
        </div>
      </div>
    </div>
  );
};

export default DeliverDetail;
