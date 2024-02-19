import React, { useContext, useState } from "react";
import CostumerData from "./ui/CostumerData.jsx";
import ProfessionalData from "./ui/ProfessionalData.jsx";
import StateDetail from "./ui/StateDetail.jsx";
import CloseDetail from "./ui/CloseDetail.jsx";
import HeaderButtons from "./ui/HeaderButtons.jsx";
import DeliverDetail from "./ui/DeliverDetail.jsx";
/* Data */
import dataJson from "./caseData.json";

const { customer, professional } = dataJson.data;
const caseClosed = dataJson.data.case.closed;
const caseDelivered = dataJson.data.case.delivered;

const CaseDetail = () => {
  const [isClose, setIsClose] = useState(caseClosed);
  const [isDelivered, setIsDelivered] = useState(caseDelivered);
  const [closeModalvalue, setCloseModalValue] = useState("");
  const [deliverModalvalue, setDeliverModalValue] = useState("");

  const handleClose = () => {
    if (!isClose) {
      setIsClose(true);
    }
  };

  return (
    <>
      <div className="w-full flex justify-content-center">
        <div className="flex flex-column gap-5 px-5 py-5 w-full max-container-width">
          <HeaderButtons
            handleClose={handleClose}
            closeModalvalue={closeModalvalue}
            setCloseModalValue={setCloseModalValue}
          />
          <CostumerData customer={customer} />
          <ProfessionalData professional={professional} />
          <StateDetail dataCase={dataJson.data} />
          {isClose && (
            <div className="grid gap-5 justify-content-between">
              <CloseDetail
                props={[
                  setIsDelivered,
                  isDelivered,
                  closeModalvalue,
                  deliverModalvalue,
                  setDeliverModalValue,
                ]}
              />
              {isDelivered && (
                <DeliverDetail deliverModalvalue={deliverModalvalue} />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CaseDetail;
