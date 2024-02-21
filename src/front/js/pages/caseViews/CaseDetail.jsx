import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../store/appContext.js";
import CostumerData from "./ui/CostumerData.jsx";
import ProfessionalData from "./ui/ProfessionalData.jsx";
import StateDetail from "./ui/StateDetail.jsx";
import CloseDetail from "./ui/CloseDetail.jsx";
import HeaderButtons from "./ui/HeaderButtons.jsx";
import DeliverDetail from "./ui/DeliverDetail.jsx";
/* Data */
import dataJson from "./caseData.json";

const CaseDetail = () => {
  const [data, setData] = useState({});
  const [customer, setCustomer] = useState(false);
  const [professional, setProfessional] = useState(false);
  const [caseClosed, setCaseClosed] = useState(false);
  const [caseDelivered, setCaseDelivered] = useState(false);
  const [caseStarted, setCaseStarted] = useState(false);

  const [isClose, setIsClose] = useState(caseClosed);
  const [isDelivered, setIsDelivered] = useState(caseDelivered);
  const [isStarted, setIsStarted] = useState(caseStarted);
  const [closeModalvalue, setCloseModalValue] = useState("");
  const [deliverModalvalue, setDeliverModalValue] = useState("");
  const [status, setStatus] = useState("CREADO");

  const { actions } = useContext(Context);

  const handleClose = () => {
    if (!isClose) {
      setIsClose(true);
    }
  };

  const handleStatus = () => {
    if (caseDelivered) {
      setStatus("ENTREGADO");
      return;
    }
    if (caseClosed) {
      setStatus("CERRADO");
      return;
    }
    if (caseStarted) {
      setStatus("INICIADO");
      return;
    }
  };

  const dataQuery = async () => {
    const response = await actions.getById("case", 1);
    setData(response.data);
    setCustomer(response.data.customer);
    setProfessional(response.data.professional);
    setCaseClosed(response.data.case.closed);
    setCaseDelivered(response.data.case.delivered);
    setCaseStarted(response.data.case.started);

    handleStatus();
  };

  useEffect(() => {
    dataQuery();
  }, []);

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
          <StateDetail dataCase={dataJson.data} data={data} />
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
