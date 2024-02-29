import { Button } from "primereact/button";
import React from "react";
import DeliverCaseModal from "./DeliverCaseModal.jsx";
import SkeletonCase from "./SkeletonCase.jsx";
import { useContext } from "react";
import { Context } from "../../../store/appContext";

const CloseDetail = ({
  closeModalValue,
  deliverModalValue,
  setDeliverModalValue,
  caseData,
  setState,
}) => {
  const { actions } = useContext(Context);

  if (!caseData) {
    return <SkeletonCase />;
  }

  return (
    <div className="col flex flex-column gap-3 ">
      <p>Detalle de cierre</p>
      <div className="flex flex-column  p-5  gap-5 h-full surface-100 border-solid border-2	border-300	border-round-lg">
        <div className="flex flex-row justify-content-between">
          <div className="flex flex-column ">
            <p className="font-medium">Fecha de cierre</p>
            <p className="text-xl font-bold my-0">
              {actions.getDate(caseData.close_date)}
            </p>
          </div>
          {caseData.closed && (
            <div>
              <DeliverCaseModal
                deliverModalValue={deliverModalValue}
                setDeliverModalValue={setDeliverModalValue}
                setState={setState}
                caseData={caseData}
              />
            </div>
          )}
        </div>

        <div className="flex flex-column gap-2 w-9 line-height-3 ">
          <p className="font-medium">Descripcion</p>
          <p className="text-sm">{caseData.close_description}</p>
        </div>
      </div>
    </div>
  );
};

export default CloseDetail;
