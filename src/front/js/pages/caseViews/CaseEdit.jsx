import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../store/appContext";
import { Navigate, useParams } from "react-router-dom";
import CostumerData from "./ui/CostumerData.jsx";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import ChekboxComponent from "./ui/CheckBoxComponent.jsx";

const originalState = {
  id: "",
};

const CaseEdit = () => {
  const { id } = useParams();
  const { actions } = useContext(Context);

  const [dataCase, setDataCase] = useState();
  const [customerList, setCustomerList] = useState([]);
  const [professionalList, setProfessionalList] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [object, setObject] = useState(originalState);
  const [checked, setChecked] = useState(false);

  const getData = async () => {
    const response = await actions.getById("case", `${id}`);
    if (response.ok) {
      setDataCase(response.data);
      setCustomer(response.data.customer);
    }
    const customerList = await actions.getAll("customer", "0", "0");
    if (customerList.ok) {
      setCustomerList(customerList.data);
    }

    const professionalList = await actions.getAll("professional", "0", "0");
    if (professionalList.ok) {
      setProfessionalList(professionalList.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (!dataCase) {
    return <h2>Sin dataos</h2>;
  }
  return (
    <div className="w-full flex justify-content-center">
      <div className="flex flex-column gap-5 px-5 py-5 w-full max-container-width">
        <div>
          <p>Selecciona un cliente </p>
        </div>
        <Dropdown
          value={customer}
          onChange={(e) => {
            setCustomer(e.value);
            Navigate(`/${sd}`);
          }}
          options={customerList}
          optionLabel="name"
          placeholder="Selecciona un cliente"
          className="w-full md:w-14rem"
        />
        <CostumerData customer={customer} />
        <ChekboxComponent />
      </div>
    </div>
  );
};

export default CaseEdit;
