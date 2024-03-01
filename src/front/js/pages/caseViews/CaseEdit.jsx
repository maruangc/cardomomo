import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../store/appContext";
import { useParams, useNavigate } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

import CostumerData from "./ui/CostumerData.jsx";
import ProfessionalData from "./ui/ProfessionalData.jsx";
import StateDetailEdit from "./ui/StateDetailEdit.jsx";
import { toast } from "react-toastify";

const CaseEdit = () => {
  const { id } = useParams();
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const [dataCase, setDataCase] = useState();
  const [customerList, setCustomerList] = useState([]);
  const [professionalList, setProfessionalList] = useState([]);
  const [serviceTypeList, setServiceTypeList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  const [category, setCategory] = useState(null);
  const [serviceType, setServiceType] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [professional, setProfessional] = useState(null);
  const [isActive, setIsActive] = useState(true);
  const [initialNotes, setInitialNotes] = useState();
  const [description, setDescription] = useState();
  const [closeNotes, setCloseNotes] = useState();
  const [deliveredNotes, setDeliveredNotes] = useState();

  const getData = async () => {
    const response = await actions.getById("case", `${id}`);
    if (response.msg) {
      toast.error("Token Expired");
      navigate("/login");
    }
    if (response.ok) {
      console.log(response.data.case);
      setDataCase(response.data);
      setCustomer(response.data.customer);
      setProfessional(response.data.professional);
      setServiceType(response.data.typeservice);
      setIsActive(response.data.case.is_active);
      setCategory(response.data.category);
      setDescription(
        !response.data.case.description
          ? "Sin descripcion"
          : response.data.case.description
      );
      setInitialNotes(
        !response.data.case.initial_note
          ? "Sin notas iniciales"
          : response.data.case.initial_note
      );
      setCloseNotes(
        !response.data.case.close_description
          ? "Sin notas de cierre"
          : response.data.case.close_description
      );
      setDeliveredNotes(
        !response.data.case.delivered_description
          ? "Sin notas de entrega"
          : response.data.case.delivered_description
      );
    }
    const customerList = await actions.getAll("customer", "0", "0");
    if (customerList.ok) {
      setCustomerList(customerList.data);
    }

    const professionalList = await actions.getAll("professional", "0", "0");
    if (professionalList.ok) {
      setProfessionalList(professionalList.data);
    }

    const serviceType = await actions.getAll("tables/type");
    if (serviceType.ok) {
      setServiceTypeList(serviceType.data);
    }

    const categoryList = await actions.getAll("category", "0", "0");
    if (categoryList.ok) {
      setCategoryList(categoryList.data);
    }
  };

  const handleSave = async () => {
    const fields = {
      customer_id: customer.id,
      is_active: isActive,
      professional_id: professional.id ? professional.id : null,
      category_id: category.id,
      typeservice_id: serviceType.id,
      description: description,
      initial_note: initialNotes,
      delivered_description: deliveredNotes,
      close_description: closeNotes,
    };

    const response = await actions.updateById("case", id, fields);
    console.log(response);
    if (response.ok) {
      toast.success("Datos Actualizados");
      navigate(-1);
    } else {
      toast.error(response.error);
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
      <div className="flex flex-column gap-7 px-5 py-5 w-full max-container-width">
        <div className="flex justify-content-between w-full align-items-center">
          <p className="text-2xl m-0">
            Editar caso:
            <span className="font-bold ml-3">#{dataCase.case.id}</span>
          </p>
          <div className="flex gap-3">
            <Button
              label="Volver"
              icon="fa-solid fa-circle-chevron-left"
              rounded
              onClick={() => navigate(-1)}
            ></Button>
            <Button
              label="Guardar cambios"
              icon="fa-regular fa-floppy-disk"
              rounded
              onClick={() => handleSave()}
            ></Button>
          </div>
        </div>
        <div className="flex flex-column gap-3">
          <div className="flex flex-column gap-3 ">
            <span className="font-bold text-xl">
              Asigna o cambia un cliente de la lista :
            </span>
            <Dropdown
              value={customer}
              onChange={(e) => {
                setCustomer(e.value);
              }}
              options={customerList}
              optionLabel="name"
              placeholder="Selecciona un cliente"
              className="w-full md:w-20rem"
            />
          </div>

          <CostumerData customer={customer} />
        </div>

        <div className="flex flex-column gap-3">
          <div className="flex flex-column gap-3 ">
            <span className="font-bold text-xl">
              Asigna o cambia un profesional de la lista :
            </span>
            <Dropdown
              value={professional}
              onChange={(e) => {
                setProfessional(e.value);
              }}
              options={professionalList}
              optionLabel="name"
              placeholder="Selecciona un Profesional"
              className="w-full md:w-20rem"
            />
          </div>

          <ProfessionalData professional={professional} />
        </div>
        <div className="flex flex-column gap-3">
          <StateDetailEdit
            serviceTypeList={serviceTypeList}
            serviceType={serviceType}
            setServiceType={setServiceType}
            isActive={isActive}
            setIsActive={setIsActive}
            categoryList={categoryList}
            category={category}
            setCategory={setCategory}
            initialNotes={initialNotes}
            setInitialNotes={setInitialNotes}
            description={description}
            setDescription={setDescription}
            dataCase={dataCase}
            closeNotes={closeNotes}
            setCloseNotes={setCloseNotes}
            deliveredNotes={deliveredNotes}
            setDeliveredNotes={setDeliveredNotes}
          />
        </div>
      </div>
    </div>
  );
};

export default CaseEdit;
