import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../store/appContext";
import { useParams } from "react-router-dom";
import CostumerData from "./ui/CostumerData.jsx";
/* import SkeletonCase from "./ui/SkeletonCase"; */

const CaseEdit = () => {
  const { id } = useParams();
  const [dataCase, setDataCase] = useState();
  const [customerList, setCustomerList] = useState();
  const { actions } = useContext(Context);

  const getData = async () => {
    const response = await actions.getById("case", `${id}`);
    if (response.ok) {
      setDataCase(response.data);
    }
  };

  const customerListQuery = async () => {
    const response = await actions.getAll("customer", "0", "0");
    console.log(response);
    if (response.ok) {
      setCustomerList(response.data);
    }
  };

  useEffect(() => {
    getData();
    customerListQuery();
  }, []);

  if (!dataCase) {
    return <h2>Sin dataos</h2>;
  }
  console.log(customerList);
  return (
    <div className="w-full flex justify-content-center">
      <div className="flex flex-column gap-5 px-5 py-5 w-full max-container-width">
        <div>
          <p>Datos del cliente </p>
        </div>
        <CostumerData customer={dataCase.customer} />
      </div>
    </div>
  );
};

export default CaseEdit;
