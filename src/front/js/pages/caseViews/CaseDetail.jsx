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
import SkeletonCase from "./ui/SkeletonCase.jsx";
import { toast } from "react-toastify";
const CaseDetail = () => {
  const { actions } = useContext(Context);

  const [data, setData] = useState();
  const [closeModalvalue, setCloseModalValue] = useState("");
  const [deliverModalvalue, setDeliverModalValue] = useState("");
  const [statusCase, setStatusCase] = useState("created");

  const dataQuery = async () => {
    const response = await actions.getById("case", 1);
    if (response.ok) {
      const handleStatus = response.data.case.delivered
        ? "delivered"
        : response.data.case.closed
        ? "closed"
        : response.data.case.started
        ? "started"
        : "created";
      setData(response.data);
      setStatusCase(handleStatus);
    }
  };

  const setState = async (status, id) => {
    const bodyQuery = {};
    bodyQuery[status] = true;

    const response = await fetch(
      process.env.BACKEND_URL + `/case/setstate/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(bodyQuery),
      }
    );

    const stateStatus = await response.json();
    if (stateStatus.ok) {
      toast(stateStatus.data);
      setStatusCase(status);
    }
  };

  useEffect(() => {
    dataQuery();
  }, [statusCase]);

  if (!data) {
    return <SkeletonCase />;
  }

  console.log(data);
  return (
    <>
      <div className="w-full flex justify-content-center">
        <div className="flex flex-column gap-5 px-5 py-5 w-full max-container-width">
          <HeaderButtons
            closeModalvalue={closeModalvalue}
            setCloseModalValue={setCloseModalValue}
            isStarted={data.case.started}
            isClosed={data.case.closed}
            isDelivered={data.case.delivered}
            dataQuery={dataQuery}
            setStatusCase={setStatusCase}
            statusCase={statusCase}
            setState={setState}
          />
          <CostumerData customer={data.customer} />
          <ProfessionalData professional={data.professional} />
          <StateDetail data={data} />
          {data.case.closed && (
            <div className="grid gap-5 justify-content-between">
              <CloseDetail
                closeModalValue={closeModalvalue}
                deliverModalValue={deliverModalvalue}
                setDeliverModalValue={setDeliverModalValue}
                caseData={data.case}
                setState={setState}
              />
              {data.case.delivered && (
                <DeliverDetail
                  deliverModalvalue={deliverModalvalue}
                  caseData={data.case}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CaseDetail;
