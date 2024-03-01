import React from "react";
import { useContext } from "react";
import { Context } from "../../../store/appContext";

const DeliverDetail = ({ deliverModalvalue, caseData }) => {
  const { actions } = useContext(Context);

  return (
    <div className="col flex flex-column gap-3 ">
      <p>Detalle de entrega</p>
      <div className="flex flex-column  p-5  justify-content-between	gap-5 surface-100 border-solid border-2	border-300	border-round-lg">
        <div className="flex flex-row justify-content-between">
          <div className="flex flex-column ">
            <p className="font-medium">Fecha de entrega</p>
            <p className="text-xl font-bold my-0">
              {actions.getDate(caseData.delivered_date)}
            </p>
          </div>
        </div>

        <div className="flex flex-column gap-2 w-9 line-height-3">
          <p className="font-medium">Descripcion</p>
          <p className="text-sm">{caseData.delivered_description}</p>
        </div>
      </div>
    </div>
  );
};

export default DeliverDetail;
